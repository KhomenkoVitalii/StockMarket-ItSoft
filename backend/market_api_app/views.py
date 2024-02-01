from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from django.core.exceptions import ValidationError
from rest_framework import generics, status, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import Order, Transaction, AppUser, Stock
from .serializers import (
    UserRegisterSerializer, UserLoginSerializer,
    OrderSerializer, UserSerializer, TransactionSerializer,
    StockSerializer
)

User = get_user_model()


class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.check_user(data)
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)

            response_data = {
                'message': 'Login successful',
                'token': token.key,
                'user': {
                    'email': user.email,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'birthday': user.birthday
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_401_UNAUTHORIZED)


class TestToken(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return Response({'message': "passed!"})


class UserLogoutView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class StocksViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class OrderViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        # Extract stock symbol from request body
        stock_symbol = self.request.data.get('stock_symbol')
        # Find stock instance by symbol
        stock_instance = self.find_stock(stock_symbol)
        # Save order with user and stock instance
        serializer.save(user=self.request.user, stock=stock_instance)
        # Process the order
        self.process_order(serializer.instance)

    def process_order(self, order):
        """
        The `process_order` method is responsible for executing trades between a buy order and
        matching sell orders. It retrieves a queryset of matching orders based on the instrument,
        order type (opposite of the given order type), and price (less than or equal to the given
        order price). The queryset is then ordered by price.
        """
        matching_orders = self.get_matching_orders(order)
        for matching_order in matching_orders:
            self.execute_trade(order, matching_order)

    def get_matching_orders(self, order):
        """
        This method is responsible for retrieving a
        queryset of orders that match the given order. It filters the orders based on the
        instrument, order type (opposite of the given order type), and price (less than or equal to
        the given order price). The queryset is then ordered by price. This method is used in the
        `process_order` method to find matching orders for executing trades.
        """
        opposite_type = 'SELL' if order.order_type == 'BUY' else 'BUY'
        return Order.objects.filter(
            stock=order.stock,
            order_type=opposite_type,
            price__lte=order.price
        ).order_by('price')

    def execute_trade(self, buy_order, sell_order):
        """
        The `execute_trade` method is responsible for executing a trade between a buy order and a
        sell order. It calculates the quantity and price of the trade, creates transaction objects
        to record the trade, and updates the quantities of the buy and sell orders accordingly.
        """
        quantity = min(buy_order.quantity, sell_order.quantity)
        price = sell_order.price

        # Create a transaction for the executed trade
        transaction_data = {
            'order': buy_order,
            'price': price,
            'quantity': quantity,
            'transaction_type': 'BUY'
        }
        Transaction.objects.create(**transaction_data)

        transaction_data['order'] = sell_order
        transaction_data['transaction_type'] = 'SELL'
        Transaction.objects.create(**transaction_data)

        # Update order quantities
        buy_order.quantity -= quantity
        sell_order.quantity -= quantity

        buy_order.save()
        sell_order.save()

    def find_stock(self, stock_symbol):
        try:
            stock_instance = Stock.objects.get(symbol=stock_symbol)
            return stock_instance
        except Stock.DoesNotExist:
            raise ValueError(
                f"Stock with symbol '{stock_symbol}' does not exist.")


class AppUserListView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(order__user=self.request.user)

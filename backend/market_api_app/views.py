from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, permissions
from market_api_app.serializers import UserSerializer, UserLoginSerializer, UserRegisterSerializer

from django.shortcuts import get_object_or_404
from market_api_app.models import MarketInstrument, Stock, Order, Transaction
from market_api_app.serializers import OrderSerializer, TransactionSerializer

User = get_user_model()


class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication,]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
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
            instrument=order.instrument,
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


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(order__user=self.request.user)

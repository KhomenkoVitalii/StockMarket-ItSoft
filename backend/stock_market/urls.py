from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from market_api_app.views import (
    OrderViewSet, TransactionViewSet, UserLoginView,
    UserLogoutView, UserRegisterView, OrderListView,
    MarketInstrumentListView, AppUserListView, TestToken
)

# Define a router for DRF viewsets
router = routers.SimpleRouter()
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'transactions', TransactionViewSet, basename='transactions')

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/login/', UserLoginView.as_view(), name='login'),
    path('auth/logout/', UserLogoutView.as_view(), name='logout'),
    path('auth/register/', UserRegisterView.as_view(), name='register'),
    path('auth/token/', TestToken.as_view(), name='token'),
    path('api/', include((router.urls, 'market_app_api'), namespace='api')),
    path('api/orders/', OrderListView.as_view(), name='order-list'),
    path('api/instruments/', MarketInstrumentListView.as_view(),
         name='instrument-list'),
    path('api/users/', AppUserListView.as_view(), name='user-list'),
]

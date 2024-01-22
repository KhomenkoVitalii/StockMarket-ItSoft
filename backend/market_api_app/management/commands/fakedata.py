from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from market_api_app.models import MarketInstrument, Industry, Stock, Order, Transaction, MarketData
from faker import Faker
import random
from datetime import timedelta

fake = Faker()
User = get_user_model()


class Command(BaseCommand):
    help = 'Populate database with test data'

    def handle(self, *args, **options):
        self.create_test_users()
        self.create_market_instruments()
        self.create_industries()
        self.create_stocks()
        self.create_orders_and_transactions()
        self.create_market_data()

    def create_test_users(self):
        for _ in range(5):
            User.objects.create_user(
                username=fake.user_name(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                phone_number=fake.phone_number(),
                birthday=fake.date(),
                email=fake.email(),
                password=fake.password()
            )
        self.stdout.write(self.style.SUCCESS('Test users created'))

    def create_market_instruments(self):
        for _ in range(5):
            MarketInstrument.objects.create(
                symbol=fake.word(),
                name=fake.company()
            )
        self.stdout.write(self.style.SUCCESS('Market instruments created'))

    def create_industries(self):
        for _ in range(5):
            Industry.objects.create(
                name=fake.word(),
                description=fake.text()
            )
        self.stdout.write(self.style.SUCCESS('Industries created'))

    def create_stocks(self):
        market_instruments = MarketInstrument.objects.all()
        industries = Industry.objects.all()

        for _ in range(5):
            try:
                Stock.objects.create(
                    instrument=random.choice(market_instruments),
                    exchange=fake.word(),
                    market_cap=random.uniform(1e9, 1e12),
                    industry=random.choice(industries)
                )
            except:
                pass
        self.stdout.write(self.style.SUCCESS('Stocks created'))

    def create_orders_and_transactions(self):
        users = User.objects.all()
        market_instruments = MarketInstrument.objects.all()
        for _ in range(5):
            Order.objects.create(
                user=random.choice(users),
                instrument=random.choice(market_instruments),
                order_type=random.choice(['BUY', 'SELL']),
                price=random.uniform(50, 200),
                quantity=random.randint(1, 100),
                status=random.choice(['ACTIVE', 'EXECUTED']),
                created_at=fake.date_time_this_decade()
            )

        orders = Order.objects.all()
        for order in orders:
            Transaction.objects.create(
                order=order,
                price=order.price,
                quantity=random.randint(1, order.quantity),
                transaction_type=order.order_type,
                timestamp=order.created_at +
                timedelta(days=random.randint(1, 10))
            )

        self.stdout.write(self.style.SUCCESS(
            'Orders and transactions created'))

    def create_market_data(self):
        market_instruments = MarketInstrument.objects.all()
        for _ in range(5):
            MarketData.objects.create(
                instrument=random.choice(market_instruments),
                current_price=random.uniform(50, 200),
                volume=random.randint(1, 100),
                timestamp=fake.date_time_this_decade()
            )
        self.stdout.write(self.style.SUCCESS('Market data created'))

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from market_api_app.models import Industry, Stock, Order, Transaction
from faker import Faker
import random
from datetime import timedelta

fake = Faker()
User = get_user_model()


class Command(BaseCommand):
    help = 'Populate database with test data'

    def handle(self, *args, **options):
        self.create_test_users()
        self.create_industries()
        self.create_stocks()
        self.create_orders_and_transactions()

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

    def create_industries(self):
        for _ in range(5):
            Industry.objects.create(
                name=fake.word(),
                description=fake.text()
            )
        self.stdout.write(self.style.SUCCESS('Industries created'))

    def create_stocks(self):
        industries = Industry.objects.all()

        for _ in range(5):
            try:
                Stock.objects.create(
                    symbol=fake.word(),
                    name=fake.company(),
                    exchange=fake.word(),
                    market_cap=random.uniform(1e9, 1e12),
                    industry=random.choice(industries)
                )
            except:
                pass
        self.stdout.write(self.style.SUCCESS('Stocks created'))

    def create_orders_and_transactions(self):
        users = User.objects.all()
        stocks = Stock.objects.all()
        for _ in range(5):
            Order.objects.create(
                user=random.choice(users),
                stock=random.choice(stocks),
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

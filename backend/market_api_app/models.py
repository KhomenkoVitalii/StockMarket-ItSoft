from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Permission, Group
from django.db.models import Q

order_type_choices = [('BUY', 'Buy'), ('SELL', 'Sell')]
order_status_choices = [('ACTIVE', 'Active'), ('EXECUTED', 'Executed')]


class AppUserManager(BaseUserManager):
    @staticmethod
    def validate_birthdate(date):
        # TODO: IMPLEMENT DATE VALIDATION
        return date

    @staticmethod
    def normalize_phone_number(phone_number):
        # TODO: IMPLEMENT PHONE_NUMBER VALIDATION
        return phone_number

    def create_user(self, first_name, last_name, username, phone_number, birthday, email, password=None, **kwargs):
        if not first_name:
            raise ValueError('A first name is required!')
        if not last_name:
            raise ValueError('A last name is required!')
        if not email:
            raise ValueError('An email is required!')
        if not phone_number:
            raise ValueError('An phone number is required!')
        if not birthday:
            raise ValueError('An birthday is required!')
        if not username:
            raise ValueError('An username is required!')
        if not password:
            raise ValueError('An password is required!')

        email = self.normalize_email(email)
        norm_phone_number = self.normalize_phone_number(phone_number)
        norm_birthdate = self.validate_birthdate(birthday)

        # Check if the email is already in use
        is_email_in_use = self.filter(Q(email=email)).exists()

        if is_email_in_use:
            raise ValueError(f'The email address "{email}" is already in use!')

        user = self.model(email=email,
                          first_name=first_name,
                          last_name=last_name,
                          username=username,
                          phone_number=norm_phone_number,
                          birthday=norm_birthdate)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, first_name, last_name, username, phone_number, birthday, email, password=None, **kwargs):
        if not first_name:
            raise ValueError('A first name is required!')
        if not last_name:
            raise ValueError('A last name is required!')
        if not email:
            raise ValueError('An email is required!')
        if not phone_number:
            raise ValueError('An phone number is required!')
        if not birthday:
            raise ValueError('An birthday is required!')
        if not username:
            raise ValueError('An username is required!')
        if not password:
            raise ValueError('An password is required!')

        user = self.create_user(first_name, last_name, username,
                                phone_number, birthday, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.BigAutoField(primary_key=True)

    email = models.CharField(max_length=254, unique=True, null=False)
    phone_number = models.CharField(null=False, unique=True)

    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)

    username = models.CharField(max_length=100, null=False, unique=True)

    birthday = models.DateField(null=False)

    image = models.ImageField(upload_to="uploads/images/users/", null=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateField(auto_now_add=True, null=False)

    groups = models.ManyToManyField(
        'auth.Group', related_name='app_users', blank=True)
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='app_users', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'phone_number', 'birthday', 'username']

    objects = AppUserManager()

    def __str__(self):
        return self.username


class Industry(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Stock(models.Model):
    symbol = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    exchange = models.CharField(max_length=50)
    market_cap = models.DecimalField(max_digits=15, decimal_places=2)
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.exchange})"


class Order(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    order_type = models.CharField(max_length=4, choices=order_type_choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    status = models.CharField(
        max_length=8, choices=order_status_choices, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)


class Transaction(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    transaction_type_choices = [('BUY', 'Buy'), ('SELL', 'Sell')]
    transaction_type = models.CharField(
        max_length=4, choices=transaction_type_choices)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} {self.quantity} for {self.price * self.quantity}$"

from django.db import models

order_type_choices = [('BUY', 'Buy'), ('SELL', 'Sell')]
order_status_choices = [('ACTIVE', 'Active'), ('EXECUTED', 'Executed')]


class MarketInstrument(models.Model):
    symbol = models.CharField(max_length=50, unique=True)
    # example: 'AAPL'
    name = models.CharField(max_length=100)
    # example: 'Apple Inc.'

    def __str__(self):
        return self.symbol


class Industry(models.Model):
    # Entity which represent industry with which 'stock' related
    name = models.CharField(max_length=100, unique=True)
    # example: 'Technology'
    description = models.CharField(max_length=500)
    # additional info about industry

    def __str__(self):
        return self.name


class Stock(models.Model):
    instrument = models.OneToOneField(
        MarketInstrument, on_delete=models.CASCADE, primary_key=True)
    exchange = models.CharField(max_length=50)
    # Indicates the exchange on which these stocks are traded (for example, NASDAQ, NYSE).
    market_cap = models.DecimalField(max_digits=15, decimal_places=2)
    # Market capitalization of the company issuing the stocks.
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.instrument.name} ({self.exchange})"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instrument = models.ForeignKey(MarketInstrument, on_delete=models.CASCADE)
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

    def __str__(self) -> str:
        return f"{self.transaction_type} {self.quantity} for {self.price * self.quantity}$"


class MarketData(models.Model):
    instrument = models.ForeignKey(MarketInstrument, on_delete=models.CASCADE)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.instrument.symbol} - Price: {self.current_price}, Volume: {self.volume}, Timestamp: {self.timestamp}"

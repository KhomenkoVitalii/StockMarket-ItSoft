from django.contrib import admin
from market_api_app import models

# Register your models here.
admin.site.register(models.AppUser)
admin.site.register(models.MarketInstrument)
admin.site.register(models.Industry)
admin.site.register(models.Stock)
admin.site.register(models.Order)
admin.site.register(models.Transaction)
admin.site.register(models.MarketData)

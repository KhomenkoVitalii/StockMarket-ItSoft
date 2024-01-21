from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.forms import ValidationError
from market_api_app.models import *

UserModel = get_user_model()

# USER, USER_LOGIN, USER_REGISTER SERIALIZERS


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = '__all__'

    def create(self, validated_data):
        user = AppUser.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = UserModel
        fields = ('email', 'password')

    def check_user(self, clean_data):
        user = authenticate(
            email=clean_data['email'],
            password=clean_data['password']
        )

        if not user:
            raise ValidationError('user not found!')

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'first_name', 'last_name',
                  'birthday', 'phone_number')

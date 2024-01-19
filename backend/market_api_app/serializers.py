from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.forms import ValidationError
from market_api_app.models import *

UserModel = get_user_model()

# USER, USER_LOGIN, USER_REGISTER SERIALIZERS


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(first_name=clean_data['first_name'],
                                                 last_name=clean_data['last_name'],
                                                 phone_number=clean_data['phone_number'],
                                                 birthday=clean_data['birthday'],
                                                 email=clean_data['email'],
                                                 password=clean_data['password'])
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

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

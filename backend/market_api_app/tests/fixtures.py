import pytest
from rest_framework.test import APIClient, force_authenticate
from django.contrib.auth import get_user_model

User = get_user_model()


test_user_data = {
    "email": "example@gmail.com",
    "password": "password123",
    "first_name": "Temp",
    "last_name": "Temp",
    "phone_number": "+3403783462",
    "username": "newuser",
    "birthday": "2022-11-11"
}


@pytest.fixture
def authenticated_user(client):
    # Create a user and authenticate them
    user = User.objects.create_user(email=test_user_data['email'],
                                    password=test_user_data['password'],
                                    first_name=test_user_data['first_name'],
                                    last_name=test_user_data['last_name'],
                                    phone_number=test_user_data['phone_number'],
                                    username=test_user_data['username'],
                                    birthday=test_user_data['birthday'])
    client.login(email=test_user_data['email'],
                 password=test_user_data['password'])
    return user


@pytest.fixture
def authenticated_client(authenticated_user):
    client = APIClient()
    client.force_authenticate(user=authenticated_user)
    return client

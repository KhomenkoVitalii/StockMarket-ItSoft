import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from fixtures import test_user_data, authenticated_user

User = get_user_model()


@pytest.mark.django_db
def test_registration_view(client):
    response = client.post(
        reverse("register"), test_user_data
    )

    assert response.status_code == 201


@pytest.mark.django_db
def test_registration_failed_incorrect_email_view(client):
    # FIXME: Validation for incorrect email is not working!
    test_user_data['email'] = 'incorrect_email.com'

    response = client.post(
        reverse("register"), test_user_data
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_registration_failed_duplicated_email_view(client):
    response = client.post(
        reverse("register"), test_user_data
    )

    assert response.status_code == 201

    response = client.post(
        reverse("register"), test_user_data
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_login_view(client):
    # Register a new user
    response = client.post(
        reverse("register"), test_user_data
    )

    assert response.status_code == 201

    response = client.post(
        reverse("login"), test_user_data
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_login_failed_user_not_found_view(client):
    # Register a new user
    response = client.post(
        reverse("login"), test_user_data
    )

    assert response.status_code == 400


# Test logout view
@pytest.mark.django_db
def test_logout_view(client, authenticated_user):
    response = client.post(reverse("logout"))
    assert response.status_code == 200
    user = client.session.get("_auth_user_id")
    assert user is None  # Ensure the user is logged out

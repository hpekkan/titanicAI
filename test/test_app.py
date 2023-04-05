import os
import pytest
from fastapi.testclient import TestClient
from jose import jwt
from pydantic import ValidationError
from .main import app, create_access_token, create_refresh_token, password_context

client = TestClient(app)

@pytest.fixture
def test_user():
    return {
        "username": "testuser",
        "password": "testpassword",
        "email": "test@test.com",
        "first_name": "Test",
        "last_name": "User",
        "phone_number": "1234567890",
        "address": "123 Test St",
        "city": "Test City",
        "state": "TS",
        "zip_code": "12345",
        "authority_level": 1,
    }

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"data": "Welcome to titanic prediction model"}

@pytest.mark.skip(reason="Skipping this test due to database dependency")
def test_create_user(test_user):
    response = client.post("/signup", json=test_user)
    assert response.status_code == 200
    assert response.json() == {"message": "User created successfully"}

@pytest.mark.skip(reason="Skipping this test due to database dependency")
def test_login(test_user):
    response = client.post("/login", data={"username": test_user["username"], "password": test_user["password"]})
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert "refresh_token" in token_data

    access_token = token_data["access_token"]
    refresh_token = token_data["refresh_token"]

    # Test /me endpoint
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get("/me", headers=headers)
    assert response.status_code == 200

    # Test /refresh endpoint
    headers = {"Authorization": f"Bearer {refresh_token}"}
    response = client.get("/refresh", headers=headers)
    assert response.status_code == 200
    new_token_data = response.json()
    assert "access_token" in new_token_data
    assert "refresh_token" in new_token_data

def test_password_context(test_user):
    hashed_password = password_context.hash(test_user["password"])
    assert password_context.verify(test_user["password"], hashed_password)

def test_create_access_token(test_user):
    access_token = create_access_token(test_user["username"])
    assert isinstance(access_token, str)
    payload = jwt.decode(access_token, os.environ.get("SECRET_KEY"), algorithms=["HS256"])
    assert payload["sub"] == test_user["username"]

def test_create_refresh_token(test_user):
    refresh_token = create_refresh_token(test_user["username"])
    assert isinstance(refresh_token, str)
    payload = jwt.decode(refresh_token, os.environ.get("JWT_REFRESH_SECRET_KEY"), algorithms=["HS256"])
    assert payload["sub"] == test_user["username"]

def test_invalid_refresh_token():
    with pytest.raises(ValidationError):
        jwt.decode("invalid_refresh_token", os.environ.get("JWT_REFRESH_SECRET_KEY"), algorithms=["HS256"])
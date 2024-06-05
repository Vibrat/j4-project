import os
import tempfile
from unittest import TestCase, mock
from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.main import app
from src.dependencies.db.models import User

client = TestClient(app)

class TestAuthAPI(TestCase):

  @mock.patch("src.routers.auth.login_register.get_user_by_email")
  @mock.patch("src.routers.auth.login_register.create_user")
  def test_login_first_time_should_success(self, mock_get_user_by_email, mock_create_user):
    test_user = User(email="kKX9R@example.com", password="123123")
    mock_get_user_by_email.return_value = None
    mock_create_user.return_value = test_user
    response = client.post("/auth/login", json={
      "email": test_user.email,
      "password": test_user.password
    })
    self.assertEqual(response.status_code, 200, "First time enter email / password should create new account and allow loggining in")


  @mock.patch("src.routers.auth.login_register.get_user_by_email")
  @mock.patch("src.routers.auth.login_register.create_user")
  def test_login_second_time_should_fail(self, mock_get_user_by_email, mock_create_user):
    test_user = User(email="kKX9R@example.com", password="123123")
    mock_get_user_by_email.return_value = test_user
    mock_create_user.return_value = test_user
    response = client.post("/auth/login", json={
      "email": test_user.email,
      "password": "456456"
    })
    self.assertEqual(response.status_code, 401, "Second time sign in, only allow if correct on both email / password")

  @mock.patch("src.routers.auth.login_register.get_user_by_email")
  @mock.patch("src.routers.auth.login_register.create_user")
  def test_login_second_time_should_success(self, mock_get_user_by_email, mock_create_user):
    test_user = User(email="kKX9R@example.com", password="123123")
    mock_get_user_by_email.return_value = test_user
    mock_create_user.return_value = test_user
    response = client.post("/auth/login", json={
      "email": test_user.email,
      "password": "123123"
    })
    self.assertEqual(response.status_code, 200, "Second time sign in, only allow if correct on both email / password")
from unittest import TestCase, mock
from fastapi.testclient import TestClient
from websocket import create_connection
from starlette.websockets import WebSocketDisconnect
from pydantic import ValidationError

from src.routers.auth.login_register import LoginResponse
from src.main import app
client = TestClient(app)


class TestBroadcastCase(TestCase):

  def test_if_client_reject_when_no_token(self):
    with self.assertRaises(WebSocketDisconnect, msg="No token provided"):
      with client.websocket_connect("/ws/broadcast?token=123"):
        self.fail("this connection should be rejected")

  def test_connection_success_with_token(self):
    ## try to log in first
    response =client.post(
        "/auth/login", json={"email": "test@gmail.com", "password": "123123"}
    )
    auth = None
    try:
      auth = LoginResponse(**response.json())
    except ValidationError:
      self.fail("The api should provide valid token")
    finally:
      auth.token
      self.assertTrue(auth.token, "Auth should provide token")
    try:
      with client.websocket_connect(f"/ws/broadcast?token={auth.token}") as conn:
        message = {"content": "Hello World"}
        conn.send_json(message)
        received = conn.receive_json()
        self.assertEqual(received, message, "Should receive the same message")
    except WebSocketDisconnect:
      self.fail("websocket should connect normally with valid token")
      
    
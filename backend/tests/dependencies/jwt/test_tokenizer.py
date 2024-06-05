from unittest import TestCase, mock

from src.dependencies.jwt.tokenizer import (
  validate_jwt,
  issue_jwt
)

class TestTokenizer(TestCase):

  def test_jwt_issue_and_validate(self):
    
    issued_token = issue_jwt(email="test", user_id=1)
    payload = validate_jwt(issued_token)
    
    self.assertEqual(payload.email, "test")
    self.assertEqual(payload.user_id, 1)

  @mock.patch("os.environ.get")
  def test_jwt_issued_by_two_secrets(self, mock_vault):
    
    mock_vault.return_value = "secret_1"
    issue_token = issue_jwt(email="test", user_id=1)

    mock_vault.return_value = "secret_2"
    payload = validate_jwt(issue_token)

    self.assertFalse(payload, "token issued by another secret shouldn't be decrypted")
    
from unittest import mock, TestCase, IsolatedAsyncioTestCase
from fastapi import Request, HTTPException
from src.dependencies.jwt.bearer import JWTBearer

class TestBearerProtection(IsolatedAsyncioTestCase):

  async def test_bearer_protection(self):
    request = Request(scope={"type": "http", "headers": []})
    bearer = JWTBearer()
    try:
      await bearer(request)
    except HTTPException as e:
      self.assertEqual(e.status_code, 403, "Bearer invalidation failure should return 403")


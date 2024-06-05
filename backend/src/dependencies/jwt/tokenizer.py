import os
import jwt
from typing import Union

from fastapi import HTTPException, status, WebSocketException
from datetime import datetime, timedelta, timezone
from .interface import JWTPayload

def issue_jwt(email: str, user_id: int, expires_in: int = 36000):
  vault = os.environ.get("JWT_SECRET", "default")
  return jwt.encode({ 
    "email": email, 
    "user_id": user_id,
    "exp": datetime.now(tz=timezone.utc) + timedelta(seconds=expires_in) 
    }, vault, algorithm="HS256")


def validate_jwt(token: str) -> Union[JWTPayload, None]:
  vault = os.environ.get("JWT_SECRET", "default")
  try:
    return JWTPayload(**jwt.decode(token, vault, algorithms=["HS256"]))
  except jwt.DecodeError:
    return None
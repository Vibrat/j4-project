from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel

from .crud import get_user_by_email, create_user

from ...dependencies.db import base, models
from ...dependencies.jwt import tokenizer

session = base.get_session()
router = APIRouter(prefix="/auth")

class LoginRequest(BaseModel):
  email: str
  password: str

class LoginResponse(BaseModel):
  message: str
  token: str

@router.post("/login", status_code=status.HTTP_200_OK)
async def login_register(credential: LoginRequest):
  """Login if email already exists else register new acccount and return token"""

  user = get_user_by_email(db=session, email=credential.email)
  
  if not user:
    user = create_user(db=session, user=models.User(email=credential.email, password=credential.password))
  
  if user.password == credential.password:
    token = tokenizer.issue_jwt(email=user.email, user_id=user.id)
    return LoginResponse(message="success", token=token)
  
  raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

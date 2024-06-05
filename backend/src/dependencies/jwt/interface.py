from pydantic import BaseModel

class JWTPayload(BaseModel):
  email: str
  user_id: int
  exp: int
import jwt
from typing import Annotated
from fastapi import Request, HTTPException, WebSocket, Cookie, Query, status, WebSocketException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .tokenizer import validate_jwt
from .interface import JWTPayload

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            JWTBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = validate_jwt(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True

        return isTokenValid

def get_jwt_payload(jwtoken: str) -> JWTPayload:
    return validate_jwt(jwtoken)

async def validate_cookie_or_token(
    websocket: WebSocket,
    session_token: Annotated[str | None, Cookie()] = None,
    token: Annotated[str | None, Query()] = None,
):
    if session_token is None and token is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)
    try:
        payload = validate_jwt(session_token or token)
        if not payload:
            raise WebSocketException(code=status.HTTP_403_FORBIDDEN)
    except jwt.ExpiredSignatureError:
        # use same HTTP code here for convenience
        raise WebSocketException(code=status.HTTP_403_FORBIDDEN)
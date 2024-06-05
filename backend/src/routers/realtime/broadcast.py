import json
from fastapi import WebSocket, APIRouter, Depends, WebSocketDisconnect

from .context import ConnectionManager
from ...dependencies.jwt.bearer import validate_cookie_or_token

router = APIRouter(prefix="/ws")
manager = ConnectionManager()


@router.websocket("/broadcast")
async def broadcast_channel(websocket: WebSocket, verified: bool = Depends(validate_cookie_or_token)):
    ## Keep connection with authorized user
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # await manager.broadcast("A client left the chat")


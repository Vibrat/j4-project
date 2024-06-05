from sqlalchemy.orm import Session
from fastapi import APIRouter, status, HTTPException, Depends, BackgroundTasks

from ...dependencies.jwt.bearer import JWTBearer, get_jwt_payload
from ...dependencies.db import base, models

from .interface import CreateVideoRequest, CreateVideoResponse
from .background import update_video_metadata

router = APIRouter(prefix="/videos", tags=["videos"])
session = base.get_session()


@router.get("/", status_code=status.HTTP_200_OK)
def get_videos(skip: int = 0, limit: int = 100):
    base_query = session.query(
        models.Video.id,
        models.Video.title,
        models.Video.description,
        models.Video.url,
        models.Video.user_id,
        models.User.email,
    )
    headers = list(map(lambda c: c["name"], base_query.column_descriptions))
    videos = (
        base_query.join(models.User, models.Video.user_id == models.User.id)
        .order_by(models.Video.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    response = map(lambda row: dict(zip(headers, row)), videos)
    return {"data": list(response)}


@router.post("/", status_code=status.HTTP_202_ACCEPTED)
async def create_video(
    request: CreateVideoRequest,
    background: BackgroundTasks,
    token: str = Depends(JWTBearer()),
):
    jwt = get_jwt_payload(token)
    background.add_task(
        update_video_metadata,
        db=session,
        video=models.Video(url=request.url),
        user_id=jwt.user_id,
    )
    return CreateVideoResponse()

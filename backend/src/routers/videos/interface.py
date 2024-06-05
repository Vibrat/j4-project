from pydantic import BaseModel


class CreateVideoRequest(BaseModel):
    url: str


class CreateVideoResponse(BaseModel):
    pass

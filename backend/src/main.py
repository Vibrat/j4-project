from fastapi import FastAPI
from sqlalchemy.orm import Session
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .routers import auth, videos, realtime
from .dependencies.db.base import master
from .dependencies.db import models

# create models for sqlalchemy
master.base.metadata.create_all(bind=master.engine)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(auth.login_register.router)
app.include_router(videos.crud.router)
app.include_router(realtime.broadcast.router)
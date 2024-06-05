import os
import time
import tempfile
from typing import Callable
from unittest import TestCase, mock, IsolatedAsyncioTestCase
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from src.main import app
from src.dependencies.db.models import Video
from src.dependencies.jwt.tokenizer import issue_jwt
from src.routers.videos.background import update_video_metadata

client = TestClient(app)


def mock_add_task(task: Callable, *args, **kwargs):
    """This method mock background task"""
    video = kwargs.get("video")
    db = kwargs.get("db")
    title = "test title"
    description = "test description"
    user_id = kwargs.get("user_id")
    if title and description:
        video.title = title
        video.description = description
        video.user_id = user_id
        db.add(video)
        db.commit()


class TestAuthAPI(TestCase):

    @mock.patch("fastapi.BackgroundTasks.add_task", mock_add_task)
    def test_create_new_video(self):

        ## try to log in first
        client.post(
            "/auth/login", json={"email": "test@gmail.com", "password": "123123"}
        )

        ## try to create new video
        jwt_token = issue_jwt(email="test@gmail.com", user_id=1)
        headers = {"Authorization": f"Bearer {jwt_token}"}
        created = client.post(
            "/videos",
            json={"url": "https://www.youtube.com/watch?v=FPXLq1CzIIQ"},
            headers=headers,
        )
        self.assertEqual(
            created.status_code,
            202,
            "Create Video should accept the request as return 202",
        )

        ## attemp to query videos
        response = client.get("/videos")
        self.assertEqual(
            response.status_code,
            200,
            "Get Videos should accept the request as return 200",
        )
        self.assertEqual(
            len(response.json() or []),
            1,
            "There should be existing 1 video in the database"
        )

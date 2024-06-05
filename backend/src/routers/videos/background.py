import requests
import json
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session

from ...dependencies.db import models
from ..realtime.broadcast import manager

def parse_youtube_id(url):
    try:
        qs = parse_qs(urlparse(url).query)
        return qs.get("v")[0]
    except:
        return None


def fetch_youtube_metadata(url):
    # Make an HTTP GET request to the YouTube URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, "html.parser")

        # Extract the title tag
        title = soup.find("meta", property="og:title")
        title_content = title["content"] if title else "Title not found"

        # Extract the description tag
        description = soup.find("meta", property="og:description")
        description_content = (
            description["content"] if description else "Description not found"
        )

        return title_content, description_content
    else:
        return None, None


async def update_video_metadata(db: Session, video: models.Video, user_id: int):
    
    title, description = fetch_youtube_metadata(video.url)
    video.url = f"https://www.youtube.com/embed/{parse_youtube_id(video.url)}"
    
    if title and description:
        video.title = title
        video.description = description
        video.user_id = user_id
        db.add(video)
        db.commit()
    
    await manager.broadcast(json.dumps({
        'title': video.title,
        'description': video.description,
        'url': video.url
    }))
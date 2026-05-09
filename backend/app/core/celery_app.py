from celery import Celery
from app.core.config import settings

celery_app = Celery('social_media_agent', broker=settings.redis_url, backend=settings.redis_url)

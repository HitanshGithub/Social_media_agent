from celery import Celery
from app.core.config import get_settings

settings = get_settings()
celery_app = Celery(
    'social_media_agent',
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=['app.tasks'],
)
celery_app.conf.task_routes = {'app.tasks.run_video_agent': {'queue': 'celery'}}

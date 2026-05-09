from datetime import datetime, timezone
import json
import redis
from app.core.config import get_settings
from app.core.websocket_manager import ws_manager

settings = get_settings()
redis_client = redis.Redis.from_url(settings.redis_url, decode_responses=True)


async def publish_event(job_id: str, event: str, node: str | None = None, data: dict | None = None) -> None:
    payload = {
        'event': event,
        'node': node,
        'data': data or {},
        'timestamp': datetime.now(timezone.utc).isoformat(),
    }
    redis_client.publish(f'job:{job_id}:events', json.dumps(payload))
    await ws_manager.broadcast(job_id, payload)

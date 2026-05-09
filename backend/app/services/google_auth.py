from datetime import datetime, timedelta, timezone


def token_expired(token_expires_at: datetime | None) -> bool:
    if token_expires_at is None:
        return True
    return token_expires_at <= datetime.now(timezone.utc) + timedelta(minutes=5)

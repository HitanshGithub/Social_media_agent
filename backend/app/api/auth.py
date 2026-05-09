from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter(prefix='/api/auth', tags=['auth'])


@router.get('/google')
async def google_auth_url():
    settings = get_settings()
    return {
        'auth_url': 'https://accounts.google.com/o/oauth2/v2/auth',
        'client_id': settings.google_client_id,
        'redirect_uri': settings.google_redirect_uri,
    }


@router.get('/google/callback')
async def google_callback(code: str):
    return {'code': code, 'jwt': 'mock-jwt'}


@router.get('/me')
async def me():
    return {'user': {'id': 'local-user', 'email': 'user@example.com'}}


@router.post('/logout')
async def logout():
    return {'ok': True}

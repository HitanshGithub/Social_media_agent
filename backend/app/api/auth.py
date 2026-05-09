from fastapi import APIRouter
router = APIRouter(prefix='/api/auth', tags=['auth'])

@router.get('/me')
async def me():
    return {'user': None}

from fastapi import APIRouter
router = APIRouter(prefix='/api/admin', tags=['admin'])

@router.get('/stats')
async def stats():
    return {'status': 'ok'}

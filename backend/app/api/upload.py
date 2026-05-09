from fastapi import APIRouter
router = APIRouter(prefix='/api/upload', tags=['upload'])

@router.post('')
async def upload_video():
    return {'message': 'upload endpoint scaffolded'}

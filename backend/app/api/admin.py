from fastapi import APIRouter

router = APIRouter(prefix='/api/admin', tags=['admin'])


@router.get('/traces')
async def traces():
    return {'runs': []}


@router.get('/stats')
async def stats():
    return {
        'total_jobs': 0,
        'completed_jobs': 0,
        'failed_jobs': 0,
        'avg_processing_time_seconds': 0,
        'total_tokens': 0,
    }

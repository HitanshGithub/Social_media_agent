from fastapi import APIRouter
from app.models.schemas import ResumeRequest
from app.tasks import run_video_agent

router = APIRouter(prefix='/api/jobs', tags=['jobs'])

JOBS: dict[str, dict] = {}


@router.get('')
async def list_jobs():
    return list(JOBS.values())


@router.get('/{job_id}')
async def get_job(job_id: str):
    return JOBS.get(job_id, {'job_id': job_id, 'status': 'unknown'})


@router.post('/{job_id}/run')
async def run_job(job_id: str):
    state = JOBS.get(job_id, {'job_id': job_id, 'status': 'pending', 'video_path': '', 'user_id': 'anonymous'})
    task = run_video_agent.delay(state)
    JOBS[job_id] = {**state, 'celery_task_id': task.id, 'status': 'transcribing'}
    return {'celery_task_id': task.id}


@router.post('/{job_id}/resume')
async def resume_job(job_id: str, body: ResumeRequest):
    item = JOBS.get(job_id, {'job_id': job_id})
    item['user_metadata'] = body.user_metadata.model_dump()
    item['status'] = 'uploading'
    JOBS[job_id] = item
    return {'job_id': job_id, 'status': item['status']}


@router.delete('/{job_id}')
async def delete_job(job_id: str):
    JOBS.pop(job_id, None)
    return {'deleted': job_id}

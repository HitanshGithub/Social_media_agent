import os
import uuid
from pathlib import Path
from fastapi import APIRouter, File, HTTPException, UploadFile
from app.core.config import get_settings
from app.models.schemas import UploadResponse
from app.api.jobs import JOBS

router = APIRouter(prefix='/api/upload', tags=['upload'])

ALLOWED_EXT = {'.mp4', '.mov', '.avi', '.mkv', '.webm'}


@router.post('', response_model=UploadResponse)
async def upload_video(file: UploadFile = File(...)):
    settings = get_settings()
    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail='Unsupported file type')

    job_id = uuid.uuid4().hex
    target_dir = Path(settings.upload_dir) / job_id
    target_dir.mkdir(parents=True, exist_ok=True)
    dst = target_dir / file.filename

    content = await file.read()
    max_bytes = settings.max_upload_size_gb * 1024 * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(status_code=400, detail='File too large')

    with open(dst, 'wb') as f:
        f.write(content)

    # Register the job so it can be found later by /api/jobs/{job_id}/run
    JOBS[job_id] = {
        'job_id': job_id,
        'status': 'uploaded',
        'video_path': str(dst),
        'video_filename': file.filename,
        'user_id': 'anonymous',
    }

    return UploadResponse(job_id=job_id, filename=file.filename, duration=0.0, resolution='unknown')

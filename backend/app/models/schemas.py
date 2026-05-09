from datetime import datetime
from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    job_id: str
    filename: str
    duration: float
    resolution: str


class RunJobResponse(BaseModel):
    celery_task_id: str


class ResumeMetadata(BaseModel):
    title: str | None = None
    description: str | None = None
    tags: list[str] = Field(default_factory=list)
    chapters: list[dict] = Field(default_factory=list)
    privacy: str | None = None
    scheduled_at: datetime | None = None
    pinned_comment: str | None = None
    custom_links: list[dict] = Field(default_factory=list)
    selected_frame_index: int | None = None
    category_id: str | None = None
    language: str | None = None


class ResumeRequest(BaseModel):
    user_metadata: ResumeMetadata


class EventPayload(BaseModel):
    event: str
    node: str | None = None
    data: dict = Field(default_factory=dict)
    timestamp: datetime

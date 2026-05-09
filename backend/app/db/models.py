import uuid
from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, BigInteger
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


def uuid_pk() -> Mapped[uuid.UUID]:
    return mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


class User(Base, TimestampMixin):
    __tablename__ = 'users'
    id: Mapped[uuid.UUID] = uuid_pk()
    google_id: Mapped[str] = mapped_column(String, unique=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String)
    profile_picture: Mapped[str | None] = mapped_column(Text)
    google_access_token: Mapped[str | None] = mapped_column(Text)
    google_refresh_token: Mapped[str | None] = mapped_column(Text)
    token_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class UserSettings(Base, TimestampMixin):
    __tablename__ = 'user_settings'
    id: Mapped[uuid.UUID] = uuid_pk()
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'))
    channel_name: Mapped[str | None] = mapped_column(String)
    default_footer: Mapped[str | None] = mapped_column(Text)
    default_tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    default_links: Mapped[dict] = mapped_column(JSONB, default=dict)
    whisper_model_size: Mapped[str] = mapped_column(String, default='base')
    default_privacy: Mapped[str] = mapped_column(String, default='public')
    auto_thumbnail: Mapped[bool] = mapped_column(Boolean, default=True)


class VideoJob(Base, TimestampMixin):
    __tablename__ = 'video_jobs'
    id: Mapped[uuid.UUID] = uuid_pk()
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'))
    job_id: Mapped[str] = mapped_column(String, unique=True, index=True)
    filename: Mapped[str] = mapped_column(String)
    original_filename: Mapped[str] = mapped_column(String)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger)
    duration_seconds: Mapped[float] = mapped_column(Float)
    resolution: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String, default='pending')
    current_node: Mapped[str | None] = mapped_column(String)
    error_message: Mapped[str | None] = mapped_column(Text)
    celery_task_id: Mapped[str | None] = mapped_column(String)


class JobTranscript(Base):
    __tablename__ = 'job_transcripts'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    transcript_text: Mapped[str] = mapped_column(Text)
    srt_content: Mapped[str | None] = mapped_column(Text)
    language: Mapped[str | None] = mapped_column(String)
    word_count: Mapped[int | None] = mapped_column(Integer)
    segments: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class JobMetadata(Base, TimestampMixin):
    __tablename__ = 'job_metadata'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    ai_title: Mapped[str | None] = mapped_column(Text)
    ai_description: Mapped[str | None] = mapped_column(Text)
    ai_tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    ai_chapters: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    ai_hook: Mapped[str | None] = mapped_column(Text)
    final_title: Mapped[str | None] = mapped_column(Text)
    final_description: Mapped[str | None] = mapped_column(Text)
    final_tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    final_chapters: Mapped[list[dict]] = mapped_column(JSONB, default=list)
    category_id: Mapped[str] = mapped_column(String, default='22')
    privacy: Mapped[str] = mapped_column(String, default='public')
    language: Mapped[str] = mapped_column(String, default='en')
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    pinned_comment: Mapped[str | None] = mapped_column(Text)
    custom_links: Mapped[list[dict]] = mapped_column(JSONB, default=list)


class JobSEO(Base):
    __tablename__ = 'job_seo'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    score: Mapped[int] = mapped_column(Integer)
    grade: Mapped[str] = mapped_column(String)
    strengths: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)
    improvements: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)
    keyword_density: Mapped[str | None] = mapped_column(String)
    ctr_prediction: Mapped[str | None] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class JobSocialSnippet(Base):
    __tablename__ = 'job_social_snippets'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    twitter_thread: Mapped[list[str]] = mapped_column(JSONB, default=list)
    linkedin_post: Mapped[str | None] = mapped_column(Text)
    instagram_caption: Mapped[str | None] = mapped_column(Text)
    youtube_shorts_script: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class JobAsset(Base):
    __tablename__ = 'job_assets'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    asset_type: Mapped[str] = mapped_column(String)
    file_path: Mapped[str] = mapped_column(Text)
    is_selected: Mapped[bool] = mapped_column(Boolean, default=False)
    metadata_json: Mapped[dict] = mapped_column("metadata", JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class JobYouTubeResult(Base):
    __tablename__ = 'job_youtube_results'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    youtube_video_id: Mapped[str] = mapped_column(String, unique=True)
    youtube_url: Mapped[str] = mapped_column(Text)
    thumbnail_url: Mapped[str | None] = mapped_column(Text)
    upload_started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    upload_completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    pinned_comment_id: Mapped[str | None] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class AgentNodeLog(Base):
    __tablename__ = 'agent_node_logs'
    id: Mapped[uuid.UUID] = uuid_pk()
    job_id: Mapped[str] = mapped_column(String, ForeignKey('video_jobs.job_id'))
    node_name: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    duration_ms: Mapped[int | None] = mapped_column(Integer)
    tokens_used: Mapped[int | None] = mapped_column(Integer)
    langsmith_run_id: Mapped[str | None] = mapped_column(String)
    error: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

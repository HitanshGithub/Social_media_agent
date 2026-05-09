from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    app_name: str = Field(default='Social Media Agent', alias='APP_NAME')
    app_env: str = Field(default='development', alias='APP_ENV')
    app_host: str = Field(default='0.0.0.0', alias='APP_HOST')
    app_port: int = Field(default=8000, alias='APP_PORT')
    frontend_url: str = Field(default='http://localhost:5173', alias='FRONTEND_URL')

    secret_key: str = Field(default='change-me', alias='SECRET_KEY')
    jwt_algorithm: str = Field(default='HS256', alias='JWT_ALGORITHM')
    jwt_expire_minutes: int = Field(default=10080, alias='JWT_EXPIRE_MINUTES')

    xai_api_key: str = Field(default='', alias='XAI_API_KEY')
    xai_base_url: str = Field(default='https://api.x.ai/v1', alias='XAI_BASE_URL')
    xai_model: str = Field(default='grok-3-mini', alias='XAI_MODEL')

    langchain_tracing_v2: bool = Field(default=True, alias='LANGCHAIN_TRACING_V2')
    langchain_api_key: str = Field(default='', alias='LANGCHAIN_API_KEY')
    langchain_project: str = Field(default='social-media-agent', alias='LANGCHAIN_PROJECT')
    langchain_endpoint: str = Field(default='https://api.smith.langchain.com', alias='LANGCHAIN_ENDPOINT')

    google_client_id: str = Field(default='', alias='GOOGLE_CLIENT_ID')
    google_client_secret: str = Field(default='', alias='GOOGLE_CLIENT_SECRET')
    google_redirect_uri: str = Field(default='http://localhost:8000/api/auth/google/callback', alias='GOOGLE_REDIRECT_URI')

    database_url: str = Field(alias='DATABASE_URL')
    sync_database_url: str = Field(default='postgresql+psycopg2://postgres:password@db:5432/social_media_agent', alias='SYNC_DATABASE_URL')
    redis_url: str = Field(alias='REDIS_URL')

    upload_dir: str = Field(default='./uploads', alias='UPLOAD_DIR')
    output_dir: str = Field(default='./outputs', alias='OUTPUT_DIR')
    whisper_model_size: str = Field(default='base', alias='WHISPER_MODEL_SIZE')
    max_upload_size_gb: int = Field(default=2, alias='MAX_UPLOAD_SIZE_GB')


@lru_cache
def get_settings() -> Settings:
    return Settings()

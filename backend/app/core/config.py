from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    xai_api_key: str = Field(default='', alias='XAI_API_KEY')
    xai_base_url: str = Field(default='https://api.x.ai/v1', alias='XAI_BASE_URL')
    xai_model: str = Field(default='grok-3-mini', alias='XAI_MODEL')

    database_url: str = Field(alias='DATABASE_URL')
    redis_url: str = Field(alias='REDIS_URL')


settings = Settings()

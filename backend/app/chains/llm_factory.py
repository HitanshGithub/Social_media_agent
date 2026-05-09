from langchain_openai import ChatOpenAI
from app.core.config import get_settings


def build_llm(temperature: float = 0.2) -> ChatOpenAI:
    settings = get_settings()
    return ChatOpenAI(
        model=settings.xai_model,
        api_key=settings.xai_api_key,
        base_url=settings.xai_base_url,
        temperature=temperature,
        max_retries=2,
    )

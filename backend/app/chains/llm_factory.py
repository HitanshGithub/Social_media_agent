from langchain_openai import ChatOpenAI
from app.core.config import settings


def build_llm(temperature: float = 0.2) -> ChatOpenAI:
    return ChatOpenAI(
        model=settings.xai_model,
        api_key=settings.xai_api_key,
        base_url=settings.xai_base_url,
        temperature=temperature,
    )

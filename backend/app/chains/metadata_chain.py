from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from app.chains.llm_factory import build_llm


def build_metadata_chain():
    prompt = ChatPromptTemplate.from_template(
        'You are a YouTube strategist. Return strict JSON with keys title, description, tags, hook from transcript:\n{transcript}'
    )
    return (prompt | build_llm(0.4) | JsonOutputParser()).with_retry(stop_after_attempt=3)

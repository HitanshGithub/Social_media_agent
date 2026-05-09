from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from app.chains.llm_factory import build_llm


def build_chapters_chain():
    prompt = ChatPromptTemplate.from_template(
        'Create chapter markers JSON list from transcript segments:\n{segments}'
    )
    return (prompt | build_llm(0.2) | JsonOutputParser()).with_retry(stop_after_attempt=3)

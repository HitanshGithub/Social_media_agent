from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from app.chains.llm_factory import build_llm


def build_metadata_chain():
    prompt = ChatPromptTemplate.from_template('Generate YouTube metadata as JSON for transcript:\n{transcript}')
    return (prompt | build_llm(0.4) | JsonOutputParser()).with_retry(stop_after_attempt=3)

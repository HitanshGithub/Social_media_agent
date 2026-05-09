from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from app.chains.llm_factory import build_llm


def build_seo_chain():
    prompt = ChatPromptTemplate.from_template(
        'Score SEO for this metadata and return JSON with score, grade, strengths, improvements, keyword_density, ctr_prediction:\n{metadata}'
    )
    return (prompt | build_llm(0.2) | JsonOutputParser()).with_retry(stop_after_attempt=3)

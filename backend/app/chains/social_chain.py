from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from app.chains.llm_factory import build_llm


def build_social_chain():
    prompt = ChatPromptTemplate.from_template(
        'Generate social snippets JSON with twitter_thread, linkedin_post, instagram_caption, youtube_shorts_script from transcript and title:\n{payload}'
    )
    return (prompt | build_llm(0.5) | JsonOutputParser()).with_retry(stop_after_attempt=3)

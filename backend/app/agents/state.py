from typing import TypedDict


class VideoAgentState(TypedDict, total=False):
    job_id: str
    user_id: str
    video_path: str
    transcript: str
    generated_title: str
    generated_description: str
    generated_tags: list[str]
    generated_chapters: list[dict]
    generated_hook: str
    seo_score: int
    seo_grade: str
    twitter_thread: list[str]
    linkedin_post: str
    instagram_caption: str
    shorts_script: str
    current_node: str
    error: str | None

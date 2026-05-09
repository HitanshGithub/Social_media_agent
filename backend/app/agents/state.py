from typing import TypedDict


class VideoAgentState(TypedDict, total=False):
    job_id: str
    user_id: str
    video_path: str
    video_filename: str
    video_duration: float
    video_resolution: str
    transcript: str
    transcript_segments: list[dict]
    srt_content: str
    detected_language: str
    generated_title: str
    generated_description: str
    generated_tags: list[str]
    generated_chapters: list[dict]
    generated_hook: str
    seo_score: int
    seo_grade: str
    seo_strengths: list[str]
    seo_improvements: list[str]
    seo_keyword_density: str
    seo_ctr_prediction: str
    twitter_thread: list[str]
    linkedin_post: str
    instagram_caption: str
    shorts_script: str
    extracted_frame_paths: list[str]
    selected_frame_path: str
    thumbnail_path: str
    audio_path: str
    user_metadata: dict
    youtube_video_id: str
    youtube_url: str
    current_node: str
    error: str | None
    tokens_used: dict[str, int]
    node_timings: dict[str, float]

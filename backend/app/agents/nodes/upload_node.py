from app.agents.state import VideoAgentState
from app.services.youtube_service import upload_video


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'upload_node'
    user_meta = state.get('user_metadata', {})

    title = user_meta.get('title') or state.get('generated_title', '')
    description = user_meta.get('description') or state.get('generated_description', '')
    tags = user_meta.get('tags') or state.get('generated_tags', [])
    privacy = user_meta.get('privacy') or 'public'

    upload_result = upload_video(state['video_path'], title, description, tags, privacy)
    state['youtube_video_id'] = upload_result['youtube_video_id']
    state['youtube_url'] = upload_result['youtube_url']
    return state

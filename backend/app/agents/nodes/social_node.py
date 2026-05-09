from app.agents.state import VideoAgentState
from app.chains.social_chain import build_social_chain


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'social_node'
    chain = build_social_chain()
    result = chain.invoke(
        {'payload': {'title': state.get('generated_title', ''), 'transcript': state.get('transcript', '')}}
    )
    state['twitter_thread'] = result.get('twitter_thread', [])
    state['linkedin_post'] = result.get('linkedin_post', '')
    state['instagram_caption'] = result.get('instagram_caption', '')
    state['shorts_script'] = result.get('youtube_shorts_script', '')
    return state

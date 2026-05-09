from app.agents.state import VideoAgentState


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'human_review_node'
    # Pause marker; resume endpoint injects user_metadata.
    state.setdefault('user_metadata', {})
    return state

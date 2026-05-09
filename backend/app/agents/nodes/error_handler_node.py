from app.agents.state import VideoAgentState


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'error_handler_node'
    if not state.get('error'):
        state['error'] = 'Unknown pipeline error'
    return state

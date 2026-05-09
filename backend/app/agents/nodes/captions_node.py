from app.agents.state import VideoAgentState


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = __name__.split('.')[-1]
    return state

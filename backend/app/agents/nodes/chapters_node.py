from app.agents.state import VideoAgentState
from app.chains.chapters_chain import build_chapters_chain


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'chapters_node'
    chain = build_chapters_chain()
    result = chain.invoke({'segments': state.get('transcript_segments', [])})
    state['generated_chapters'] = result if isinstance(result, list) else result.get('chapters', [])
    return state

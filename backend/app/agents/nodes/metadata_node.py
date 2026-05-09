from app.agents.state import VideoAgentState
from app.chains.metadata_chain import build_metadata_chain


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'metadata_node'
    chain = build_metadata_chain()
    result = chain.invoke({'transcript': state.get('transcript', '')})

    state['generated_title'] = result.get('title', '')
    state['generated_description'] = result.get('description', '')
    state['generated_tags'] = result.get('tags', [])
    state['generated_hook'] = result.get('hook', '')
    return state

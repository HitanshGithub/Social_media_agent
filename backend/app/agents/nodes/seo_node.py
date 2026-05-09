from app.agents.state import VideoAgentState
from app.chains.seo_chain import build_seo_chain


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'seo_node'
    chain = build_seo_chain()
    result = chain.invoke(
        {
            'metadata': {
                'title': state.get('generated_title', ''),
                'description': state.get('generated_description', ''),
                'tags': state.get('generated_tags', []),
            }
        }
    )
    state['seo_score'] = int(result.get('score', 0))
    state['seo_grade'] = result.get('grade', 'N/A')
    state['seo_strengths'] = result.get('strengths', [])
    state['seo_improvements'] = result.get('improvements', [])
    state['seo_keyword_density'] = result.get('keyword_density', '')
    state['seo_ctr_prediction'] = result.get('ctr_prediction', '')
    return state

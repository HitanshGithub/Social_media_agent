from pathlib import Path
from app.agents.state import VideoAgentState
from app.services.thumbnail_service import build_thumbnail


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'thumbnail_node'
    selected = state.get('selected_frame_path') or (state.get('extracted_frame_paths') or [''])[0]
    job_id = state['job_id']
    out = Path('outputs') / job_id / 'thumbnail.jpg'
    thumb = build_thumbnail(selected, str(out), state.get('generated_title', 'New Video'))
    state['thumbnail_path'] = thumb
    state['selected_frame_path'] = selected
    return state

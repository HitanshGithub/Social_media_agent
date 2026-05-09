from pathlib import Path
from app.agents.state import VideoAgentState
from app.services.ffmpeg_service import extract_frame


PCTS = [0.10, 0.25, 0.50, 0.70, 0.90]


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'frames_node'
    job_id = state['job_id']
    duration = state.get('video_duration', 0.0)
    out_dir = Path('outputs') / job_id / 'frames'

    paths: list[str] = []
    for i, pct in enumerate(PCTS, start=1):
        out = out_dir / f'frame_{i}.jpg'
        extract_frame(state['video_path'], str(out), duration * pct)
        paths.append(str(out))

    state['extracted_frame_paths'] = paths
    return state

from app.agents.state import VideoAgentState


def _to_srt_time(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f'{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}'


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'captions_node'
    rows = []
    for idx, seg in enumerate(state.get('transcript_segments', []), start=1):
        rows.append(f"{idx}\n{_to_srt_time(seg['start'])} --> {_to_srt_time(seg['end'])}\n{seg['text']}\n")
    state['srt_content'] = '\n'.join(rows)
    return state

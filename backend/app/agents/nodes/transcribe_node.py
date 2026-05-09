from pathlib import Path
from app.agents.state import VideoAgentState
from app.services.ffmpeg_service import strip_audio_to_wav
from app.services.whisper_service import transcribe_audio


def run(state: VideoAgentState) -> VideoAgentState:
    state['current_node'] = 'transcribe_node'
    job_id = state['job_id']
    audio_path = str(Path('outputs') / job_id / 'audio.wav')
    strip_audio_to_wav(state['video_path'], audio_path)

    result = transcribe_audio(audio_path)
    state['audio_path'] = audio_path
    state['transcript'] = result['transcript_text']
    state['transcript_segments'] = result['segments']
    state['detected_language'] = result['language']
    return state

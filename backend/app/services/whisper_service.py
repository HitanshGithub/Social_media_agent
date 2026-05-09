from faster_whisper import WhisperModel
from app.core.config import get_settings


def transcribe_audio(audio_path: str) -> dict:
    settings = get_settings()
    model = WhisperModel(settings.whisper_model_size)
    segments, info = model.transcribe(audio_path)

    seg_rows = []
    lines = []
    for segment in segments:
        seg_rows.append({'start': segment.start, 'end': segment.end, 'text': segment.text.strip()})
        lines.append(segment.text.strip())

    return {
        'transcript_text': ' '.join(lines).strip(),
        'segments': seg_rows,
        'language': info.language,
    }

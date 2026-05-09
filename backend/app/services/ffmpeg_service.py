from pathlib import Path
import ffmpeg


def strip_audio_to_wav(video_path: str, output_path: str) -> str:
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    (
        ffmpeg
        .input(video_path)
        .output(output_path, ac=1, ar=16000)
        .overwrite_output()
        .run(quiet=True)
    )
    return output_path


def extract_frame(video_path: str, output_path: str, time_seconds: float) -> str:
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    (
        ffmpeg
        .input(video_path, ss=time_seconds)
        .output(output_path, vframes=1)
        .overwrite_output()
        .run(quiet=True)
    )
    return output_path

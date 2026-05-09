def upload_video(video_path: str, title: str, description: str, tags: list[str], privacy: str = 'public') -> dict:
    # Placeholder for YouTube Data API resumable upload integration.
    return {
        'youtube_video_id': 'mock-video-id',
        'youtube_url': 'https://youtube.com/watch?v=mock-video-id',
        'thumbnail_url': '',
        'privacy': privacy,
        'title': title,
        'description': description,
        'tags': tags,
    }

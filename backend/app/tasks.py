from app.core.celery_app import celery_app
from app.agents.video_publisher_graph import build_graph


@celery_app.task(name='app.tasks.run_video_agent')
def run_video_agent(state: dict) -> dict:
    graph = build_graph()
    return graph.invoke(state)

from langgraph.graph import StateGraph, START, END
from app.agents.state import VideoAgentState
from app.agents.nodes import (
    transcribe_node,
    metadata_node,
    chapters_node,
    captions_node,
    frames_node,
    thumbnail_node,
    seo_node,
    social_node,
    human_review_node,
    upload_node,
    error_handler_node,
)


def build_graph():
    graph = StateGraph(VideoAgentState)

    graph.add_node('transcribe_node', transcribe_node.run)
    graph.add_node('metadata_node', metadata_node.run)
    graph.add_node('chapters_node', chapters_node.run)
    graph.add_node('captions_node', captions_node.run)
    graph.add_node('frames_node', frames_node.run)
    graph.add_node('seo_node', seo_node.run)
    graph.add_node('social_node', social_node.run)
    graph.add_node('thumbnail_node', thumbnail_node.run)
    graph.add_node('human_review_node', human_review_node.run)
    graph.add_node('upload_node', upload_node.run)
    graph.add_node('error_handler_node', error_handler_node.run)

    graph.add_edge(START, 'transcribe_node')
    graph.add_edge('transcribe_node', 'metadata_node')

    graph.add_edge('metadata_node', 'chapters_node')
    graph.add_edge('chapters_node', 'captions_node')
    graph.add_edge('captions_node', 'frames_node')
    graph.add_edge('frames_node', 'seo_node')
    graph.add_edge('seo_node', 'social_node')
    graph.add_edge('social_node', 'thumbnail_node')
    graph.add_edge('thumbnail_node', 'human_review_node')
    graph.add_edge('human_review_node', 'upload_node')

    graph.add_edge('upload_node', END)
    graph.add_edge('error_handler_node', END)
    return graph.compile()

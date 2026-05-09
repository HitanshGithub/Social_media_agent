from langgraph.graph import StateGraph, START, END
from app.agents.state import VideoAgentState
from app.agents.nodes import (
    transcribe_node, metadata_node, chapters_node, captions_node, frames_node,
    thumbnail_node, seo_node, social_node, human_review_node, upload_node, error_handler_node,
)


def build_graph():
    g = StateGraph(VideoAgentState)
    g.add_node('transcribe_node', transcribe_node.run)
    g.add_node('metadata_node', metadata_node.run)
    g.add_node('chapters_node', chapters_node.run)
    g.add_node('captions_node', captions_node.run)
    g.add_node('frames_node', frames_node.run)
    g.add_node('seo_node', seo_node.run)
    g.add_node('social_node', social_node.run)
    g.add_node('thumbnail_node', thumbnail_node.run)
    g.add_node('human_review_node', human_review_node.run)
    g.add_node('upload_node', upload_node.run)
    g.add_node('error_handler_node', error_handler_node.run)

    g.add_edge(START, 'transcribe_node')
    g.add_edge('transcribe_node', 'metadata_node')
    g.add_edge('metadata_node', 'chapters_node')
    g.add_edge('metadata_node', 'captions_node')
    g.add_edge('metadata_node', 'frames_node')
    g.add_edge('metadata_node', 'seo_node')
    g.add_edge('metadata_node', 'social_node')
    g.add_edge('chapters_node', 'thumbnail_node')
    g.add_edge('captions_node', 'thumbnail_node')
    g.add_edge('frames_node', 'thumbnail_node')
    g.add_edge('seo_node', 'thumbnail_node')
    g.add_edge('social_node', 'thumbnail_node')
    g.add_edge('thumbnail_node', 'human_review_node')
    g.add_edge('human_review_node', 'upload_node')
    g.add_edge('upload_node', END)
    g.add_edge('error_handler_node', END)
    return g.compile()

from collections import defaultdict
from fastapi import WebSocket


class WebSocketManager:
    def __init__(self) -> None:
        self.connections: dict[str, set[WebSocket]] = defaultdict(set)

    async def connect(self, job_id: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self.connections[job_id].add(websocket)

    def disconnect(self, job_id: str, websocket: WebSocket) -> None:
        self.connections[job_id].discard(websocket)

    async def broadcast(self, job_id: str, payload: dict) -> None:
        for socket in list(self.connections[job_id]):
            await socket.send_json(payload)


ws_manager = WebSocketManager()

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload, jobs, auth, admin
from app.core.config import get_settings
from app.core.langsmith_config import configure_langsmith
from app.core.websocket_manager import ws_manager
from app.db.database import init_db

settings = get_settings()
app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, '*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(upload.router)
app.include_router(jobs.router)
app.include_router(auth.router)
app.include_router(admin.router)


@app.on_event('startup')
async def on_startup() -> None:
    configure_langsmith()
    await init_db()


@app.get('/health')
async def health():
    return {'status': 'healthy'}


@app.websocket('/ws/{job_id}')
async def ws_endpoint(websocket: WebSocket, job_id: str):
    await ws_manager.connect(job_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(job_id, websocket)

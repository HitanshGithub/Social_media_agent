from fastapi import FastAPI
from app.api import upload, jobs, auth, admin

app = FastAPI(title='Social Media Agent')
app.include_router(upload.router)
app.include_router(jobs.router)
app.include_router(auth.router)
app.include_router(admin.router)

@app.get('/health')
async def health():
    return {'status': 'healthy'}

# Social Media Agent

Agentic AI YouTube publisher with FastAPI + LangGraph + React.

## Stack
- Backend: FastAPI, SQLAlchemy async, PostgreSQL, Redis, Celery, LangGraph, LangChain, xAI Grok
- Frontend: React + Vite + Zustand + TanStack Query
- Infra: Docker Compose (db, redis, backend, worker, flower, frontend)

## Environment
Copy `.env.example` to `.env` and set values, especially:
- `XAI_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SECRET_KEY`

## Run with Docker
```bash
docker compose -f docker/docker-compose.yml up --build
```

## Backend dev
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend dev
```bash
cd frontend
npm install
npm run dev
```

## API Routes
- `POST /api/upload`
- `POST /api/jobs/{job_id}/run`
- `GET /api/jobs/{job_id}`
- `GET /api/jobs`
- `POST /api/jobs/{job_id}/resume`
- `DELETE /api/jobs/{job_id}`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/admin/traces`
- `GET /api/admin/stats`
- `WS /ws/{job_id}`

## Notes
- The code uses `XAI_API_KEY` and OpenAI-compatible `XAI_BASE_URL` for Grok calls.
- Never commit secrets in git.

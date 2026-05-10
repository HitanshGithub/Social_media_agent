# 🤖 Social Media Agent

An **Agentic AI YouTube Publisher** powered by a robust stack of modern web technologies. This application automates the process of generating video metadata, captions, chapters, and social media snippets using advanced AI pipelines.

---

## ✨ Features

- **🎥 Video Processing Pipeline:** Upload videos and let the AI pipeline transcribe and analyze the content.
- **🧠 Agentic AI:** Powered by LangGraph, LangChain, and xAI Grok to intelligently generate SEO-optimized titles, descriptions, and tags.
- **📝 Content Editors:** Dedicated React components for editing captions, chapters, and reviewing AI-generated content.
- **📊 SEO & Social Snippets:** Get real-time SEO scorecards and auto-generated snippets for Twitter, LinkedIn, etc.
- **⚙️ Real-time Status:** Monitor the Celery worker pipeline directly from the UI with WebSocket integration.
- **🗂️ History Dashboard:** View past jobs, manage uploads, and track API usage statistics.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **WebSockets:** Real-time updates from the backend agent

### **Backend**
- **Framework:** FastAPI
- **Database:** PostgreSQL (Asyncpg) + SQLAlchemy
- **Caching & Brokers:** Redis
- **Task Queue:** Celery + Flower (Monitoring)
- **AI / LLM:** LangGraph, LangChain, xAI Grok (via XAI_API_KEY)
- **Media Processing:** Faster-Whisper, FFmpeg, Pillow

### **Infrastructure**
- **Containerization:** Docker & Docker Compose
- **Services:** db, redis, backend, worker, flower, frontend

---

## 🚀 Getting Started

### 1. Environment Setup
Copy the example environment file and fill in your credentials.
```bash
cp .env.example .env
```
**Key variables to set:**
- `XAI_API_KEY` (and `XAI_BASE_URL` if needed)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SECRET_KEY`

### 2. Run with Docker (Recommended)
Easily spin up the entire stack using Docker Compose:
```bash
docker compose -f docker/docker-compose.yml up --build
```

### 3. Local Development (Without Docker)

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 Key API Routes

### **Jobs & Uploads**
- `POST /api/upload` - Upload a new video
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/{job_id}` - Get job details
- `POST /api/jobs/{job_id}/run` - Start processing
- `POST /api/jobs/{job_id}/resume` - Resume paused job
- `DELETE /api/jobs/{job_id}` - Delete job
- `WS /ws/{job_id}` - WebSocket for real-time Agent logs

### **Authentication**
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### **Admin**
- `GET /api/admin/traces` - LangSmith traces
- `GET /api/admin/stats` - System statistics

---

## ⚠️ Important Notes
- Ensure `ffmpeg` is installed on your system if running outside of Docker, as it is required for video processing and transcription.
- **Security:** Never commit your `.env` file or API keys to version control.

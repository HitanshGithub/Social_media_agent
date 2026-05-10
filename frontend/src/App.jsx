import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UploadZone from './components/UploadZone'
import AgentStatusPanel from './components/AgentStatusPanel'
import ReviewPanel from './components/ReviewPanel'
import ThumbnailPicker from './components/ThumbnailPicker'
import SocialSnippets from './components/SocialSnippets'
import SEOScoreCard from './components/SEOScoreCard'
import CaptionEditor from './components/CaptionEditor'
import ChapterEditor from './components/ChapterEditor'
import HistoryDashboard from './components/HistoryDashboard'
import UploadProgress from './components/UploadProgress'
import SuccessScreen from './components/SuccessScreen'
import AdminPanel from './components/AdminPanel'
import Settings from './components/Settings'
import { useAgentWebSocket } from './hooks/useAgentWebSocket'
import { useAgentStore } from './store/agentStore'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'upload', label: 'Upload', icon: '📤' },
  { id: 'agent', label: 'Agent Status', icon: '🤖' },
  { id: 'review', label: 'Review', icon: '✏️' },
  { id: 'history', label: 'History', icon: '📋' },
  { id: 'admin', label: 'Admin', icon: '⚙️' },
  { id: 'settings', label: 'Settings', icon: '🔧' },
]

const PAGE_INFO = {
  dashboard: { title: 'Dashboard', desc: 'Overview of your video publishing pipeline' },
  upload: { title: 'Upload Video', desc: 'Drag & drop or browse to upload your video' },
  agent: { title: 'Agent Status', desc: 'Real-time AI agent processing status' },
  review: { title: 'Review & Edit', desc: 'Review and customize AI-generated content' },
  history: { title: 'Job History', desc: 'View all past and current jobs' },
  admin: { title: 'Admin Panel', desc: 'System statistics and LangSmith traces' },
  settings: { title: 'Settings', desc: 'Configure your preferences' },
}

export default function App() {
  const [view, setView] = useState('dashboard')
  const jobId = useAgentStore((s) => s.jobId)
  useAgentWebSocket(jobId)

  const info = PAGE_INFO[view]

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>Social Media Agent</h1>
          <p>Agentic AI · YouTube Publisher</p>
        </div>
        <nav className="nav-items">
          {NAV.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${view === item.id ? 'active' : ''}`}
              onClick={() => setView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}></span>
            All systems online
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="page-header">
          <h2>{info.title}</h2>
          <p>{info.desc}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {view === 'dashboard' && <DashboardView onNavigate={setView} />}
            {view === 'upload' && <UploadView onNavigate={setView} />}
            {view === 'agent' && <AgentView />}
            {view === 'review' && <ReviewView />}
            {view === 'history' && <HistoryDashboard />}
            {view === 'admin' && <AdminPanel />}
            {view === 'settings' && <Settings />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

function DashboardView({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="grid-3">
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('upload')}>
          <div className="card-title">📤 Quick Upload</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Upload a new video to start the AI pipeline</p>
          <div style={{ marginTop: '0.75rem' }}><span className="btn btn-primary">Upload Video</span></div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('agent')}>
          <div className="card-title">🤖 Agent Status</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Monitor AI processing in real-time</p>
          <div style={{ marginTop: '0.75rem' }}><span className="badge badge-done">● Ready</span></div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('history')}>
          <div className="card-title">📋 Recent Jobs</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>View your job history and results</p>
          <div style={{ marginTop: '0.75rem' }}><span className="btn btn-secondary">View All</span></div>
        </div>
      </div>
      <div className="grid-2">
        <AgentStatusPanel />
        <SEOScoreCard />
      </div>
      <UploadZone compact />
    </div>
  )
}

function UploadView({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <UploadZone onNavigate={onNavigate} />
      <UploadProgress />
    </div>
  )
}

function AgentView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <AgentStatusPanel />
      <SuccessScreen />
    </div>
  )
}

function ReviewView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="grid-2">
        <CaptionEditor />
        <ChapterEditor />
      </div>
      <ThumbnailPicker />
      <div className="grid-2">
        <SocialSnippets />
        <SEOScoreCard />
      </div>
      <ReviewPanel />
    </div>
  )
}

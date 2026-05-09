import { useState } from 'react'
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

export default function App() {
  const [jobId] = useState('demo-job')
  useAgentWebSocket(jobId)

  return (
    <main style={{ minHeight: '100vh', background: '#080810', color: '#F59E0B', padding: '1.25rem' }}>
      <h1 style={{ fontFamily: 'Syne, sans-serif' }}>Social Media Agent</h1>
      <p style={{ color: '#14B8A6', fontFamily: 'JetBrains Mono, monospace' }}>Agentic AI YouTube Publisher</p>
      <div className='grid' style={{ display: 'grid', gap: '0.75rem' }}>
        <UploadZone /><AgentStatusPanel /><ReviewPanel /><ThumbnailPicker />
        <SocialSnippets /><SEOScoreCard /><CaptionEditor /><ChapterEditor />
        <HistoryDashboard /><UploadProgress /><SuccessScreen /><AdminPanel /><Settings />
      </div>
    </main>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../store/agentStore'
import { api } from '../api/client'

const STATUS_MAP = {
  idle: { label: 'Idle', color: 'var(--text-muted)', badge: 'badge-pending' },
  uploaded: { label: 'Uploaded', color: 'var(--amber)', badge: 'badge-pending' },
  transcribing: { label: 'Transcribing', color: 'var(--blue)', badge: 'badge-running' },
  generating: { label: 'Generating', color: 'var(--purple)', badge: 'badge-running' },
  uploading: { label: 'Publishing', color: 'var(--teal)', badge: 'badge-running' },
  running: { label: 'Running', color: 'var(--blue)', badge: 'badge-running' },
  done: { label: 'Complete', color: 'var(--green)', badge: 'badge-done' },
  error: { label: 'Error', color: 'var(--red)', badge: 'badge-error' },
}

export default function AgentStatusPanel() {
  const events = useAgentStore((s) => s.events)
  const status = useAgentStore((s) => s.currentStatus)
  const jobId = useAgentStore((s) => s.jobId)
  const setCurrentStatus = useAgentStore((s) => s.setCurrentStatus)
  const info = STATUS_MAP[status] || STATUS_MAP.idle
  const [running, setRunning] = useState(false)
  const [runResult, setRunResult] = useState(null)
  const [error, setError] = useState(null)

  const handleRunAgent = async () => {
    if (!jobId) return
    setRunning(true)
    setError(null)
    try {
      const { data } = await api.post(`/api/jobs/${jobId}/run`)
      setRunResult(data)
      setCurrentStatus('running')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start agent')
    }
    setRunning(false)
  }

  return (
    <div className="card">
      <div className="card-title">🤖 Agent Status</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {(status === 'running' || status === 'transcribing' || status === 'generating' || status === 'uploading') && <div className="spinner" />}
          <span className={`badge ${info.badge}`}>● {info.label}</span>
        </div>
        {jobId && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Job: {jobId.slice(0, 12)}…
          </span>
        )}
      </div>

      {/* Run Agent Button */}
      {jobId && (status === 'idle' || status === 'uploaded') && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(245,158,11,0.05)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
            🎬 Video uploaded and ready. Click below to start the AI agent pipeline.
          </p>
          <button className="btn btn-primary" onClick={handleRunAgent} disabled={running}>
            {running ? (
              <><div className="spinner" style={{ borderTopColor: '#000', borderColor: 'rgba(0,0,0,0.2)' }} /> Starting…</>
            ) : (
              '🚀 Run AI Agent'
            )}
          </button>
          {error && <p style={{ color: 'var(--red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>❌ {error}</p>}
          {runResult && (
            <p style={{ color: 'var(--green)', fontSize: '0.75rem', marginTop: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
              ✅ Task ID: {runResult.celery_task_id}
            </p>
          )}
        </div>
      )}

      {events.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {jobId ? 'No events yet. Click "Run AI Agent" to start the pipeline.' : 'No events yet. Upload a video to start.'}
        </p>
      ) : (
        <div className="timeline">
          {events.slice(-10).map((evt, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="timeline-dot" style={{
                background: evt.event === 'error' ? 'var(--red)'
                  : evt.event === 'done' ? 'var(--green)'
                  : 'var(--amber)'
              }} />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {evt.node || evt.event}
                </div>
                {evt.data && Object.keys(evt.data).length > 0 && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', marginTop: '0.2rem' }}>
                    {JSON.stringify(evt.data).slice(0, 100)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

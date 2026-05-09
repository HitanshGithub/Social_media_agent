import { motion } from 'framer-motion'
import { useAgentStore } from '../store/agentStore'

const STATUS_MAP = {
  idle: { label: 'Idle', color: 'var(--text-muted)', badge: 'badge-pending' },
  transcribing: { label: 'Transcribing', color: 'var(--blue)', badge: 'badge-running' },
  generating: { label: 'Generating', color: 'var(--purple)', badge: 'badge-running' },
  uploading: { label: 'Publishing', color: 'var(--teal)', badge: 'badge-running' },
  done: { label: 'Complete', color: 'var(--green)', badge: 'badge-done' },
  error: { label: 'Error', color: 'var(--red)', badge: 'badge-error' },
}

export default function AgentStatusPanel() {
  const events = useAgentStore((s) => s.events)
  const status = useAgentStore((s) => s.currentStatus)
  const jobId = useAgentStore((s) => s.jobId)
  const info = STATUS_MAP[status] || STATUS_MAP.idle

  return (
    <div className="card">
      <div className="card-title">🤖 Agent Status</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {status !== 'idle' && status !== 'done' && status !== 'error' && <div className="spinner" />}
          <span className={`badge ${info.badge}`}>● {info.label}</span>
        </div>
        {jobId && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Job: {jobId.slice(0, 12)}…
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No events yet. Upload a video to start the pipeline.</p>
      ) : (
        <div className="timeline">
          {events.slice(-8).map((evt, i) => (
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
                    {JSON.stringify(evt.data).slice(0, 80)}
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

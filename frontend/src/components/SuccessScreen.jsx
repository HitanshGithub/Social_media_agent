import { motion } from 'framer-motion'
import { useAgentStore } from '../store/agentStore'

export default function SuccessScreen() {
  const status = useAgentStore((s) => s.currentStatus)
  const jobId = useAgentStore((s) => s.jobId)
  const reset = useAgentStore((s) => s.reset)

  if (status !== 'done') {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          🎯 Waiting for agent to complete…
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="card pulse-glow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ textAlign: 'center', padding: '2rem' }}
    >
      <motion.div
        style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: 2, duration: 0.5 }}
      >
        🎉
      </motion.div>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Published!</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Your video has been successfully processed and published.
      </p>
      {jobId && (
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          Job ID: {jobId}
        </p>
      )}
      <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={reset}>
        📤 Upload Another Video
      </button>
    </motion.div>
  )
}

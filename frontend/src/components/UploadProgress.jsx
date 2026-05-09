import { motion } from 'framer-motion'
import { useAgentStore } from '../store/agentStore'

export default function UploadProgress() {
  const progress = useAgentStore((s) => s.uploadProgress)
  const file = useAgentStore((s) => s.uploadFile)

  if (!file && progress === 0) {
    return (
      <div className="card">
        <div className="card-title">📶 Upload Progress</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No upload in progress.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-title">📶 Upload Progress</div>
      {file && (
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          📁 {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
        </p>
      )}
      <div className="progress-bar" style={{ height: 10 }}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          style={{ height: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {progress < 100 ? 'Uploading…' : '✅ Complete'}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--amber)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
          {progress}%
        </span>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api/client'

export default function AdminPanel() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/admin/stats').then(({ data }) => setStats(data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: 'Total Jobs', value: stats.total_jobs, icon: '📊', color: 'var(--amber)' },
    { label: 'Completed', value: stats.completed_jobs, icon: '✅', color: 'var(--green)' },
    { label: 'Failed', value: stats.failed_jobs, icon: '❌', color: 'var(--red)' },
    { label: 'Avg Time (s)', value: stats.avg_processing_time_seconds, icon: '⏱️', color: 'var(--teal)' },
    { label: 'Total Tokens', value: stats.total_tokens, icon: '🔤', color: 'var(--purple)' },
  ] : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {loading ? (
          <div className="card"><div className="spinner" /></div>
        ) : (
          statCards.map((s, i) => (
            <motion.div
              key={s.label}
              className="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))
        )}
      </div>

      <div className="card">
        <div className="card-title">🔗 Quick Links</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="btn btn-secondary">📚 API Docs</a>
          <a href="http://localhost:5555" target="_blank" rel="noreferrer" className="btn btn-secondary">🌸 Flower Dashboard</a>
        </div>
      </div>
    </div>
  )
}

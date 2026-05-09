import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../api/client'

export default function HistoryDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/jobs').then(({ data }) => {
      setJobs(Array.isArray(data) ? data : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (jobId) => {
    try {
      await api.delete(`/api/jobs/${jobId}`)
      setJobs((prev) => prev.filter((j) => j.job_id !== jobId))
    } catch { /* ignore */ }
  }

  return (
    <div className="card">
      <div className="card-title">📋 Job History</div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
          <div className="spinner" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Loading jobs…</span>
        </div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No jobs yet. Upload a video to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {jobs.map((job, i) => (
            <motion.div
              key={job.job_id || i}
              className="timeline-item"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {(job.job_id || '').slice(0, 10)}…
                </span>
                <span className={`badge ${job.status === 'done' ? 'badge-done' : job.status === 'error' ? 'badge-error' : 'badge-pending'}`}>
                  ● {job.status || 'unknown'}
                </span>
              </div>
              <button className="btn btn-danger" style={{ padding: '0.3rem 0.5rem', fontSize: '0.65rem' }} onClick={() => handleDelete(job.job_id)}>
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

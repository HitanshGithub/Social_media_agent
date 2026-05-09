import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../store/agentStore'
import { api } from '../api/client'

export default function ReviewPanel() {
  const jobId = useAgentStore((s) => s.jobId)
  const [title, setTitle] = useState('My Awesome Video')
  const [desc, setDesc] = useState('Check out this video created with the Social Media Agent AI pipeline!')
  const [tags, setTags] = useState('AI, YouTube, automation')
  const [privacy, setPrivacy] = useState('private')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!jobId) return
    setSubmitting(true)
    try {
      await api.post(`/api/jobs/${jobId}/resume`, {
        user_metadata: {
          title, description: desc,
          tags: tags.split(',').map((t) => t.trim()),
          privacy,
        },
      })
      setSubmitted(true)
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const handleRun = async () => {
    if (!jobId) return
    try {
      await api.post(`/api/jobs/${jobId}/run`)
    } catch { /* ignore */ }
  }

  return (
    <div className="card">
      <div className="card-title">✏️ Review & Publish</div>

      {submitted ? (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
          <p style={{ color: 'var(--green)', fontWeight: 600 }}>Metadata submitted!</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleRun}>
            🚀 Run AI Agent
          </button>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', display: 'block' }}>Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', display: 'block' }}>Description</label>
            <textarea className="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', display: 'block' }}>Tags (comma-separated)</label>
            <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', display: 'block' }}>Privacy</label>
            <select className="input" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
              <option value="private">Private</option>
              <option value="unlisted">Unlisted</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting…' : '📝 Submit Metadata'}
            </button>
            <button className="btn btn-secondary" onClick={() => { setTitle(''); setDesc(''); setTags('') }}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

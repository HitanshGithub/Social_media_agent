import { useState } from 'react'

export default function CaptionEditor() {
  const [captions, setCaptions] = useState([
    { start: '0:00', end: '0:05', text: 'Welcome to this video!' },
    { start: '0:05', end: '0:12', text: 'Today we explore AI-powered video publishing.' },
    { start: '0:12', end: '0:20', text: 'Let me show you how it works.' },
  ])

  const handleChange = (i, field, val) => {
    setCaptions((prev) => prev.map((c, j) => (j === i ? { ...c, [field]: val } : c)))
  }

  const addCaption = () => {
    setCaptions((prev) => [...prev, { start: '0:00', end: '0:00', text: '' }])
  }

  const removeCaption = (i) => {
    setCaptions((prev) => prev.filter((_, j) => j !== i))
  }

  return (
    <div className="card">
      <div className="card-title">💬 Captions</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {captions.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <input
              className="input"
              style={{ width: '60px', textAlign: 'center', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}
              value={c.start}
              onChange={(e) => handleChange(i, 'start', e.target.value)}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>→</span>
            <input
              className="input"
              style={{ width: '60px', textAlign: 'center', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}
              value={c.end}
              onChange={(e) => handleChange(i, 'end', e.target.value)}
            />
            <input
              className="input"
              style={{ flex: 1, fontSize: '0.8rem' }}
              value={c.text}
              onChange={(e) => handleChange(i, 'text', e.target.value)}
            />
            <button className="btn btn-danger" style={{ padding: '0.35rem 0.5rem', fontSize: '0.7rem' }} onClick={() => removeCaption(i)}>✕</button>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" style={{ marginTop: '0.75rem' }} onClick={addCaption}>+ Add Caption</button>
    </div>
  )
}

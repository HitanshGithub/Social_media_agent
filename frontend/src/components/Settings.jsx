import { useState } from 'react'

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('grok-3-mini')
  const [autoPublish, setAutoPublish] = useState(false)
  const [whisper, setWhisper] = useState('base')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="card">
        <div className="card-title">🧠 AI Model</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Model</label>
            <select className="input" value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="grok-3-mini">Grok 3 Mini</option>
              <option value="grok-3">Grok 3</option>
              <option value="gpt-4o">GPT-4o</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Whisper Model Size</label>
            <select className="input" value={whisper} onChange={(e) => setWhisper(e.target.value)}>
              <option value="tiny">Tiny</option>
              <option value="base">Base</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">⚡ Preferences</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
          <div>
            <p style={{ fontSize: '0.85rem' }}>Auto-publish after review</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Skip manual approval step</p>
          </div>
          <div className={`toggle ${autoPublish ? 'active' : ''}`} onClick={() => setAutoPublish(!autoPublish)} />
        </div>
      </div>

      <div className="card">
        <div className="card-title">🔑 API Configuration</div>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>xAI API Key (optional override)</label>
          <input className="input" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="xai-..." />
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          These settings are stored locally and override the backend .env values.
        </p>
      </div>
    </div>
  )
}

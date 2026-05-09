import { useState } from 'react'
import { motion } from 'framer-motion'

const PLATFORMS = [
  { name: 'Twitter / X', icon: '🐦', color: '#1DA1F2' },
  { name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
  { name: 'Instagram', icon: '📸', color: '#E1306C' },
  { name: 'Reddit', icon: '🤖', color: '#FF4500' },
]

export default function SocialSnippets() {
  const [snippets, setSnippets] = useState(
    PLATFORMS.map((p) => ({ ...p, text: `Check out my new video! #AI #YouTube #${p.name.replace(/\s/g, '')}` }))
  )
  const [copied, setCopied] = useState(null)

  const handleCopy = (i) => {
    navigator.clipboard.writeText(snippets[i].text).catch(() => {})
    setCopied(i)
    setTimeout(() => setCopied(null), 1500)
  }

  const handleChange = (i, val) => {
    setSnippets((prev) => prev.map((s, j) => (j === i ? { ...s, text: val } : s)))
  }

  return (
    <div className="card">
      <div className="card-title">📱 Social Snippets</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {snippets.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
              <span>{s.icon}</span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <textarea
                className="textarea"
                style={{ minHeight: '48px', fontSize: '0.78rem' }}
                value={s.text}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <button
                className="btn btn-secondary"
                style={{ flexShrink: 0, height: 'fit-content', padding: '0.4rem 0.6rem', fontSize: '0.7rem' }}
                onClick={() => handleCopy(i)}
              >
                {copied === i ? '✓' : '📋'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

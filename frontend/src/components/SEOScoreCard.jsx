import { motion } from 'framer-motion'

const CRITERIA = [
  { label: 'Title Quality', score: 82, color: 'var(--green)' },
  { label: 'Description', score: 68, color: 'var(--amber)' },
  { label: 'Tags & Keywords', score: 90, color: 'var(--green)' },
  { label: 'Thumbnail Appeal', score: 75, color: 'var(--amber)' },
  { label: 'Engagement Hooks', score: 55, color: 'var(--red)' },
]

export default function SEOScoreCard() {
  const avg = Math.round(CRITERIA.reduce((a, c) => a + c.score, 0) / CRITERIA.length)

  return (
    <div className="card">
      <div className="card-title">📊 SEO Score</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
        <motion.div
          className="score-ring"
          style={{
            background: `conic-gradient(${avg >= 70 ? 'var(--green)' : 'var(--amber)'} ${avg * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
            color: avg >= 70 ? 'var(--green)' : 'var(--amber)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          {avg}
        </motion.div>
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{avg >= 80 ? 'Great!' : avg >= 60 ? 'Good' : 'Needs Work'}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Overall SEO readiness</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {CRITERIA.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{c.label}</span>
              <span style={{ color: c.color, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{c.score}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${c.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ background: c.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

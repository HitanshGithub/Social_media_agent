import { useState } from 'react'
import { motion } from 'framer-motion'

const DUMMY_THUMBS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  label: `Frame ${i + 1}`,
  hue: (i * 45) % 360,
}))

export default function ThumbnailPicker() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="card">
      <div className="card-title">🖼️ Thumbnail Picker</div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
        Select a frame for your video thumbnail
      </p>

      <div className="thumb-grid">
        {DUMMY_THUMBS.map((t) => (
          <motion.div
            key={t.id}
            className={`thumb-item ${selected === t.id ? 'selected' : ''}`}
            onClick={() => setSelected(t.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ background: `linear-gradient(135deg, hsl(${t.hue},40%,15%), hsl(${t.hue + 30},30%,10%))` }}
          >
            {t.label}
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="badge badge-done">● Selected</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Frame {selected + 1}</span>
      </div>
    </div>
  )
}

import { useState } from 'react'

export default function ChapterEditor() {
  const [chapters, setChapters] = useState([
    { time: '0:00', title: 'Introduction' },
    { time: '1:30', title: 'Setup & Overview' },
    { time: '5:00', title: 'Demo' },
    { time: '8:45', title: 'Conclusion' },
  ])

  const handleChange = (i, field, val) => {
    setChapters((prev) => prev.map((c, j) => (j === i ? { ...c, [field]: val } : c)))
  }

  const addChapter = () => setChapters((prev) => [...prev, { time: '0:00', title: '' }])
  const removeChapter = (i) => setChapters((prev) => prev.filter((_, j) => j !== i))

  return (
    <div className="card">
      <div className="card-title">📑 Chapters</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chapters.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <input
              className="input"
              style={{ width: '70px', textAlign: 'center', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}
              value={c.time}
              onChange={(e) => handleChange(i, 'time', e.target.value)}
              placeholder="0:00"
            />
            <input
              className="input"
              style={{ flex: 1, fontSize: '0.8rem' }}
              value={c.title}
              onChange={(e) => handleChange(i, 'title', e.target.value)}
              placeholder="Chapter title"
            />
            <button className="btn btn-danger" style={{ padding: '0.35rem 0.5rem', fontSize: '0.7rem' }} onClick={() => removeChapter(i)}>✕</button>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" style={{ marginTop: '0.75rem' }} onClick={addChapter}>+ Add Chapter</button>
    </div>
  )
}

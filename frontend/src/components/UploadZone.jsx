import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { api } from '../api/client'
import { useAgentStore } from '../store/agentStore'

export default function UploadZone({ compact, onNavigate }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const setJobId = useAgentStore((s) => s.setJobId)
  const setUploadProgress = useAgentStore((s) => s.setUploadProgress)
  const setUploadFile = useAgentStore((s) => s.setUploadFile)
  const setCurrentStatus = useAgentStore((s) => s.setCurrentStatus)

  const onDrop = useCallback(async (files) => {
    const file = files[0]
    if (!file) return
    setError(null)
    setSuccess(null)
    setUploading(true)
    setUploadFile(file)

    const form = new FormData()
    form.append('file', file)

    try {
      const { data } = await api.post('/api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / (e.total || 1))
          setUploadProgress(pct)
        },
      })
      setJobId(data.job_id)
      setCurrentStatus('uploaded')
      setSuccess(data.job_id)
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [setJobId, setUploadProgress, setUploadFile, setCurrentStatus])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'] },
    maxFiles: 1,
  })

  if (compact) {
    return (
      <div className="card" {...getRootProps()} style={{ cursor: 'pointer', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          {isDragActive ? '📥 Drop video here...' : '📤 Quick upload — drag & drop or click'}
        </p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <div
        className={`upload-zone ${isDragActive ? 'drag-active' : ''}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="upload-icon">{uploading ? '⏳' : isDragActive ? '📥' : '🎬'}</div>
        <div className="upload-title">
          {uploading ? 'Uploading...' : isDragActive ? 'Drop your video here' : 'Drag & drop your video'}
        </div>
        <div className="upload-subtitle">
          {uploading ? 'Please wait while your file uploads' : 'or click to browse files'}
        </div>
        <div className="upload-formats">MP4 · MOV · AVI · MKV · WEBM — up to 2 GB</div>
      </div>

      {error && (
        <div className="card" style={{ marginTop: '0.75rem', borderColor: 'var(--red)' }}>
          <p style={{ color: 'var(--red)', fontSize: '0.85rem' }}>❌ {error}</p>
        </div>
      )}
      {success && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '0.75rem', borderColor: 'var(--green)' }}
        >
          <p style={{ color: 'var(--green)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            ✅ Video uploaded successfully!
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '0.75rem' }}>
            Job ID: {success}
          </p>
          {onNavigate && (
            <button className="btn btn-primary" onClick={() => onNavigate('agent')}>
              🚀 Go to Agent Status → Run Pipeline
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

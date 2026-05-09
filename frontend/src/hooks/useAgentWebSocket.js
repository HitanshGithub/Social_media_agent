import { useEffect } from 'react'
import { useAgentStore } from '../store/agentStore'

export function useAgentWebSocket(jobId) {
  const addEvent = useAgentStore((s) => s.addEvent)

  useEffect(() => {
    if (!jobId) return
    const ws = new WebSocket(`ws://localhost:8000/ws/${jobId}`)
    ws.onmessage = (evt) => {
      try {
        addEvent(JSON.parse(evt.data))
      } catch {
        addEvent({ event: 'raw', data: evt.data })
      }
    }
    return () => ws.close()
  }, [jobId, addEvent])
}

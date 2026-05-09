import { create } from 'zustand'

export const useAgentStore = create((set) => ({
  jobId: null,
  events: [],
  setJobId: (jobId) => set({ jobId }),
  addEvent: (event) => set((s) => ({ events: [...s.events, event] })),
  clearEvents: () => set({ events: [] }),
}))

import { create } from 'zustand'

export const useAgentStore = create((set, get) => ({
  jobId: null,
  events: [],
  uploadProgress: 0,
  uploadFile: null,
  currentStatus: 'idle',

  setJobId: (jobId) => set({ jobId }),
  setUploadProgress: (p) => set({ uploadProgress: p }),
  setUploadFile: (f) => set({ uploadFile: f }),
  setCurrentStatus: (s) => set({ currentStatus: s }),

  addEvent: (event) =>
    set((s) => ({
      events: [...s.events, { ...event, _ts: Date.now() }],
      currentStatus: event.event || s.currentStatus,
    })),

  clearEvents: () => set({ events: [], currentStatus: 'idle' }),

  reset: () =>
    set({
      jobId: null,
      events: [],
      uploadProgress: 0,
      uploadFile: null,
      currentStatus: 'idle',
    }),
}))

import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'

export function useJobState(jobId) {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => (await api.get(`/api/jobs/${jobId}`)).data,
    enabled: Boolean(jobId),
    refetchInterval: 3000,
  })
}

import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { CiTestResponse } from '../types'

export const ciTestQueries = {
    check: () =>
        queryOptions({
            queryKey: ['ci-test'],
            queryFn: () => apiClient<CiTestResponse>('/api/v1/health/ci-test')
        })
}

import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { PaginatedResponse, PaginationParams } from '@/types/api'
import type { Posts } from '../types'

export const postsQueries = {
    list: (params: PaginationParams) =>
        queryOptions({
            queryKey: ['posts', 'list', params],
            queryFn: () => {
                const searchParams = new URLSearchParams()
                if (params.page) searchParams.set('page', String(params.page))
                if (params.page_size) searchParams.set('page_size', String(params.page_size))
                if (params.sort_by) searchParams.set('sort_by', params.sort_by)
                if (params.sort_order) searchParams.set('sort_order', params.sort_order)
                return apiClient<PaginatedResponse<Posts>>(
                    `/api/v1/posts?${searchParams.toString()}`
                )
            }
        }),

    detail: (id: string) =>
        queryOptions({
            queryKey: ['posts', id],
            queryFn: () => apiClient<Posts>(`/api/v1/posts/${id}`)
        })
}

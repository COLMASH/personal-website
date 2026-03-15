import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Posts, CreatePostsInput, UpdatePostsInput } from '../types'

export function useCreatePosts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreatePostsInput) =>
            apiClient<Posts>('/api/v1/posts', {
                method: 'POST',
                body: JSON.stringify(data)
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export function useUpdatePosts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, ...data }: UpdatePostsInput & { id: string }) =>
            apiClient<Posts>(`/api/v1/posts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export function useDeletePosts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => apiClient<void>(`/api/v1/posts/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

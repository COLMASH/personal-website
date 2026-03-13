import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { ApiError } from '@/lib/api-client'

export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                retry: (failureCount, error) => {
                    if (error instanceof ApiError && error.status < 500) return false
                    return failureCount < 2
                }
            }
        },
        queryCache: new QueryCache({
            onError: (error) => {
                if (error instanceof ApiError && error.status === 401) {
                    signOut({ redirect: true, callbackUrl: '/' })
                }
            }
        }),
        mutationCache: new MutationCache({
            onError: (error) => {
                if (error instanceof ApiError && error.status !== 401) {
                    toast.error(error.detail)
                }
            }
        })
    })
}

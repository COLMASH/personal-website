'use client'

import { useState, Suspense } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { lazy } from 'react'

const ReactQueryDevtools =
    process.env.NODE_ENV === 'development'
        ? lazy(() =>
              import('@tanstack/react-query-devtools').then(mod => ({
                  default: mod.ReactQueryDevtools
              }))
          )
        : () => null
import { createQueryClient } from '@/lib/query-client'

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => createQueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Suspense>
                <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
        </QueryClientProvider>
    )
}

'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        Sentry.captureException(error, {
            tags: { location: 'posts' },
            contexts: { react: { componentStack: error.stack } }
        })
    }, [error])

    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
                <p className="text-muted-foreground">
                    {error.message || 'An error occurred loading this page.'}
                </p>
                <Button onClick={reset}>Try again</Button>
            </div>
        </div>
    )
}

export default ErrorPage

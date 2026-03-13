'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface GlobalErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    return (
        <html>
            <body>
                <div className="flex min-h-screen items-center justify-center bg-background">
                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-foreground">
                            Something went wrong
                        </h2>
                        <p className="text-muted-foreground">An unexpected error occurred.</p>
                        <Button onClick={reset}>Try again</Button>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default GlobalError

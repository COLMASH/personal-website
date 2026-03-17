'use client'

import { useQuery } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ciTestQueries } from '../api/ci-test-queries'

export function CiTestBanner() {
    const { data, isLoading, isError } = useQuery(ciTestQueries.check())

    if (isLoading) {
        return <Skeleton className="mt-4 h-10 w-full max-w-md" />
    }

    return (
        <Alert variant="destructive" className="mt-4 w-full max-w-md">
            <AlertDescription className="text-center font-mono text-xs">
                {isError
                    ? 'CI/CD Test FAILED — API unreachable'
                    : `CI/CD Test OK — API responded at ${data?.timestamp}`}
            </AlertDescription>
        </Alert>
    )
}

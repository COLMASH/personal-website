'use client'

import { useQuery } from '@tanstack/react-query'
import { Package } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EmptyState } from '@/components/common/empty-state'
import { postsQueries } from '../api/posts-queries'

export function PostsList() {
    const { data, isLoading, error } = useQuery(postsQueries.list({ page: 1, page_size: 20 }))

    if (isLoading) {
        return (
            <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>Failed to load posts. Please try again later.</AlertDescription>
            </Alert>
        )
    }

    if (!data?.items.length) {
        return (
            <EmptyState
                icon={Package}
                title="No posts yet"
                description="Get started by creating your first post."
            />
        )
    }

    return (
        <div className="grid gap-4">
            {data.items.map(item => (
                <Card key={item.id}>
                    <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        {item.description && <CardDescription>{item.description}</CardDescription>}
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

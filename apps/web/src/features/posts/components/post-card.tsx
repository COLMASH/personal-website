import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Posts } from '../types'

interface PostCardProps {
    post: Posts
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{post.name}</CardTitle>
                {post.description && <CardDescription>{post.description}</CardDescription>}
            </CardHeader>
        </Card>
    )
}

import { PostsList } from '@/features/posts/components/posts-list'
import { PageHeader } from '@/components/common/page-header'

export default function PostsPage() {
    return (
        <div className="space-y-6">
            <PageHeader title="Posts" description="Manage your posts" />
            <PostsList />
        </div>
    )
}

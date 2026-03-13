import type { ISODateString } from '@/types/api'

export interface Posts {
    id: string
    name: string
    description: string | null
    created_at: ISODateString
    updated_at: ISODateString
}

export interface CreatePostsInput {
    name: string
    description?: string
}

export interface UpdatePostsInput {
    name?: string
    description?: string | null
}

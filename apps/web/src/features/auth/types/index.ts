import { z } from 'zod'
import type { UserRole } from '@/types/api'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})

export type LoginFormData = z.infer<typeof loginSchema>

export interface User {
    id: string
    email: string
    name: string | null
    image: string | null
    role: UserRole
    is_active: boolean
    created_at: string
}

export interface TokenResponse {
    access_token: string
    expires_in: number
    token_type: string
}

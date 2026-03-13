import 'next-auth'
import type { UserRole } from '@/types/api'

declare module 'next-auth' {
    interface User {
        accessToken: string
        role: UserRole
    }

    interface Session {
        accessToken: string
        user: {
            id: string
            email: string
            name: string | null
            image: string | null
            role: UserRole
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string
        role?: UserRole
        userId?: string
    }
}

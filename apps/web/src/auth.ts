import * as Sentry from '@sentry/nextjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { UserRole } from '@/types/api'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                try {
                    const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
                    const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    })

                    if (!res.ok) {
                        Sentry.captureMessage('Auth login failed', {
                            level: 'warning',
                            tags: {
                                'error.type': 'auth',
                                'api.endpoint': '/api/v1/auth/login',
                                'api.status': String(res.status)
                            }
                        })
                        return null
                    }

                    const data = await res.json()
                    const token = data.data?.accessToken ?? data.accessToken ?? data.access_token
                    const userRes = await fetch(`${apiUrl}/api/v1/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })

                    if (!userRes.ok) {
                        Sentry.captureMessage('Auth me fetch failed', {
                            level: 'error',
                            tags: {
                                'error.type': 'auth',
                                'api.endpoint': '/api/v1/auth/me',
                                'api.status': String(userRes.status)
                            }
                        })
                        return null
                    }

                    const userJson = await userRes.json()
                    const user = userJson.data ?? userJson
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        accessToken: token,
                        role: user.role
                    }
                } catch (error) {
                    Sentry.captureException(error, {
                        tags: { 'error.type': 'auth', 'api.category': 'network_error' }
                    })
                    return null
                }
            }
        })
    ],
    session: { strategy: 'jwt', maxAge: 5 * 60 * 60 },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.role = user.role
                token.userId = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = (token.accessToken as string) ?? ''
            session.user.id = (token.userId as string) ?? ''
            session.user.role = (token.role as UserRole) ?? 'user'
            return session
        }
    },
    pages: {
        signIn: '/',
        error: '/'
    }
})

import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const publicPaths = ['/', '/api']

export default auth(req => {
    const isLoggedIn = !!req.auth
    const isPublicPath = publicPaths.some(
        path => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + '/')
    )

    if (!isPublicPath && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}

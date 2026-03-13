import * as Sentry from '@sentry/nextjs'

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    environment: process.env.NEXT_PUBLIC_ENV || 'development',
    initialScope: {
        tags: { component: 'server' }
    },
    beforeSend(event) {
        return filterSensitiveData(event)
    }
})

function filterSensitiveData(event: Sentry.ErrorEvent): Sentry.ErrorEvent | null {
    if (event.request) {
        delete event.request.cookies
        if (event.request.headers) {
            delete event.request.headers['authorization']
            delete event.request.headers['cookie']
        }
    }
    return event
}

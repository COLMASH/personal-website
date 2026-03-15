import * as Sentry from '@sentry/nextjs'

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_ENV || 'development',
    sendDefaultPii: true,
    initialScope: {
        tags: { component: 'client' }
    }
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

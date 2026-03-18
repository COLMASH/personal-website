import * as Sentry from '@sentry/nestjs'

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.SENTRY_ENABLED === 'true',
    environment: process.env.ENVIRONMENT ?? 'development',
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    sendDefaultPii: false,
    beforeSend(event) {
        // Strip sensitive data
        if (event.request?.headers) {
            delete event.request.headers['authorization']
            delete event.request.headers['cookie']
        }
        if (event.request) {
            delete event.request.cookies
        }
        // Drop scanner/bot noise
        const url = event.request?.url ?? ''
        if (
            /\.(php|asp|aspx|jsp|cgi|env)(\?|$)/i.test(url) ||
            /wp-admin|wp-login|phpunit|eval-stdin|thinkphp|actuator|phpmyadmin|xmlrpc|\.git|\.aws|\.docker|containers\/json/i.test(
                url
            )
        ) {
            return null
        }

        return event
    }
})

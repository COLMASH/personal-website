// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    enableLogs: true,
    environment: process.env.NEXT_PUBLIC_ENV || 'development',
    sendDefaultPii: true,
    initialScope: {
        tags: { component: 'server' }
    }
});

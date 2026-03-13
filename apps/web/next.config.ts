import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
    output: 'standalone',
    experimental: {
        instrumentationHook: true
    }
}

export default withSentryConfig(nextConfig, {
    org: 'personal-website-org',
    project: 'personal-website-web',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: { enabled: true },
    hideSourceMaps: true,
    disableLogger: true
})

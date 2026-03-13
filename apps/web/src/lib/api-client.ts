import * as Sentry from '@sentry/nextjs'
import { getSession } from 'next-auth/react'
import { env } from '@/env'

export class ApiError extends Error {
    constructor(
        public status: number,
        public endpoint: string,
        public method: string,
        public data: { detail: string } | null
    ) {
        super(`${status}: ${method} ${endpoint}`)
        this.name = 'ApiError'
    }

    get detail(): string {
        return this.data?.detail ?? 'An unexpected error occurred'
    }
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const method = options.method ?? 'GET'

    const session = await getSession()
    const headers = new Headers(options.headers)
    if (options.body && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
    }
    if (session?.accessToken) {
        headers.set('Authorization', `Bearer ${session.accessToken}`)
    }

    Sentry.addBreadcrumb({
        category: 'api',
        message: `${method} ${endpoint}`,
        level: 'info',
        data: { method, endpoint }
    })

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const error = new ApiError(
            response.status,
            endpoint,
            method,
            isApiErrorData(errorData) ? errorData : null
        )
        classifyAndReportError(error)
        throw error
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined as T
    }

    return response.json()
}

function isApiErrorData(data: unknown): data is { detail: string } {
    return (
        typeof data === 'object' &&
        data !== null &&
        'detail' in data &&
        typeof (data as Record<string, unknown>).detail === 'string'
    )
}

function classifyAndReportError(error: ApiError): void {
    const truncatedDetail =
        error.detail.length > 500 ? error.detail.substring(0, 500) + '...' : error.detail
    const baseTags = {
        'error.type': 'api',
        'api.endpoint': error.endpoint,
        'api.method': error.method,
        'api.status': String(error.status)
    }
    const fingerprint = ['api-error', error.method, error.endpoint, String(error.status)]

    if (error.status >= 500 || error.status === 0) {
        Sentry.captureException(error, {
            tags: { ...baseTags, 'api.category': 'server_error' },
            extra: { errorDetail: truncatedDetail },
            fingerprint
        })
    } else if (error.status === 401) {
        Sentry.addBreadcrumb({
            category: 'auth',
            message: `Unauthorized: ${error.method} ${error.endpoint}`,
            level: 'warning'
        })
    } else if (error.status >= 400) {
        const statusCategories: Record<number, string> = {
            400: 'bad_request',
            403: 'forbidden',
            404: 'not_found',
            429: 'rate_limited'
        }
        const category = statusCategories[error.status] ?? 'client_error'

        Sentry.captureMessage(`${category}: ${error.method} ${error.endpoint}`, {
            level: 'warning',
            tags: { ...baseTags, 'api.category': category },
            extra: { errorDetail: truncatedDetail },
            fingerprint
        })
    }
}

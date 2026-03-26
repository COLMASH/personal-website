import { apiClient } from '@/lib/api-client'

interface ContactPayload {
    name: string
    email: string
    website?: string
    services: string[]
    timeline: string
    budget: string
    description: string
}

interface ContactResponse {
    success: boolean
    message: string
}

export function submitContact(data: ContactPayload): Promise<ContactResponse> {
    return apiClient<ContactResponse>('/api/v1/contact', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

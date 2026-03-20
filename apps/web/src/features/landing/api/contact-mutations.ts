import { apiClient } from '@/lib/api-client'

interface ContactPayload {
    name: string
    email: string
    company?: string
    services: string[]
    budget?: string
    description?: string
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

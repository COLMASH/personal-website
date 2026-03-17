import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, screen, waitFor } from '@/test/utils'
import { CiTestBanner } from '../components/ci-test-banner'

const mockApiClient = vi.fn()

vi.mock('@/lib/api-client', () => ({
    apiClient: (...args: unknown[]) => mockApiClient(...args)
}))

vi.mock('next-auth/react', () => ({
    getSession: vi.fn().mockResolvedValue(null)
}))

describe('CiTestBanner', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('shows a loading skeleton initially', () => {
        mockApiClient.mockReturnValue(new Promise(() => {}))
        renderWithProviders(<CiTestBanner />)
        expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
    })

    it('shows success message when API responds', async () => {
        mockApiClient.mockResolvedValue({
            status: 'ok',
            ciTest: true,
            dbWrite: true,
            timestamp: '2026-03-17T00:00:00.000Z'
        })

        renderWithProviders(<CiTestBanner />)

        await waitFor(() => {
            expect(screen.getByText(/CI\/CD Test OK/)).toBeInTheDocument()
        })
    })

    it('shows error message when API call fails', async () => {
        mockApiClient.mockRejectedValue(new Error('Network error'))

        renderWithProviders(<CiTestBanner />)

        await waitFor(() => {
            expect(screen.getByText(/CI\/CD Test FAILED/)).toBeInTheDocument()
        })
    })
})

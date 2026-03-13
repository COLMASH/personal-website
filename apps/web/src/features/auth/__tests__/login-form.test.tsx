import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '@/test/utils'
import { LoginForm } from '../components/login-form'

vi.mock('next-auth/react', () => ({
    signIn: vi.fn()
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() })
}))

describe('LoginForm', () => {
    it('renders email and password fields', () => {
        renderWithProviders(<LoginForm />)
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it('shows validation errors on empty submit', async () => {
        const user = userEvent.setup()
        renderWithProviders(<LoginForm />)

        await user.click(screen.getByRole('button', { name: /sign in/i }))

        expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
    })

    it('submits with valid credentials', async () => {
        const { signIn } = await import('next-auth/react')
        const user = userEvent.setup()
        renderWithProviders(<LoginForm />)

        await user.type(screen.getByLabelText(/email/i), 'test@example.com')
        await user.type(screen.getByLabelText(/password/i), 'password123')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        expect(signIn).toHaveBeenCalledWith(
            'credentials',
            expect.objectContaining({
                email: 'test@example.com',
                password: 'password123'
            })
        )
    })
})

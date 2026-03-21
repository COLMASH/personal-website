import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('framer-motion', () => ({
    motion: {
        div: (props: Record<string, unknown>) => <div {...props} />,
        section: (props: Record<string, unknown>) => <section {...props} />
    }
}))

vi.mock('sonner', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}))

vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query')
    return {
        ...actual,
        useMutation: () => ({ mutate: vi.fn(), isPending: false })
    }
})

import { ContactSection } from '../components/contact-section'

describe('ContactSection', () => {
    it('renders the heading', () => {
        render(<ContactSection />)

        expect(screen.getByText("Let's Talk About")).toBeInTheDocument()
        expect(screen.getByText('Your Project')).toBeInTheDocument()
    })

    it('renders the Get Started eyebrow', () => {
        render(<ContactSection />)

        expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('renders the contact form', () => {
        render(<ContactSection />)

        expect(screen.getByText('Send Message')).toBeInTheDocument()
    })

    it('renders value props', () => {
        render(<ContactSection />)

        expect(screen.getByText('Free initial consultation')).toBeInTheDocument()
        expect(screen.getByText('Response within 24 hours')).toBeInTheDocument()
        expect(screen.getByText('Flexible engagement models')).toBeInTheDocument()
        expect(screen.getByText('NDA available on request')).toBeInTheDocument()
    })

    it('renders what to expect steps', () => {
        render(<ContactSection />)

        expect(screen.getByText('Tell us about your project')).toBeInTheDocument()
        expect(screen.getByText('We schedule a discovery call')).toBeInTheDocument()
        expect(screen.getByText('Receive your custom proposal')).toBeInTheDocument()
    })

    it('renders email contact', () => {
        render(<ContactSection />)

        expect(screen.getByText('migangsant@gmail.com')).toBeInTheDocument()
    })
})

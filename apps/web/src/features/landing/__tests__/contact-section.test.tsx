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

        expect(screen.getByText(/Let's Talk About/)).toBeInTheDocument()
        expect(screen.getByText('Your Project')).toBeInTheDocument()
    })

    it('renders the Get Started eyebrow', () => {
        render(<ContactSection />)

        expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('renders the contact form', () => {
        render(<ContactSection />)

        expect(screen.getByText('Book Your Free Consultation')).toBeInTheDocument()
    })

    it('renders what to expect items', () => {
        render(<ContactSection />)

        expect(screen.getByText('Free 30-minute consultation')).toBeInTheDocument()
        expect(screen.getByText('Response within 24 hours')).toBeInTheDocument()
        expect(screen.getByText('No-obligation project scoping')).toBeInTheDocument()
        expect(screen.getByText('Transparent pricing upfront')).toBeInTheDocument()
    })

    it('renders email contact card', () => {
        render(<ContactSection />)

        expect(screen.getByText('Prefer to email directly?')).toBeInTheDocument()
        expect(screen.getByText('santanaai.co@gmail.com')).toBeInTheDocument()
    })

    it('renders updated service options', () => {
        render(<ContactSection />)

        expect(screen.getByText('AI Agents')).toBeInTheDocument()
        expect(screen.getByText('AI Workflows')).toBeInTheDocument()
        expect(screen.getByText('AI Strategy')).toBeInTheDocument()
        expect(screen.getByText('Web2/3 Software')).toBeInTheDocument()
        expect(screen.getByText('RAG Systems')).toBeInTheDocument()
        expect(screen.getByText('Claude Code Training')).toBeInTheDocument()
    })

    it('renders required field asterisks', () => {
        render(<ContactSection />)

        const asterisks = screen.getAllByText('*')
        expect(asterisks).toHaveLength(6)
    })
})

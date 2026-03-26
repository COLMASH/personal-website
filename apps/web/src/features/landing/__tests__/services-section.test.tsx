import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('framer-motion', () => ({
    motion: {
        div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
        section: (props: React.HTMLAttributes<HTMLElement>) => <section {...props} />
    },
    useInView: () => true
}))

import { ServicesSection } from '../components/services-section'

describe('ServicesSection', () => {
    it('renders the "What We Build" eyebrow text', () => {
        render(<ServicesSection />)

        expect(screen.getByText('What We Build')).toBeInTheDocument()
    })

    it('renders the section title with "Deliver Results"', () => {
        render(<ServicesSection />)

        expect(screen.getByText('Deliver Results')).toBeInTheDocument()
    })

    it('renders all 7 service titles', () => {
        render(<ServicesSection />)

        expect(screen.getByText('AI Agents')).toBeInTheDocument()
        expect(screen.getByText('AI Workflows')).toBeInTheDocument()
        expect(screen.getByText('RAG Systems')).toBeInTheDocument()
        expect(screen.getByText('AI Strategy')).toBeInTheDocument()
        expect(screen.getByText('Software Development')).toBeInTheDocument()
        expect(screen.getByText('Blockchain & Web3')).toBeInTheDocument()
        expect(screen.getByText('Claude Code Training')).toBeInTheDocument()
    })

    it('renders service descriptions', () => {
        render(<ServicesSection />)

        expect(screen.getByText(/Custom autonomous agents/)).toBeInTheDocument()
        expect(screen.getByText(/Automated workflows connecting/)).toBeInTheDocument()
        expect(screen.getByText(/AI that actually knows your business/)).toBeInTheDocument()
        expect(screen.getByText(/Clear roadmaps for AI adoption/)).toBeInTheDocument()
    })

    it('has the services anchor id', () => {
        const { container } = render(<ServicesSection />)

        const section = container.querySelector('#services')
        expect(section).toBeInTheDocument()
    })

    it('renders the consultation CTA', () => {
        render(<ServicesSection />)

        expect(
            screen.getByText(/Every engagement starts with a free consultation/)
        ).toBeInTheDocument()
    })
})

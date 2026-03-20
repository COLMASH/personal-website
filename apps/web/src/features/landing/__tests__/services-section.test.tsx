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

    it('renders all 4 service titles', () => {
        render(<ServicesSection />)

        expect(screen.getByText('AI & Agentic Solutions')).toBeInTheDocument()
        expect(screen.getByText('Full-Stack Development')).toBeInTheDocument()
        expect(screen.getByText('Blockchain & Web3')).toBeInTheDocument()
        expect(screen.getByText('Engineering Consulting')).toBeInTheDocument()
    })

    it('renders service descriptions', () => {
        render(<ServicesSection />)

        expect(screen.getByText(/Custom AI agents, RAG pipelines/)).toBeInTheDocument()
        expect(screen.getByText(/End-to-end web applications/)).toBeInTheDocument()
    })

    it('renders service tags', () => {
        render(<ServicesSection />)

        expect(screen.getByText('LangChain')).toBeInTheDocument()
        expect(screen.getByText('Next.js')).toBeInTheDocument()
        expect(screen.getByText('Solidity')).toBeInTheDocument()
        expect(screen.getByText('PMP')).toBeInTheDocument()
    })

    it('has the services anchor id', () => {
        const { container } = render(<ServicesSection />)

        const section = container.querySelector('#services')
        expect(section).toBeInTheDocument()
    })

    it('renders the workshops mention', () => {
        render(<ServicesSection />)

        expect(screen.getByText(/AI strategy workshops/)).toBeInTheDocument()
    })
})

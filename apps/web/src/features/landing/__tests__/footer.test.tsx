import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('framer-motion', () => ({
    motion: {
        div: (props: Record<string, unknown>) => <div {...props} />,
        section: (props: Record<string, unknown>) => <section {...props} />
    }
}))

import { Footer } from '../components/footer'

describe('Footer', () => {
    it('renders the Santana AI logo', () => {
        render(<Footer />)

        expect(screen.getByLabelText('SANTANA')).toBeInTheDocument()
        expect(screen.getByLabelText('AI')).toBeInTheDocument()
    })

    it('renders copyright text', () => {
        render(<Footer />)

        expect(screen.getByText(/© 2026 Santana AI\. All rights reserved\./)).toBeInTheDocument()
    })

    it('renders social links', () => {
        render(<Footer />)

        expect(screen.getByText('LinkedIn')).toBeInTheDocument()
        expect(screen.getByText('GitHub')).toBeInTheDocument()
        expect(screen.getByText('YouTube')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders service links', () => {
        render(<Footer />)

        expect(screen.getByText('AI & Agentic Solutions')).toBeInTheDocument()
        expect(screen.getByText('Full-Stack Development')).toBeInTheDocument()
        expect(screen.getByText('Blockchain & Web3')).toBeInTheDocument()
    })

    it('renders 4-column layout with company links', () => {
        render(<Footer />)

        expect(screen.getByText('Company')).toBeInTheDocument()
        expect(screen.getByText('Connect')).toBeInTheDocument()
    })
})

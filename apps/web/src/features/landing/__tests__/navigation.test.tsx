import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navigation } from '../components/navigation'

describe('Navigation', () => {
    it('renders with Santana AI logo text', () => {
        render(<Navigation />)

        expect(screen.getByText('SANTANA')).toBeInTheDocument()
        expect(screen.getByText('AI')).toBeInTheDocument()
    })

    it('renders Book a Call CTA', () => {
        render(<Navigation />)

        const ctaButtons = screen.getAllByText('Book a Call')
        expect(ctaButtons.length).toBeGreaterThanOrEqual(1)
    })

    it('renders navigation links', () => {
        render(<Navigation />)

        expect(screen.getByText('Services')).toBeInTheDocument()
        expect(screen.getByText('Approach')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })
})

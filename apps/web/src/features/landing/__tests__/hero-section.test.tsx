import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HeroSection } from '../components/hero-section'

vi.mock('framer-motion', () => ({
    motion: {
        div: (props: Record<string, unknown>) => <div {...props} />,
        span: (props: Record<string, unknown>) => <span {...props} />,
        h1: (props: Record<string, unknown>) => <h1 {...props} />,
        p: (props: Record<string, unknown>) => <p {...props} />
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

vi.mock('../components/code-editor-mockup', () => ({
    CodeEditorMockup: () => <div data-testid="code-editor-mockup" />
}))

describe('HeroSection', () => {
    it('renders the headline text', () => {
        render(<HeroSection />)
        expect(screen.getByText('Make AI Your')).toBeInTheDocument()
    })

    it('renders the rotating accent word', () => {
        render(<HeroSection />)
        expect(screen.getByText('Unfair Advantage')).toBeInTheDocument()
    })

    it('renders the "Book a Consultation" CTA', () => {
        render(<HeroSection />)
        expect(screen.getByText('Book a Consultation')).toBeInTheDocument()
    })

    it('renders the "See My Work" CTA', () => {
        render(<HeroSection />)
        expect(screen.getByText('See My Work')).toBeInTheDocument()
    })
})

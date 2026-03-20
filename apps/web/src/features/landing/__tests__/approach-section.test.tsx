import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', () => ({
    motion: {
        div: (props: Record<string, unknown>) => <div {...props} />,
        section: (props: Record<string, unknown>) => <section {...props} />,
        p: (props: Record<string, unknown>) => <p {...props} />,
        h2: (props: Record<string, unknown>) => <h2 {...props} />
    },
    useInView: () => true
}))

import { ApproachSection } from '../components/approach-section'

describe('ApproachSection', () => {
    it('renders the section header', () => {
        render(<ApproachSection />)

        expect(screen.getByText('Our Approach')).toBeInTheDocument()
        expect(screen.getByText(/From Idea to Impact in/)).toBeInTheDocument()
    })

    it('renders all 4 step titles', () => {
        render(<ApproachSection />)

        expect(screen.getByText('Discovery')).toBeInTheDocument()
        expect(screen.getByText('Strategy')).toBeInTheDocument()
        expect(screen.getByText('Build')).toBeInTheDocument()
        expect(screen.getByText('Support')).toBeInTheDocument()
    })

    it('renders step deliverables', () => {
        render(<ApproachSection />)

        expect(screen.getByText(/Assessment Report/)).toBeInTheDocument()
        expect(screen.getByText(/Technical Blueprint/)).toBeInTheDocument()
        expect(screen.getByText(/Working Product/)).toBeInTheDocument()
        expect(screen.getByText(/Maintenance Plan/)).toBeInTheDocument()
    })

    it('renders step timelines', () => {
        render(<ApproachSection />)

        expect(screen.getByText('Week 1')).toBeInTheDocument()
        expect(screen.getByText('Week 2')).toBeInTheDocument()
        expect(screen.getByText('Weeks 3-8+')).toBeInTheDocument()
        expect(screen.getByText('Ongoing')).toBeInTheDocument()
    })

    it('renders numbered badges', () => {
        render(<ApproachSection />)

        expect(screen.getByText('01')).toBeInTheDocument()
        expect(screen.getByText('02')).toBeInTheDocument()
        expect(screen.getByText('03')).toBeInTheDocument()
        expect(screen.getByText('04')).toBeInTheDocument()
    })
})

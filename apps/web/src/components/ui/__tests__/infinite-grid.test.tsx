import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { InfiniteGrid } from '../the-infinite-grid'

vi.mock('framer-motion', () => {
    const motionDiv = (props: Record<string, unknown>) => <div {...props} />
    const MotionPattern = (props: Record<string, unknown>) => <pattern {...props} />

    return {
        motion: {
            div: motionDiv,
            pattern: MotionPattern
        },
        useMotionValue: (initial: number) => ({
            get: () => initial,
            set: vi.fn()
        }),
        useMotionTemplate: (strings: TemplateStringsArray, ...values: unknown[]) =>
            strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), ''),
        useAnimationFrame: vi.fn(),
        useReducedMotion: () => false
    }
})

describe('InfiniteGrid', () => {
    it('renders two SVG grid layers with unique pattern IDs', () => {
        const { container } = render(<InfiniteGrid />)
        const patterns = container.querySelectorAll('pattern')
        const ids = Array.from(patterns).map(p => p.getAttribute('id'))

        expect(ids).toContain('grid-pattern-bg')
        expect(ids).toContain('grid-pattern-hover')
        expect(new Set(ids).size).toBe(ids.length)
    })

    it('has fixed positioning and pointer-events-none', () => {
        const { container } = render(<InfiniteGrid />)
        const wrapper = container.firstElementChild as HTMLElement

        expect(wrapper.className).toContain('fixed')
        expect(wrapper.className).toContain('pointer-events-none')
    })

    it('has aria-hidden on the orb container', () => {
        const { container } = render(<InfiniteGrid />)
        const orbContainer = container.querySelector('[aria-hidden="true"]')

        expect(orbContainer).toBeInTheDocument()
    })

    it('renders three gradient orbs', () => {
        const { container } = render(<InfiniteGrid />)
        const orbContainer = container.querySelector('[aria-hidden="true"]')
        const orbs = orbContainer?.querySelectorAll('.rounded-full')

        expect(orbs?.length).toBe(3)
    })

    it('accepts a custom className', () => {
        const { container } = render(<InfiniteGrid className="custom-class" />)
        const wrapper = container.firstElementChild as HTMLElement

        expect(wrapper.className).toContain('custom-class')
    })
})

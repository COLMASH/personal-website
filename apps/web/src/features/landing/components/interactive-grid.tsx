'use client'

import { useEffect, useRef } from 'react'

export function InteractiveGrid() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        let rafId = 0
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                el.style.setProperty('--mouse-x', `${e.clientX}px`)
                el.style.setProperty('--mouse-y', `${e.clientY}px`)
            })
        }

        window.addEventListener('mousemove', onMove)
        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed inset-0 z-0"
            style={
                {
                    '--mouse-x': '-1000px',
                    '--mouse-y': '-1000px',
                    backgroundImage:
                        'linear-gradient(oklch(0.145 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.145 0 0 / 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage:
                        'radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)'
                } as React.CSSProperties
            }
        />
    )
}

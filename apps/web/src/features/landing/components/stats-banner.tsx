'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { stats } from '../data/stats'
import type { Stat } from '../types'

function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t)
}

function AnimatedCounter({ value, suffix, inView }: Stat & { inView: boolean }) {
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!inView) return

        const duration = 1500
        let start: number | null = null
        let rafId: number

        function step(timestamp: number) {
            if (!start) start = timestamp
            const elapsed = timestamp - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutQuad(progress)

            setDisplay(Math.round(eased * value))

            if (progress < 1) {
                rafId = requestAnimationFrame(step)
            }
        }

        rafId = requestAnimationFrame(step)

        return () => cancelAnimationFrame(rafId)
    }, [inView, value])

    return (
        <span>
            {display}
            {suffix}
        </span>
    )
}

export function StatsBanner() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    return (
        <motion.section
            ref={ref}
            className="border-border/50 border-y py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
                {stats.map(stat => (
                    <div key={stat.label} className="text-center">
                        <p className="text-brand-accent font-(family-name:--font-playfair) text-4xl font-bold md:text-5xl">
                            <AnimatedCounter
                                value={stat.value}
                                suffix={stat.suffix}
                                label={stat.label}
                                inView={inView}
                            />
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    )
}

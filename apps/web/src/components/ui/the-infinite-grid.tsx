'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    useAnimationFrame,
    useReducedMotion
} from 'framer-motion'

export function InfiniteGrid({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const mouseX = useMotionValue(-1000)
    const mouseY = useMotionValue(-1000)

    const gridOffsetX = useMotionValue(0)
    const gridOffsetY = useMotionValue(0)

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
    }, [mouseX, mouseY])

    useAnimationFrame(() => {
        if (prefersReducedMotion || document.hidden) return
        gridOffsetX.set((gridOffsetX.get() + 0.5) % 40)
        gridOffsetY.set((gridOffsetY.get() + 0.5) % 40)
    })

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

    return (
        <div
            ref={containerRef}
            className={cn('pointer-events-none fixed inset-0 z-0 overflow-hidden', className)}
        >
            {/* Subtle always-visible grid layer */}
            <div
                className={cn(
                    'absolute inset-0',
                    prefersReducedMotion ? 'opacity-[0.08]' : 'opacity-[0.05]'
                )}
            >
                <GridPattern id="grid-pattern-bg" offsetX={gridOffsetX} offsetY={gridOffsetY} />
            </div>

            {/* Bright mouse-reveal grid layer */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                >
                    <GridPattern
                        id="grid-pattern-hover"
                        offsetX={gridOffsetX}
                        offsetY={gridOffsetY}
                    />
                </motion.div>
            )}

            {/* Gradient orbs */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="blur-5xl absolute top-[-20%] right-[-20%] h-[40%] w-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20" />
                <div className="bg-primary/30 blur-4xl absolute top-[-10%] right-[10%] h-[20%] w-[20%] rounded-full" />
                <div className="blur-5xl absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/40 dark:bg-blue-600/20" />
            </div>
        </div>
    )
}

function GridPattern({
    id,
    offsetX,
    offsetY
}: {
    id: string
    offsetX: ReturnType<typeof useMotionValue<number>>
    offsetY: ReturnType<typeof useMotionValue<number>>
}) {
    return (
        <svg className="h-full w-full">
            <defs>
                <motion.pattern
                    id={id}
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted-foreground"
                    />
                </motion.pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    )
}

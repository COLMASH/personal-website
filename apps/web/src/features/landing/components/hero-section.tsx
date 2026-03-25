'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AmbientOrbs } from './ambient-orbs'
import { CodeEditorMockup } from './code-editor-mockup'

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const accentWords = [
    'AI & Engineering',
    'Agentic Systems',
    'Smart Automation',
    'Digital Innovation'
]

export function HeroSection() {
    const [wordIndex, setWordIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.hidden) return
            setWordIndex(prev => (prev + 1) % accentWords.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
            <AmbientOrbs />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Content — left column */}
                    <div>
                        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0 }}>
                            <span className="bg-brand-accent/10 text-brand-accent inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                                AI Solutions Architect | Full-Stack Developer | Engineer
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-8 text-5xl font-light tracking-tighter md:text-6xl lg:text-7xl"
                        >
                            Build Smarter with
                            <br />
                            <span className="relative inline-flex items-baseline font-bold">
                                <span className="animate-blink bg-brand-accent mr-2 inline-block h-1.5 w-6 translate-y-0.5" />
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={accentWords[wordIndex]}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        className="inline-block"
                                    >
                                        {accentWords[wordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground mt-8 max-w-lg text-lg leading-relaxed"
                        >
                            From autonomous AI agents to industrial-scale engineering — 15+ years of
                            turning complex problems into elegant solutions.
                        </motion.p>

                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-10 flex gap-4"
                        >
                            <a
                                href="#contact"
                                className={cn(
                                    'bg-brand-accent hover:bg-brand-accent-hover',
                                    'inline-flex items-center gap-2 rounded-full px-8 py-3.5',
                                    'font-medium text-white transition-all duration-200',
                                    'hover:shadow-brand-accent/25 hover:shadow-lg'
                                )}
                            >
                                Book a Consultation
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#services"
                                className={cn(
                                    'border-border hover:bg-secondary',
                                    'rounded-full border px-8 py-3.5',
                                    'font-medium transition-colors duration-200'
                                )}
                            >
                                See My Work
                            </a>
                        </motion.div>
                    </div>

                    {/* Code editor — right column */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <CodeEditorMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'
import { CodeEditorMockup } from './code-editor-mockup'

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const accentWords = [
    'Unfair Advantage',
    'Agentic Workforce',
    'Always-On Operator',
    'Second Brain',
    'Innovation Engine'
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
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6">
                {/* Text content — centered */}
                <div className="w-full text-center">
                    <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0 }}>
                        <span className="bg-brand-accent/10 text-brand-accent inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                            AI Engineering | Software Development | Engineering Consulting
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 text-5xl font-light tracking-tighter md:text-6xl lg:text-7xl"
                    >
                        Make AI Your
                        <br />
                        <span className="relative inline-flex items-baseline font-bold">
                            <span className="animate-blink bg-brand-accent mr-2 inline-block h-2 w-8 translate-y-0.5 md:h-2.5 md:w-10" />
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
                        className="text-muted-foreground mx-auto mt-8 max-w-lg text-lg leading-relaxed"
                    >
                        We build custom AI agents, automations, and integrations that give your team
                        back 10+ hours every week — from strategy to deployment, handled end to end.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex justify-center gap-4"
                    >
                        <a
                            href="#contact"
                            onClick={e => {
                                e.preventDefault()
                                smoothScrollTo('#contact')
                            }}
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
                            onClick={e => {
                                e.preventDefault()
                                smoothScrollTo('#services')
                            }}
                            className={cn(
                                'border-border hover:bg-secondary',
                                'rounded-full border px-8 py-3.5',
                                'font-medium transition-colors duration-200'
                            )}
                        >
                            Explore Our Services
                        </a>
                    </motion.div>
                </div>

                {/* Code editor — below, visible on all screens */}
                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 w-full max-w-3xl md:mt-16"
                >
                    <CodeEditorMockup />
                </motion.div>
            </div>
        </section>
    )
}

'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

import { ContactForm } from './contact-form'

const expectations = [
    'Free 30-minute consultation',
    'Response within 24 hours',
    'No-obligation project scoping',
    'Transparent pricing upfront'
]

export function ContactSection() {
    return (
        <section id="contact" className="border-border/50 relative z-[1] border-t py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header — centered, matching other sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <p className="text-brand-accent mb-4 text-sm font-medium tracking-widest uppercase">
                        Get Started
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Let&apos;s Talk About{' '}
                        <span className="text-brand-accent font-bold">Your Project</span>
                    </h2>

                    <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
                        Tell us about your business challenge and we&apos;ll show you how AI can
                        accelerate it.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr]">
                    {/* Left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="lg:sticky lg:top-24 lg:self-start"
                    >
                        {/* What to expect */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                                What to expect
                            </h3>
                            <div className="space-y-4">
                                {expectations.map((item, index) => (
                                    <div key={item} className="flex items-start gap-4">
                                        <span className="bg-brand-accent/10 text-brand-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="text-muted-foreground pt-1 text-sm">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Email card */}
                        <div className="border-border bg-card mt-10 rounded-xl border p-5">
                            <p className="text-muted-foreground mb-2 text-sm">
                                Prefer to email directly?
                            </p>
                            <a
                                href="mailto:santanaai.co@gmail.com"
                                className="text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                santanaai.co@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Right side — form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

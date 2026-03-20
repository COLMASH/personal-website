'use client'

import { motion } from 'framer-motion'
import { Check, Mail } from 'lucide-react'

import { ContactForm } from './contact-form'

const expectations = [
    { step: '1', text: 'Tell us about your project' },
    { step: '2', text: 'We schedule a discovery call' },
    { step: '3', text: 'Receive your custom proposal' }
]

const valueProps = [
    'Free initial consultation',
    'Response within 24 hours',
    'Flexible engagement models',
    'NDA available on request'
]

export function ContactSection() {
    return (
        <section id="contact" className="border-border/50 relative z-[1] border-t py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <p className="text-brand-accent mb-4 text-sm font-medium tracking-widest uppercase">
                            Get Started
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Let&apos;s Talk About
                            <br />
                            <span className="text-brand-accent font-bold">Your Project</span>
                        </h2>

                        <p className="text-muted-foreground mt-4 text-lg">
                            Ready to transform your ideas into reality? Tell us what you need.
                        </p>

                        {/* What to expect — stepper */}
                        <div className="mt-10">
                            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                                What to expect
                            </h3>
                            <div className="space-y-4">
                                {expectations.map(item => (
                                    <div key={item.step} className="flex items-start gap-4">
                                        <span className="bg-brand-accent/10 text-brand-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                                            {item.step}
                                        </span>
                                        <span className="text-muted-foreground pt-1 text-sm">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Value props */}
                        <ul className="mt-10 space-y-3">
                            {valueProps.map(prop => (
                                <li key={prop} className="flex items-center gap-3">
                                    <Check className="text-brand-accent h-4 w-4 shrink-0" />
                                    <span className="text-muted-foreground text-sm">{prop}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Email */}
                        <div className="mt-8">
                            <a
                                href="mailto:mi_santa@hotmail.com"
                                className="text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                mi_santa@hotmail.com
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

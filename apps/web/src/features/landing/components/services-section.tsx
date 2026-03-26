'use client'

import { smoothScrollTo } from '@/lib/utils'

import { services } from '../data/services'
import { ScrollReveal } from './scroll-reveal'
import { ServiceCard } from './service-card'

export function ServicesSection() {
    const featured = services[0]
    const middleRow = services.slice(1, 4)
    const bottomRow = services.slice(4)

    return (
        <section id="services" className="relative py-24">
            <div className="mx-auto max-w-7xl px-6">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <p className="text-brand-accent mb-4 text-sm font-medium tracking-widest uppercase">
                            What We Build
                        </p>
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            AI Solutions That{' '}
                            <span className="text-brand-accent font-bold">Deliver Results</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-5">
                    {/* Row 1: Featured card */}
                    <ScrollReveal>
                        <ServiceCard service={featured} />
                    </ScrollReveal>

                    {/* Row 2: Three equal cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {middleRow.map((service, index) => (
                            <ScrollReveal key={service.id} delay={index * 0.1} className="h-full">
                                <ServiceCard service={service} />
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Row 3: Three equal cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {bottomRow.map((service, index) => (
                            <ScrollReveal key={service.id} delay={index * 0.1} className="h-full">
                                <ServiceCard service={service} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <ScrollReveal delay={0.4}>
                    <p className="text-muted-foreground mt-12 text-center text-sm">
                        Every engagement starts with a free consultation.{' '}
                        <a
                            href="#contact"
                            onClick={e => {
                                e.preventDefault()
                                smoothScrollTo('#contact')
                            }}
                            className="text-brand-accent hover:text-brand-accent-hover underline underline-offset-4 transition-colors"
                        >
                            Book a call to learn more &rarr;
                        </a>
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}

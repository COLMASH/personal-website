'use client'

import { services } from '../data/services'
import { ScrollReveal } from './scroll-reveal'
import { ServiceCard } from './service-card'

export function ServicesSection() {
    return (
        <section id="services" className="relative py-24">
            <div className="mx-auto max-w-7xl px-6">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <p className="text-brand-accent mb-4 text-sm font-medium tracking-widest uppercase">
                            What We Build
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            AI Solutions That{' '}
                            <span className="text-brand-accent font-bold">Deliver Results</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <ServiceCard service={service} index={index} />
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4}>
                    <p className="text-muted-foreground mt-12 text-center text-sm">
                        We also offer{' '}
                        <span className="text-foreground font-medium">
                            AI strategy workshops, team training, and roadmapping
                        </span>{' '}
                        for organizations ready to scale.{' '}
                        <a
                            href="#contact"
                            className="text-brand-accent hover:text-brand-accent-hover underline underline-offset-4 transition-colors"
                        >
                            Get in touch
                        </a>
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}

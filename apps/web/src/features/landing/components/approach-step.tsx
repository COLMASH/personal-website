'use client'

import { motion } from 'framer-motion'
import type { ApproachStep } from '../types'

interface ApproachStepProps {
    step: ApproachStep
    index: number
}

export function ApproachStepCard({ step, index }: ApproachStepProps) {
    const padded = String(step.number).padStart(2, '0')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="border-border bg-card relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
            {/* Accent border-top on left side */}
            <div className="bg-brand-accent absolute top-0 left-6 h-1 w-12 rounded-b-full" />

            <span className="text-brand-accent mb-4 block text-2xl font-bold">{padded}</span>

            <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>

            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{step.description}</p>

            <div className="flex items-center gap-3">
                <span className="bg-brand-accent/10 text-brand-accent rounded-full px-3 py-1 text-xs font-medium">
                    {step.timeline}
                </span>
                <span className="text-muted-foreground text-xs">
                    Deliverable: {step.deliverable}
                </span>
            </div>
        </motion.div>
    )
}

'use client'

import { motion } from 'framer-motion'
import type { ApproachStep } from '../types'

interface ApproachStepProps {
    step: ApproachStep
    index: number
}

const hoverTransition = { type: 'spring' as const, stiffness: 200, damping: 12 }

export function ApproachStepCard({ step, index }: ApproachStepProps) {
    const padded = String(step.number).padStart(2, '0')

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            <motion.div
                whileHover={{ y: -6, transition: hoverTransition }}
                className="group border-border bg-card hover:border-brand-accent/25 relative cursor-default rounded-2xl border p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            >
                {/* Accent border-top on left side */}
                <div className="bg-brand-accent absolute top-0 left-6 h-1 w-12 rounded-b-full" />

                <span className="text-brand-accent mb-4 block text-2xl font-bold">{padded}</span>

                <h3 className="group-hover:text-brand-accent mb-3 text-xl font-semibold transition-colors">
                    {step.title}
                </h3>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {step.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-accent/10 text-brand-accent rounded-full px-3 py-1 text-xs font-medium">
                        {step.timeline}
                    </span>
                    <span className="text-brand-accent/70 text-xs font-medium tracking-wider uppercase">
                        {step.deliverable}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    )
}

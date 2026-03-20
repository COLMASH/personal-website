'use client'

import { motion } from 'framer-motion'
import { approachSteps } from '../data/approach-steps'
import { ApproachStepCard } from './approach-step'

export function ApproachSection() {
    return (
        <section id="approach" className="relative z-[1] py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-brand-accent mb-4 text-sm font-medium tracking-widest uppercase"
                    >
                        Our Approach
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        From Idea to Impact in{' '}
                        <span className="text-brand-accent font-bold">4 Steps</span>
                    </motion.h2>
                </div>

                {/* Vertical zigzag timeline */}
                <div className="relative">
                    {/* Central vertical line (desktop) */}
                    <div
                        className="bg-border absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
                        aria-hidden="true"
                    />

                    {/* Left vertical line (mobile) */}
                    <div
                        className="bg-border absolute top-0 bottom-0 left-6 w-px lg:hidden"
                        aria-hidden="true"
                    />

                    <div className="relative flex flex-col gap-12">
                        {approachSteps.map((step, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <div key={step.number} className="relative">
                                    {/* Checkpoint dot (desktop) */}
                                    <div
                                        className="bg-brand-accent absolute top-8 left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full lg:block"
                                        aria-hidden="true"
                                    />
                                    <div
                                        className="bg-background absolute top-7 left-1/2 z-[9] hidden h-6 w-6 -translate-x-1/2 rounded-full lg:block"
                                        aria-hidden="true"
                                    />

                                    {/* Checkpoint dot (mobile) */}
                                    <div
                                        className="bg-brand-accent absolute top-8 left-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full lg:hidden"
                                        aria-hidden="true"
                                    />

                                    {/* Card container — zigzag positioning */}
                                    <div
                                        className={`flex lg:gap-16 ${
                                            isLeft
                                                ? 'lg:justify-start lg:pr-[calc(50%+2rem)]'
                                                : 'lg:justify-end lg:pl-[calc(50%+2rem)]'
                                        } pl-12 lg:pl-0`}
                                    >
                                        <ApproachStepCard step={step} index={index} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

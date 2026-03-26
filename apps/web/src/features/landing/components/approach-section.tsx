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
                        className="text-4xl font-bold tracking-tight md:text-5xl"
                    >
                        From Idea to Impact in{' '}
                        <span className="text-brand-accent font-bold">4 Steps</span>
                    </motion.h2>
                </div>

                {/* Vertical zigzag timeline */}
                <div className="relative">
                    {/* Central vertical line (desktop) */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="from-brand-accent/40 to-brand-accent/0 absolute top-3.5 bottom-0 left-1/2 hidden w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b lg:block"
                        aria-hidden="true"
                    />

                    {/* Left vertical line (mobile) */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="from-brand-accent/40 to-brand-accent/0 absolute top-3 bottom-0 left-6 w-0.5 origin-top bg-gradient-to-b lg:hidden"
                        aria-hidden="true"
                    />

                    <div className="relative flex flex-col gap-6">
                        {approachSteps.map((step, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <div key={step.number} className="relative">
                                    {/* Checkpoint dot (desktop) — bullseye: outer bordered circle + inner filled dot */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.4, delay: index * 0.15 }}
                                        className="border-brand-accent/50 bg-background absolute top-1 left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border lg:block"
                                        aria-hidden="true"
                                    >
                                        <div className="bg-brand-accent/80 absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                                    </motion.div>

                                    {/* Checkpoint dot (mobile) — bullseye */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.4, delay: index * 0.15 }}
                                        className="border-brand-accent/50 bg-background absolute top-1 left-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border lg:hidden"
                                        aria-hidden="true"
                                    >
                                        <div className="bg-brand-accent/80 absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                                    </motion.div>

                                    {/* Card container — zigzag positioning */}
                                    <div
                                        className={`flex lg:gap-16 ${
                                            isLeft
                                                ? 'lg:justify-start lg:pr-[calc(50%+2rem)]'
                                                : 'lg:justify-end lg:pl-[calc(50%+2rem)]'
                                        } w-full pl-12 lg:pl-0`}
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

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

import type { Service } from '../types'

/* ------------------------------------------------------------------ */
/*  Shared arrow SVG                                                   */
/* ------------------------------------------------------------------ */

function Arrow({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <svg
            className={cn('text-border h-3 w-4', className)}
            viewBox="0 0 16 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            style={{
                animation: 'line-draw 0.3s ease-out both',
                animationDelay: `${delay}ms`
            }}
        >
            <path d="M0 6h12M10 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

/* ------------------------------------------------------------------ */
/*  Mini-UI Demos                                                      */
/* ------------------------------------------------------------------ */

function AgentDemo() {
    return (
        <div className="flex w-full flex-col gap-2.5 px-4">
            <div
                className="border-brand-accent/20 bg-brand-accent/5 inline-flex items-center gap-2 self-start rounded-lg border px-3 py-1.5"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '0ms' }}
            >
                <span className="bg-brand-accent h-2 w-2 rounded-full opacity-40" />
                <span className="text-foreground/50 text-xs">
                    Scanned 340 transactions for anomalies
                </span>
            </div>

            <div
                className="bg-brand-accent/80 self-end rounded-lg px-3.5 py-1.5 text-xs font-medium text-white"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '400ms' }}
            >
                Flag and generate compliance report
            </div>

            <div
                className="border-brand-accent/20 bg-brand-accent/5 inline-flex items-center gap-2 self-start rounded-lg border px-3 py-1.5"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '800ms' }}
            >
                <span className="bg-brand-accent h-2 w-2 rounded-full opacity-40" />
                <span className="text-foreground/50 text-xs">
                    Done. 3 flagged, report sent to finance team.
                </span>
            </div>

            <div
                className="bg-muted inline-flex items-center gap-1 self-start rounded-lg px-3 py-2"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '1200ms' }}
            >
                <span
                    className="bg-muted-foreground/40 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '0ms' }}
                />
                <span
                    className="bg-muted-foreground/40 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '150ms' }}
                />
                <span
                    className="bg-muted-foreground/40 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '300ms' }}
                />
            </div>
        </div>
    )
}

function WorkflowDemo() {
    return (
        <div className="flex items-center justify-center px-3">
            {/* Webhook node */}
            <div
                className="bg-card border-border flex flex-col items-center gap-1 rounded-lg border px-2.5 py-1.5 shadow-sm"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '0ms' }}
            >
                <span className="bg-dot-green h-3 w-3 rounded-full" />
                <span className="text-muted-foreground/70 text-2xs">Webhook</span>
            </div>

            <Arrow delay={150} />

            {/* Transform node */}
            <div
                className="bg-card border-border flex flex-col items-center gap-1 rounded-lg border px-2.5 py-1.5 shadow-sm"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '200ms' }}
            >
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-muted-foreground/70 text-2xs">Transform</span>
            </div>

            {/* Branch */}
            <div className="flex flex-col items-start gap-3">
                {/* Top branch → Slack */}
                <div className="flex items-center">
                    <Arrow delay={400} />
                    <div
                        className="bg-card border-border flex flex-col items-center gap-1 rounded-lg border px-2.5 py-1.5 shadow-sm"
                        style={{
                            animation: 'fade-in-up 0.4s ease-out both',
                            animationDelay: '500ms'
                        }}
                    >
                        <span className="h-3 w-3 rounded-full bg-violet-500" />
                        <span className="text-muted-foreground/70 text-2xs">Slack</span>
                    </div>
                </div>

                {/* Bottom branch → Sheets */}
                <div className="flex items-center">
                    <Arrow delay={600} />
                    <div
                        className="bg-card border-border flex flex-col items-center gap-1 rounded-lg border px-2.5 py-1.5 shadow-sm"
                        style={{
                            animation: 'fade-in-up 0.4s ease-out both',
                            animationDelay: '700ms'
                        }}
                    >
                        <span className="bg-dot-yellow h-3 w-3 rounded-full" />
                        <span className="text-muted-foreground/70 text-2xs">Sheets</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RagDemo() {
    return (
        <div className="flex w-full flex-col gap-2.5 px-4">
            <div
                className="border-border bg-card flex items-center gap-2 rounded-lg border px-3 py-1.5"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '0ms' }}
            >
                <svg
                    className="text-muted-foreground/50 h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <span className="text-muted-foreground/60 text-xs">
                    What&apos;s the refund policy for enterprise?
                </span>
            </div>

            <div
                className="flex gap-2"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '400ms' }}
            >
                {['terms.pdf', 'faq.md', 'policy.pdf'].map((doc, i) => (
                    <div
                        key={doc}
                        className={cn(
                            'border-border bg-card flex items-center gap-1.5 rounded-md border px-2 py-1',
                            i === 2 && 'border-brand-accent/30 bg-brand-accent/5'
                        )}
                    >
                        <div
                            className={cn(
                                'bg-muted h-5 w-4 rounded-sm',
                                i === 2 && 'bg-brand-accent/20'
                            )}
                        />
                        <span
                            className={cn(
                                'text-muted-foreground/60 text-2xs',
                                i === 2 && 'text-brand-accent/70'
                            )}
                        >
                            {doc}
                        </span>
                    </div>
                ))}
            </div>

            <div
                className="bg-muted/50 rounded-lg px-3 py-2"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '800ms' }}
            >
                <p className="text-foreground/50 text-xs leading-relaxed">
                    Enterprise refunds are processed within 30 days. Full details in{' '}
                    <span className="text-brand-accent/60 underline">policy.pdf</span> section
                    4.2...
                </p>
            </div>
        </div>
    )
}

function StrategyDemo() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    const phases = [
        { name: 'Audit', weeks: 'Wk 1-2', progress: 100 },
        { name: 'Quick Wins', weeks: 'Wk 3-4', progress: 75 },
        { name: 'Core Build', weeks: 'Wk 5-10', progress: 40 },
        { name: 'Scale', weeks: 'Wk 11-12', progress: 15 }
    ]

    return (
        <div ref={ref} className="flex w-full flex-col gap-0 px-4">
            <div
                className="text-brand-accent/70 text-2xs mb-2 font-semibold tracking-wider uppercase"
                style={{ animation: 'fade-in-up 0.3s ease-out both' }}
            >
                Implementation Roadmap
            </div>
            {phases.map((phase, i) => (
                <div
                    key={phase.name}
                    className="border-border flex items-center justify-between border-b py-2 last:border-b-0"
                    style={{
                        animation: 'fade-in-up 0.4s ease-out both',
                        animationDelay: `${(i + 1) * 200}ms`
                    }}
                >
                    <span className="text-foreground/50 text-xs">{phase.name}</span>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted h-1.5 w-20 overflow-hidden rounded-full">
                            <div
                                className="bg-brand-accent h-full rounded-full"
                                style={{
                                    width: inView ? `${phase.progress}%` : '0%',
                                    opacity: 0.8 - i * 0.15,
                                    transition: 'width 0.8s ease-out',
                                    transitionDelay: `${(i + 1) * 200 + 300}ms`
                                }}
                            />
                        </div>
                        <span className="text-muted-foreground/60 text-2xs w-16 text-right">
                            {phase.weeks}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function BrowserDemo() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <div ref={ref} className="flex w-full flex-col px-4">
            <div className="border-border bg-muted/50 flex items-center gap-1.5 rounded-t-lg border px-3 py-1.5">
                <span className="bg-dot-red/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-yellow/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-green/60 h-2 w-2 rounded-full" />
                <div className="bg-background/60 text-muted-foreground/50 text-2xs ml-2 flex-1 rounded-sm px-2 py-0.5">
                    santanaai.com
                </div>
            </div>
            <div className="border-border flex flex-1 flex-col gap-2 rounded-b-lg border border-t-0 p-3">
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                        className="bg-brand-accent/50 h-full rounded-full"
                        style={{
                            animation: 'browser-load 2s ease-out forwards',
                            animationPlayState: inView ? 'running' : 'paused'
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="bg-muted/60 h-8 flex-1 rounded" />
                    <div className="bg-muted/40 h-8 flex-1 rounded" />
                </div>
                <div className="flex gap-2">
                    <div className="bg-muted/30 h-4 flex-2 rounded" />
                    <div className="bg-muted/20 h-4 flex-1 rounded" />
                </div>
            </div>
        </div>
    )
}

function BlockchainDemo() {
    const steps = [
        { label: 'Compiled', delay: 200 },
        { label: 'Verified', delay: 600 },
        { label: 'Deployed', delay: 1000 }
    ]

    return (
        <div className="flex w-full flex-col gap-2 px-4">
            <div
                className="text-foreground/40 text-2xs mb-1 font-semibold tracking-wider uppercase"
                style={{ animation: 'fade-in-up 0.3s ease-out both' }}
            >
                Deploy Contract
            </div>

            <div
                className="border-border bg-card flex items-center justify-between rounded-lg border px-3 py-1.5"
                style={{ animation: 'fade-in-up 0.4s ease-out both', animationDelay: '100ms' }}
            >
                <span className="text-foreground/50 font-mono text-xs">TokenVault.sol</span>
                <span className="text-2xs rounded-full bg-violet-100 px-2 py-0.5 text-violet-600/70 dark:bg-violet-950/30 dark:text-violet-400/70">
                    Ethereum
                </span>
            </div>

            <div className="flex flex-col gap-1.5">
                {steps.map(step => (
                    <div
                        key={step.label}
                        className="flex items-center gap-2"
                        style={{
                            animation: 'fade-in-up 0.4s ease-out both',
                            animationDelay: `${step.delay}ms`
                        }}
                    >
                        <span className="text-brand-accent/60 text-xs">✓</span>
                        <span className="text-foreground/50 text-xs">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TerminalDemo() {
    return (
        <div className="flex w-full flex-col px-4">
            <div className="border-border bg-foreground/90 flex items-center gap-1.5 rounded-t-lg border px-3 py-1.5">
                <span className="bg-dot-red/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-yellow/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-green/60 h-2 w-2 rounded-full" />
                <span className="text-background/40 text-2xs ml-2">Terminal</span>
            </div>
            <div className="border-border bg-foreground/90 flex flex-col gap-1 rounded-b-lg border border-t-0 px-3 py-2.5 font-mono">
                <div style={{ animation: 'fade-in-up 0.3s ease-out both', animationDelay: '0ms' }}>
                    <span className="text-dot-green/80 text-2xs">$</span>
                    <span className="text-background/60 text-2xs">
                        {' '}
                        claude &quot;scaffold a RAG pipeline&quot;
                    </span>
                </div>
                <div
                    className="text-background/40 text-2xs"
                    style={{ animation: 'fade-in-up 0.3s ease-out both', animationDelay: '300ms' }}
                >
                    Creating files...
                </div>
                <div
                    className="text-dot-green/70 text-2xs"
                    style={{ animation: 'fade-in-up 0.3s ease-out both', animationDelay: '600ms' }}
                >
                    ✓ src/pipeline/ingest.ts
                </div>
                <div
                    className="text-dot-green/70 text-2xs"
                    style={{ animation: 'fade-in-up 0.3s ease-out both', animationDelay: '800ms' }}
                >
                    ✓ src/pipeline/retrieve.ts
                </div>
                <div
                    className="text-background/40 text-2xs flex items-center gap-1"
                    style={{
                        animation: 'fade-in-up 0.3s ease-out both',
                        animationDelay: '1000ms'
                    }}
                >
                    <span className="bg-brand-accent/70 inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
                    Generating tests...
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Maps                                                               */
/* ------------------------------------------------------------------ */

const demoMap: Record<Service['demo'], () => React.JSX.Element> = {
    agent: AgentDemo,
    workflow: WorkflowDemo,
    rag: RagDemo,
    strategy: StrategyDemo,
    browser: BrowserDemo,
    blockchain: BlockchainDemo,
    terminal: TerminalDemo
}

const demoBgMap: Record<Service['demo'], string> = {
    agent: 'bg-gradient-to-br from-brand-accent/[0.04] to-brand-accent/[0.08]',
    workflow:
        'bg-gradient-to-br from-violet-50/80 to-purple-50/60 dark:from-violet-950/20 dark:to-purple-950/10',
    rag: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-blue-950/20 dark:to-indigo-950/10',
    strategy:
        'bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:from-emerald-950/20 dark:to-teal-950/10',
    browser:
        'bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-amber-950/20 dark:to-orange-950/10',
    blockchain:
        'bg-gradient-to-br from-violet-50/60 to-indigo-50/40 dark:from-violet-950/20 dark:to-indigo-950/10',
    terminal:
        'bg-gradient-to-br from-slate-50/80 to-gray-50/60 dark:from-slate-950/20 dark:to-gray-950/10'
}

/* ------------------------------------------------------------------ */
/*  Service Card                                                       */
/* ------------------------------------------------------------------ */

const springConfig = { type: 'spring' as const, stiffness: 200, damping: 12 }

interface ServiceCardProps {
    service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
    const Demo = demoMap[service.demo]
    const demoBg = demoBgMap[service.demo]

    if (service.featured) {
        return (
            <motion.div
                whileHover={{ y: -6, transition: springConfig }}
                className={cn(
                    'group cursor-default rounded-2xl border p-6 md:p-8',
                    'border-brand-accent/15 bg-brand-accent/[0.04]',
                    'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
                    'transition-[border-color,box-shadow] duration-300',
                    'hover:border-brand-accent/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
                )}
            >
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-foreground group-hover:text-brand-accent mb-3 text-2xl font-semibold transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                    <div className={cn('relative h-44 overflow-hidden rounded-xl', demoBg)}>
                        <div className="flex h-full items-center justify-center">
                            <Demo />
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent dark:from-black/30" />
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            whileHover={{ y: -6, transition: springConfig }}
            className={cn(
                'group flex h-full cursor-default flex-col rounded-2xl border p-6',
                'border-border bg-card',
                'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
                'transition-[border-color,box-shadow] duration-300',
                'hover:border-brand-accent/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
            )}
        >
            <div className={cn('relative mb-5 h-44 overflow-hidden rounded-xl', demoBg)}>
                <div className="flex h-full items-center justify-center">
                    <Demo />
                </div>
                <div className="from-card/80 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
            </div>
            <h3 className="text-foreground group-hover:text-brand-accent mb-2 text-lg font-semibold transition-colors">
                {service.title}
            </h3>
            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                {service.description}
            </p>
        </motion.div>
    )
}

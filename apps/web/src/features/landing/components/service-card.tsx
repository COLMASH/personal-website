'use client'

import { Bot, Blocks, Code2, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'

import type { Service } from '../types'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    Bot,
    Code2,
    Blocks,
    Wrench
}

function ChatDemo() {
    return (
        <div className="flex w-full flex-col gap-2 px-4">
            <div
                className="bg-brand-accent/20 text-brand-accent max-w-3/5 self-end rounded-xl rounded-br-sm px-3 py-1.5 text-xs"
                style={{
                    animation: 'fade-in-up 0.4s ease-out both',
                    animationDelay: '0ms'
                }}
            >
                How can AI help my business?
            </div>
            <div
                className="bg-muted text-muted-foreground max-w-3/5 self-start rounded-xl rounded-bl-sm px-3 py-1.5 text-xs"
                style={{
                    animation: 'fade-in-up 0.4s ease-out both',
                    animationDelay: '400ms'
                }}
            >
                I can automate workflows and boost efficiency.
            </div>
            <div
                className="bg-muted flex max-w-2/5 items-center gap-1 self-start rounded-xl rounded-bl-sm px-3 py-2"
                style={{
                    animation: 'fade-in-up 0.4s ease-out both',
                    animationDelay: '800ms'
                }}
            >
                <span
                    className="bg-muted-foreground/60 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '0ms' }}
                />
                <span
                    className="bg-muted-foreground/60 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '150ms' }}
                />
                <span
                    className="bg-muted-foreground/60 inline-block h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: '300ms' }}
                />
            </div>
        </div>
    )
}

function BrowserDemo() {
    return (
        <div className="flex w-full flex-col px-4">
            <div className="border-border bg-muted/50 flex items-center gap-1.5 rounded-t-lg border px-3 py-1.5">
                <span className="bg-dot-red/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-yellow/60 h-2 w-2 rounded-full" />
                <span className="bg-dot-green/60 h-2 w-2 rounded-full" />
                <div className="bg-background/60 text-muted-foreground text-2xs ml-2 flex-1 rounded-sm px-2 py-0.5">
                    santanaai.com
                </div>
            </div>
            <div className="border-border flex flex-1 flex-col gap-2 rounded-b-lg border border-t-0 p-3">
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                        className="bg-brand-accent/60 h-full rounded-full"
                        style={{
                            animation: 'browser-load 2s ease-out forwards'
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="bg-muted/60 h-8 flex-1 rounded" />
                    <div className="bg-muted/40 h-8 flex-1 rounded" />
                </div>
            </div>
        </div>
    )
}

function BlockchainDemo() {
    return (
        <div className="flex items-center justify-center gap-0 px-4">
            {[0, 1, 2].map(i => (
                <div key={i} className="flex items-center">
                    <div
                        className="border-brand-accent/30 bg-brand-accent/10 flex h-10 w-10 items-center justify-center rounded-lg border"
                        style={{
                            animation: 'block-pop 0.4s ease-out both',
                            animationDelay: `${i * 400}ms`
                        }}
                    >
                        <div className="bg-brand-accent/40 h-3 w-3 rounded-sm" />
                    </div>
                    {i < 2 && (
                        <div
                            className="bg-brand-accent/30 h-0.5 w-6"
                            style={{
                                animation: 'line-draw 0.3s ease-out both',
                                animationDelay: `${i * 400 + 300}ms`
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

function GaugeDemo() {
    return (
        <div className="flex items-end justify-center px-4 pb-2">
            <div className="relative h-14 w-28">
                <div className="absolute inset-x-0 bottom-0 h-14 w-28 overflow-hidden">
                    <div className="border-muted h-28 w-28 rounded-full border-6" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-14 w-28 overflow-hidden">
                    <div
                        className="border-t-brand-accent border-l-brand-accent h-28 w-28 rounded-full border-6 border-transparent"
                        style={{
                            animation: 'gauge-fill 1.5s ease-out both',
                            transformOrigin: 'center'
                        }}
                    />
                </div>
                <div
                    className="bg-brand-accent/80 absolute bottom-0 left-1/2 h-12 w-0.5 origin-bottom"
                    style={{
                        animation: 'needle-sweep 1.5s ease-out both',
                        transform: 'rotate(-90deg)'
                    }}
                />
                <div className="bg-brand-accent absolute -bottom-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" />
            </div>
        </div>
    )
}

const demoMap: Record<Service['demo'], () => React.JSX.Element> = {
    chat: ChatDemo,
    browser: BrowserDemo,
    blockchain: BlockchainDemo,
    gauge: GaugeDemo
}

interface ServiceCardProps {
    service: Service
    index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    const Icon = iconMap[service.icon] ?? Bot
    const Demo = demoMap[service.demo]

    return (
        <div
            className="border-border bg-card hover:border-brand-accent/30 rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
                animationDelay: `${index * 100}ms`
            }}
        >
            <div className="bg-brand-accent/10 text-brand-accent mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>

            <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                {service.description}
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
                {service.tags.map(tag => (
                    <span
                        key={tag}
                        className="border-brand-accent/10 bg-brand-accent/5 text-brand-accent/80 rounded-full border px-2.5 py-1 text-xs"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="bg-muted/30 mt-auto flex h-44 items-center justify-center overflow-hidden rounded-xl">
                {Demo && <Demo />}
            </div>
        </div>
    )
}

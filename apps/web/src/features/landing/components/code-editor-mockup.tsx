'use client'

import { cn } from '@/lib/utils'

function FileExplorerPanel() {
    const items = [
        { name: 'client-project', indent: 0, isFolder: true },
        { name: 'agents', indent: 1, isFolder: true },
        { name: 'agent-config.ts', indent: 2, isFolder: false },
        { name: 'rag-pipeline.ts', indent: 2, isFolder: false },
        { name: 'workflows', indent: 1, isFolder: true },
        { name: 'automation.ts', indent: 2, isFolder: false },
        { name: 'package.json', indent: 1, isFolder: false }
    ]

    return (
        <div
            className={cn(
                'border-border/60 bg-card absolute top-8 left-0 w-52 rounded-2xl border shadow-lg'
            )}
        >
            {/* Title bar */}
            <div className="flex h-10 items-center gap-2 px-4">
                <span className="bg-dot-red h-3 w-3 rounded-full" />
                <span className="bg-dot-yellow h-3 w-3 rounded-full" />
                <span className="bg-dot-green h-3 w-3 rounded-full" />
                <span className="text-muted-foreground ml-2 text-xs font-semibold tracking-wide">
                    MASH AI
                </span>
            </div>

            {/* File tree */}
            <div className="px-4 pt-1 pb-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2.5 py-1"
                        style={{ paddingLeft: `${item.indent * 14}px` }}
                    >
                        {/* Circle indicator */}
                        <span
                            className={cn(
                                'h-2.5 w-2.5 shrink-0 rounded-full',
                                item.isFolder ? 'bg-foreground/20' : 'bg-foreground/10'
                            )}
                        />
                        <span
                            className={cn(
                                'text-xs',
                                item.isFolder
                                    ? 'text-foreground font-medium'
                                    : 'text-muted-foreground'
                            )}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CodePanel() {
    const tabs = [
        { name: 'agent-config.ts', active: true },
        { name: 'rag-pipeline.ts', active: false },
        { name: 'automation.ts', active: false }
    ]

    const lines: { num: number; content: React.ReactNode }[] = [
        {
            num: 1,
            content: (
                <>
                    <span className="text-muted-foreground/60">{'// Configure your AI agent'}</span>
                </>
            )
        },
        {
            num: 2,
            content: (
                <>
                    <span className="text-brand-teal">import</span>{' '}
                    <span className="text-muted-foreground">{'{'}</span>{' '}
                    <span className="text-foreground">Agent</span>
                    <span className="text-muted-foreground">,</span>{' '}
                    <span className="text-foreground">tools</span>{' '}
                    <span className="text-muted-foreground">{'}'}</span>{' '}
                    <span className="text-brand-teal">from</span>{' '}
                    <span className="text-brand-accent">&apos;@mash-ai/sdk&apos;</span>
                </>
            )
        },
        { num: 3, content: null },
        {
            num: 4,
            content: (
                <>
                    <span className="text-brand-teal">export const</span>{' '}
                    <span className="text-foreground font-semibold">agent</span>{' '}
                    <span className="text-muted-foreground">=</span>{' '}
                    <span className="text-brand-teal">new</span>{' '}
                    <span className="text-foreground font-semibold">Agent</span>
                    <span className="text-muted-foreground">({'{'}</span>
                </>
            )
        },
        {
            num: 5,
            content: (
                <span className="pl-4">
                    <span className="text-brand-teal">name</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-accent">&apos;MASH AI Assistant&apos;</span>
                    <span className="text-muted-foreground">,</span>
                </span>
            )
        },
        {
            num: 6,
            content: (
                <span className="pl-4">
                    <span className="text-brand-teal">model</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-accent">&apos;claude-opus-4-6&apos;</span>
                    <span className="text-muted-foreground">,</span>
                </span>
            )
        },
        {
            num: 7,
            content: (
                <span className="pl-4">
                    <span className="text-brand-teal">tools</span>
                    <span className="text-muted-foreground">: [crm, enrichment, slack],</span>
                </span>
            )
        },
        {
            num: 8,
            content: (
                <span className="pl-4">
                    <span className="text-brand-teal">trigger</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-accent">&apos;new_lead&apos;</span>
                    <span className="text-muted-foreground">,</span>
                </span>
            )
        },
        {
            num: 9,
            content: (
                <span className="pl-4">
                    <span className="text-brand-teal">actions</span>
                    <span className="text-muted-foreground">: {'{'}</span>
                </span>
            )
        },
        {
            num: 10,
            content: (
                <span className="pl-8">
                    <span className="text-brand-teal">enrich</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-warm">true</span>
                    <span className="text-muted-foreground">,</span>
                </span>
            )
        },
        {
            num: 11,
            content: (
                <span className="pl-8">
                    <span className="text-brand-teal">scoreLeads</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-warm">true</span>
                    <span className="text-muted-foreground">,</span>
                </span>
            )
        },
        {
            num: 12,
            content: (
                <span className="pl-8">
                    <span className="text-brand-teal">notifyTeam</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-brand-accent">&apos;#sales&apos;</span>
                </span>
            )
        },
        {
            num: 13,
            content: (
                <span className="pl-4">
                    <span className="text-muted-foreground">{'}'}</span>
                </span>
            )
        },
        {
            num: 14,
            content: (
                <>
                    <span className="text-muted-foreground">{'})'}</span>
                    <span className="animate-blink bg-brand-accent ml-0.5 inline-block h-5 w-0.5" />
                </>
            )
        }
    ]

    return (
        <div
            className={cn(
                'border-border/60 bg-card relative z-10 ml-24 rounded-2xl border shadow-2xl'
            )}
        >
            {/* Tab bar */}
            <div className="flex h-10 items-center gap-4 px-5">
                {tabs.map(tab => (
                    <span
                        key={tab.name}
                        className={cn(
                            'text-xs',
                            tab.active
                                ? 'text-foreground font-semibold'
                                : 'text-muted-foreground/60'
                        )}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>

            {/* Separator */}
            <div className="bg-border/50 mx-4 h-px" />

            {/* Code area with line numbers */}
            <div className="flex font-mono text-sm leading-7">
                {/* Line numbers */}
                <div className="text-muted-foreground/30 py-5 pr-4 pl-5 text-right text-xs leading-7 select-none">
                    {lines.map(line => (
                        <div key={line.num}>{line.num}</div>
                    ))}
                </div>

                {/* Code */}
                <div className="py-5 pr-6">
                    {lines.map(line => (
                        <div key={line.num} className="min-h-7">
                            {line.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function CodeEditorMockup() {
    return (
        <div
            className="relative py-6 pl-4"
            style={{
                perspective: '1200px'
            }}
        >
            <div
                style={{
                    transform: 'rotateY(4deg) rotateX(2deg)',
                    transformStyle: 'preserve-3d'
                }}
            >
                <FileExplorerPanel />
                <CodePanel />
            </div>
        </div>
    )
}

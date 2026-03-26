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
                'absolute top-8 left-2 w-2/5 overflow-hidden rounded-xl',
                'border-border/60 bg-card shadow-panel-back border',
                'sm:left-4 md:left-8'
            )}
            style={{
                transform: 'rotateX(6deg) rotateY(3deg)',
                transformOrigin: 'center center'
            }}
        >
            {/* Title bar */}
            <div className="border-border/60 bg-secondary/50 flex h-10 items-center gap-3 border-b px-4">
                <div className="flex items-center gap-1.5">
                    <span className="bg-dot-red h-3 w-3 rounded-full" />
                    <span className="bg-dot-yellow h-3 w-3 rounded-full" />
                    <span className="bg-dot-green h-3 w-3 rounded-full" />
                </div>
                <span className="text-muted-foreground ml-2 text-xs font-medium">Santana AI</span>
            </div>

            {/* Content: activity bar + file tree */}
            <div className="bg-card flex">
                {/* Activity bar (icon sidebar) */}
                <div className="border-border/60 bg-secondary/50 hidden flex-col items-center gap-3 border-r px-2 py-4 sm:flex">
                    <div className="bg-foreground/10 flex h-7 w-7 items-center justify-center rounded">
                        <div className="bg-foreground/60 h-3.5 w-3.5 rounded-sm" />
                    </div>
                    <div className="bg-foreground/10 h-4 w-4 rounded-full" />
                    <div className="bg-foreground/10 h-4 w-4 rounded-full" />
                    <div className="bg-foreground/10 h-4 w-4 rounded-full" />
                    <div className="bg-foreground/10 h-4 w-4 rounded-full" />
                </div>

                {/* File tree */}
                <div className="space-y-1.5 px-3 py-3 text-xs">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                'truncate',
                                item.isFolder
                                    ? 'text-foreground/60 font-medium'
                                    : 'text-muted-foreground'
                            )}
                            style={{ paddingLeft: `${item.indent * 12}px` }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
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
                <span className="text-muted-foreground/60">{'// Configure your AI agent'}</span>
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
                    <span className="text-brand-accent">&apos;@santana-ai/sdk&apos;</span>
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
                    <span className="text-brand-accent">&apos;Santana AI Assistant&apos;</span>
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
                </>
            )
        },
        { num: 15, content: null },
        {
            num: 16,
            content: (
                <span className="text-muted-foreground/60">
                    {'// \u{1F680} 12 leads enriched, 3 meetings booked today'}
                </span>
            )
        }
    ]

    return (
        <div
            className={cn(
                'relative z-10 ml-auto w-3/4 overflow-hidden rounded-xl',
                'border-border/60 bg-card shadow-panel-front border'
            )}
            style={{
                transform: 'rotateX(6deg) rotateY(-3deg)',
                transformOrigin: 'center center'
            }}
        >
            {/* Tab bar */}
            <div className="border-border/60 bg-secondary/50 flex h-10 items-center gap-1 border-b px-4">
                {tabs.map(tab => (
                    <span
                        key={tab.name}
                        className={cn(
                            'px-2 py-1 text-xs',
                            tab.active
                                ? 'bg-card text-foreground border-border/60 rounded border font-medium'
                                : 'text-muted-foreground/50'
                        )}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>

            {/* Code area with line numbers */}
            <div className="flex overflow-x-auto font-mono text-[13px] leading-7">
                {/* Line numbers */}
                <div className="text-muted-foreground/30 shrink-0 py-4 pr-3 pl-4 text-right select-none">
                    {lines.map(line => (
                        <div key={line.num}>{line.num}</div>
                    ))}
                </div>

                {/* Code */}
                <div className="py-4 pr-6">
                    {lines.map(line => (
                        <div key={line.num} className="min-h-7">
                            {line.content}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent" />
        </div>
    )
}

export function CodeEditorMockup() {
    return (
        <div className="relative px-4 pb-16" style={{ perspective: '1000px' }}>
            <FileExplorerPanel />
            <CodePanel />
        </div>
    )
}

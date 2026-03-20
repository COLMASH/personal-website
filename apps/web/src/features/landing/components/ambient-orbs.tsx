'use client'

export function AmbientOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="animate-float bg-brand-accent/10 blur-4xl absolute -top-40 -right-40 h-125 w-125 rounded-full" />
            <div className="animate-float-delayed bg-brand-teal/10 blur-4xl absolute -bottom-40 -left-40 h-100 w-100 rounded-full" />
            <div className="animate-float-slow bg-brand-warm/8 blur-4xl absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
    )
}

import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="border-border flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Icon className="text-muted-foreground h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}

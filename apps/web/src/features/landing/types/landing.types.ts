export interface Service {
    id: string
    title: string
    description: string
    demo: 'agent' | 'workflow' | 'rag' | 'strategy' | 'browser' | 'blockchain' | 'terminal'
    featured?: boolean
}

export interface ApproachStep {
    number: number
    title: string
    description: string
    deliverable: string
    timeline: string
}

export interface Stat {
    value: number
    suffix: string
    label: string
}

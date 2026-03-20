export interface Service {
    id: string
    title: string
    description: string
    icon: string
    tags: string[]
    demo: 'chat' | 'browser' | 'blockchain' | 'gauge'
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

import type { ApproachStep } from '../types'

export const approachSteps: ApproachStep[] = [
    {
        number: 1,
        title: 'Discovery',
        description:
            'We learn your business inside and out — your workflows, pain points, and goals — to find the highest-impact AI opportunities.',
        deliverable: 'Typical: 2-3 Calls + Async Audit',
        timeline: 'Week 1'
    },
    {
        number: 2,
        title: 'Strategy',
        description:
            'We design the right solution with a clear roadmap, timeline, and ROI projection so you know exactly what to expect.',
        deliverable: 'Deliverable: Technical Spec + ROI Model',
        timeline: 'Week 2'
    },
    {
        number: 3,
        title: 'Build',
        description:
            'We implement and integrate your AI solution with your existing tools and workflows. No disruption, just results.',
        deliverable: 'Weekly Demos + Iterative Delivery',
        timeline: 'Weeks 3-8+'
    },
    {
        number: 4,
        title: 'Support',
        description:
            'Ongoing optimization, monitoring, and scaling to make sure your AI keeps delivering as your business grows.',
        deliverable: 'SLA-Backed Response Times',
        timeline: 'Ongoing'
    }
]

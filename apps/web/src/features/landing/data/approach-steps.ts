import type { ApproachStep } from '../types'

export const approachSteps: ApproachStep[] = [
    {
        number: 1,
        title: 'Discovery',
        description:
            'Deep dive into your business context, technical landscape, and goals. We identify quick wins and long-term opportunities.',
        deliverable: 'Assessment Report',
        timeline: 'Week 1'
    },
    {
        number: 2,
        title: 'Strategy',
        description:
            'Architecture design, technology selection, and detailed roadmap with clear milestones and success metrics.',
        deliverable: 'Technical Blueprint',
        timeline: 'Week 2'
    },
    {
        number: 3,
        title: 'Build',
        description:
            'Agile development with weekly demos, continuous integration, and transparent progress tracking.',
        deliverable: 'Working Product',
        timeline: 'Weeks 3-8+'
    },
    {
        number: 4,
        title: 'Support',
        description:
            'Post-launch monitoring, optimization, team training, and ongoing technical advisory.',
        deliverable: 'Maintenance Plan',
        timeline: 'Ongoing'
    }
]

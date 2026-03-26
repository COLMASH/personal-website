import type { Service } from '../types'

export const services: Service[] = [
    {
        id: 'ai-agents',
        title: 'AI Agents',
        description:
            'Custom autonomous agents that handle your busywork — from financial reporting to operational tasks — so you can focus on business growth.',
        demo: 'agent',
        featured: true
    },
    {
        id: 'ai-workflows',
        title: 'AI Workflows',
        description:
            'Automated workflows connecting your tools and eliminating repetitive tasks. No more manual data entry or copy-pasting between apps.',
        demo: 'workflow'
    },
    {
        id: 'rag-systems',
        title: 'RAG Systems',
        description:
            'AI that actually knows your business data. Custom knowledge bases, intelligent search, and document Q&A that give real answers.',
        demo: 'rag'
    },
    {
        id: 'ai-strategy',
        title: 'AI Strategy',
        description:
            'Clear roadmaps for AI adoption. We audit your tech stack, identify high-impact opportunities, and build an implementation plan.',
        demo: 'strategy'
    },
    {
        id: 'web-software',
        title: 'Software Development',
        description:
            'End-to-end software development — from database design and business logic to stunning UI/UX.',
        demo: 'browser'
    },
    {
        id: 'blockchain',
        title: 'Blockchain & Web3',
        description:
            'Decentralized applications, smart contracts, and tokenomics design for the next generation of digital products.',
        demo: 'blockchain'
    },
    {
        id: 'claude-training',
        title: 'Claude Code Training',
        description:
            'Hands-on workshops teaching your team to build with Claude Code — from prompt engineering to production AI agents.',
        demo: 'terminal'
    }
]

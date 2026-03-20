import type { Service } from '../types'

export const services: Service[] = [
    {
        id: 'ai',
        title: 'AI & Agentic Solutions',
        description:
            'Custom AI agents, RAG pipelines, and intelligent automation systems that transform how your business operates.',
        icon: 'Bot',
        tags: ['LangChain', 'Claude', 'OpenAI', 'RAG', 'Multi-Agent'],
        demo: 'chat'
    },
    {
        id: 'fullstack',
        title: 'Full-Stack Development',
        description:
            'End-to-end web applications with modern frameworks, optimized for performance, scalability, and developer experience.',
        icon: 'Code2',
        tags: ['Next.js', 'React', 'NestJS', 'TypeScript', 'PostgreSQL'],
        demo: 'browser'
    },
    {
        id: 'blockchain',
        title: 'Blockchain & Web3',
        description:
            'Decentralized applications, smart contracts, and tokenomics design for the next generation of digital products.',
        icon: 'Blocks',
        tags: ['Solidity', 'Ethereum', 'Smart Contracts', 'DeFi', 'NFTs'],
        demo: 'blockchain'
    },
    {
        id: 'engineering',
        title: 'Engineering Consulting',
        description:
            'Mechanical engineering expertise applied to industrial projects, from concept design to commissioning.',
        icon: 'Wrench',
        tags: ['CAD/CAM', 'FEA', 'Project Management', 'PMP', 'Industrial'],
        demo: 'gauge'
    }
]

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap'
})

export const metadata: Metadata = {
    title: 'Santana AI | AI Solutions Architect & Full-Stack Developer',
    description:
        'From autonomous AI agents to industrial-scale engineering — 15+ years of turning complex problems into elegant solutions. AI, Full-Stack, Blockchain, Engineering & Project Management.',
    keywords: [
        'AI Solutions',
        'Agentic AI',
        'Full-Stack Development',
        'Blockchain',
        'Engineering Consulting',
        'Project Management'
    ],
    openGraph: {
        title: 'Santana AI | AI Solutions Architect & Full-Stack Developer',
        description:
            'From autonomous AI agents to industrial-scale engineering — 15+ years of turning complex problems into elegant solutions.',
        type: 'website'
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} font-sans`}>
                <div className="warm-edge-gradient" aria-hidden="true" />
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

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
    title: 'Santana AI - Make AI Your Agentic Workforce',
    description:
        'Santana AI builds custom AI agents, automations, and integrations that give your team back 10+ hours every week. From strategy to deployment, handled end to end.',
    keywords: [
        'AI Consulting',
        'Agentic AI',
        'AI Agents',
        'AI Workforce',
        'AI Strategy',
        'AI Implementation',
        'Autonomous AI',
        'Business Automation'
    ],
    openGraph: {
        title: 'Santana AI - Make AI Your Agentic Workforce',
        description:
            'Custom AI agents, automations, and integrations that give your team back 10+ hours every week. From strategy to deployment, handled end to end.',
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

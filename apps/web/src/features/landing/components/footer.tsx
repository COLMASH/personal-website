import Link from 'next/link'
import { Github, Linkedin, Mail, Youtube } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const serviceLinks = [
    'AI & Agentic Solutions',
    'Full-Stack Development',
    'Blockchain & Web3',
    'Engineering Consulting'
]

const companyLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' }
]

const socialLinks = [
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/miguelangelsantana/'
    },
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/COLMASH'
    },
    {
        icon: Youtube,
        label: 'YouTube',
        href: 'https://www.youtube.com/@misanta'
    },
    {
        icon: Mail,
        label: 'Email',
        href: 'mailto:santanaai.co@gmail.com'
    }
]

export function Footer() {
    return (
        <footer className="border-border border-t">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: Brand + Social icons */}
                    <div>
                        <BrandLogo size="sm" initialDelay={0} />
                        <p className="text-muted-foreground mt-3 text-sm">
                            AI Engineering &<br />
                            Cross-Industry Consulting
                        </p>
                        <div className="mt-5 flex gap-3">
                            {socialLinks.map(link => {
                                const Icon = link.icon
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        className="text-muted-foreground hover:text-brand-accent border-border flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                            Services
                        </h3>
                        <ul className="space-y-2.5">
                            {serviceLinks.map(service => (
                                <li key={service}>
                                    <Link
                                        href="/#services"
                                        className="text-muted-foreground hover:text-brand-accent text-sm transition-colors"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                            Company
                        </h3>
                        <ul className="space-y-2.5">
                            {companyLinks.map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-brand-accent text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                            Connect
                        </h3>
                        <ul className="space-y-2.5">
                            {socialLinks.map(link => {
                                const Icon = link.icon
                                return (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-brand-accent flex items-center gap-2 text-sm transition-colors"
                                        >
                                            <Icon className="h-4 w-4" />
                                            {link.label}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-border mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
                    <p className="text-muted-foreground/60 text-sm">
                        &copy; 2026 Santana AI. All rights reserved.
                    </p>
                    <div className="mt-4 flex gap-6 md:mt-0">
                        <Link
                            href="/privacy"
                            className="text-muted-foreground/60 hover:text-muted-foreground text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-muted-foreground/60 hover:text-muted-foreground text-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

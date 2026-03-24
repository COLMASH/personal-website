import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/features/landing/components/navigation'
import { Footer } from '@/features/landing/components/footer'

export const metadata: Metadata = {
    title: 'Terms of Service | Santana AI',
    description: 'Terms of Service for Santana AI — AI Solutions Architect & Full-Stack Developer.'
}

export default function TermsPage() {
    return (
        <>
            <Navigation />
            <main className="mx-auto max-w-3xl px-6 py-24">
                <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                <p className="text-muted-foreground mt-2 text-sm">Last updated: March 19, 2026</p>

                <div className="mt-12 space-y-10">
                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By using santanaai.com you agree to these terms. If you don&apos;t
                            agree, please don&apos;t use the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Services</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Santana AI provides AI consulting, agentic systems development,
                            full-stack engineering, blockchain solutions, and engineering consulting
                            services. Specific deliverables, timelines, and pricing are agreed upon
                            individually before any work begins.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Intellectual Property</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            All content on this website — including text, design, code templates,
                            and technical documentation — is owned by Santana AI. You may use
                            materials provided to you through our engagements for your own business,
                            but you may not resell or redistribute them.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">No Guarantees of Results</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            While we share real results from real clients, individual outcomes vary.
                            We do not guarantee specific revenue, clients, or business results. Your
                            success depends on your effort, skills, and market conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Limitation of Liability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Santana AI is not liable for any indirect, incidental, or consequential
                            damages arising from your use of our website or services. Our total
                            liability is limited to the amount you&apos;ve paid us for services.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Changes</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update these terms from time to time. Continued use of the site
                            after changes constitutes acceptance.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Contact</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Questions? Email{' '}
                            <a
                                href="mailto:santanaai.co@gmail.com"
                                className="text-brand-accent hover:text-brand-accent-hover transition-colors"
                            >
                                santanaai.co@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}

import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/features/landing/components/navigation'
import { Footer } from '@/features/landing/components/footer'

export const metadata: Metadata = {
    title: 'Privacy Policy | Santana AI',
    description: 'Privacy Policy for Santana AI — how we collect, use, and protect your data.'
}

export default function PrivacyPage() {
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

                <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="text-muted-foreground mt-2 text-sm">Last updated: March 19, 2026</p>

                <div className="mt-12 space-y-10">
                    <section>
                        <h2 className="mb-3 text-xl font-semibold">What We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            When you submit a form on our website, we collect the information you
                            provide — including your name, email address, and any details you share
                            about your project or goals. We also collect basic analytics data (pages
                            visited, traffic source) through standard web analytics.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">How We Use It</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            <p className="mb-3">We use your information to:</p>
                            <ul className="list-inside list-disc space-y-2">
                                <li>Respond to your inquiry or consultation request</li>
                                <li>Send you a confirmation when you reach out</li>
                                <li>
                                    Understand how visitors use our website so we can improve it
                                </li>
                            </ul>
                            <p className="mt-4">
                                We do not sell your personal information to third parties. Ever.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Where We Store It</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Form submissions are stored in our database using industry-standard
                            encryption and security practices. All data is processed and stored on
                            secure infrastructure.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Analytics</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use analytics tools to understand traffic patterns and page
                            performance. These tools may use cookies to track anonymous usage data.
                            No personally identifiable information is shared with analytics
                            providers.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Your Rights</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You can request to see, update, or delete any personal data we hold
                            about you. Just email us at{' '}
                            <a
                                href="mailto:migangsant@gmail.com"
                                className="text-brand-accent hover:text-brand-accent-hover transition-colors"
                            >
                                migangsant@gmail.com
                            </a>{' '}
                            and we&apos;ll take care of it.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Contact</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Questions about this policy? Reach out at{' '}
                            <a
                                href="mailto:migangsant@gmail.com"
                                className="text-brand-accent hover:text-brand-accent-hover transition-colors"
                            >
                                migangsant@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}

import { InteractiveGrid } from '@/features/landing/components/interactive-grid'
import { Navigation } from '@/features/landing/components/navigation'
import { HeroSection } from '@/features/landing/components/hero-section'
import { StatsBanner } from '@/features/landing/components/stats-banner'
import { ServicesSection } from '@/features/landing/components/services-section'
import { ApproachSection } from '@/features/landing/components/approach-section'
import { ContactSection } from '@/features/landing/components/contact-section'
import { Footer } from '@/features/landing/components/footer'

export default function LandingPage() {
    return (
        <>
            <Navigation />
            <main>
                <InteractiveGrid />
                <HeroSection />
                <StatsBanner />
                <ServicesSection />
                <ApproachSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    )
}

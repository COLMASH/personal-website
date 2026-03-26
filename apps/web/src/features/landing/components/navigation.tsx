'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'
import { BrandLogo } from '@/components/brand-logo'

const NAV_LINKS = [
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' }
] as const

export function Navigation() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50)
                ticking = false
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setMobileOpen(false)
        setTimeout(() => smoothScrollTo(href), 300)
    }, [])

    return (
        <nav
            className={cn(
                'fixed top-0 right-0 left-0 z-50',
                'transition-all duration-500 ease-out',
                scrolled || mobileOpen
                    ? 'border-border/50 bg-background/80 border-b backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent'
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                {/* Logo */}
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                >
                    <BrandLogo />
                </a>

                {/* Desktop links */}
                <div className="hidden items-center gap-10 lg:flex">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={e => handleNavClick(e, link.href)}
                            className={cn(
                                'text-muted-foreground text-sm font-medium',
                                'hover:text-foreground transition-colors duration-200'
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={e => handleNavClick(e, '#contact')}
                        className={cn(
                            'border-brand-accent bg-brand-accent rounded-full border px-6 py-2',
                            'text-sm font-medium text-white',
                            'hover:bg-brand-accent-hover hover:border-brand-accent-hover',
                            'transition-all duration-200'
                        )}
                    >
                        Book a Call
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    className="text-foreground lg:hidden"
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile panel */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="border-border/50 bg-background relative overflow-hidden border-t lg:hidden"
                    >
                        <div className="flex flex-col gap-4 px-6 py-6">
                            {NAV_LINKS.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={e => handleNavClick(e, link.href)}
                                    className={cn(
                                        'text-muted-foreground text-base font-medium',
                                        'hover:text-foreground transition-colors'
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={e => handleNavClick(e, '#contact')}
                                className={cn(
                                    'bg-brand-accent mt-2 rounded-full px-6 py-2',
                                    'text-center text-sm font-medium text-white',
                                    'hover:bg-brand-accent-hover transition-colors'
                                )}
                            >
                                Book a Call
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

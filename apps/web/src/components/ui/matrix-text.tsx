'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LetterState {
    char: string
    isMatrix: boolean
    isSpace: boolean
}

interface MatrixTextProps {
    text?: string
    className?: string
    initialDelay?: number
    cascadeDelay?: number
    letterDuration?: number
    letterInterval?: number
    triggerReplay?: number
}

export function MatrixText({
    text = 'SANTANA',
    className,
    initialDelay = 300,
    cascadeDelay = 0,
    letterDuration = 400,
    letterInterval = 80,
    triggerReplay = 0
}: MatrixTextProps) {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split('').map(char => ({
            char,
            isMatrix: false,
            isSpace: char === ' '
        }))
    )
    const isAnimatingRef = useRef(false)

    const getRandomChar = useCallback(() => (Math.random() > 0.5 ? '1' : '0'), [])

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return

            requestAnimationFrame(() => {
                setLetters(prev => {
                    const next = [...prev]
                    if (!next[index].isSpace) {
                        next[index] = { ...next[index], char: getRandomChar(), isMatrix: true }
                    }
                    return next
                })

                setTimeout(() => {
                    setLetters(prev => {
                        const next = [...prev]
                        next[index] = { ...next[index], char: text[index], isMatrix: false }
                        return next
                    })
                }, letterDuration)
            })
        },
        [getRandomChar, text, letterDuration]
    )

    const startAnimation = useCallback(() => {
        if (isAnimatingRef.current) return
        isAnimatingRef.current = true

        let currentIndex = 0
        const animate = () => {
            if (currentIndex >= text.length) {
                isAnimatingRef.current = false
                return
            }
            animateLetter(currentIndex)
            currentIndex++
            setTimeout(animate, letterInterval)
        }
        animate()
    }, [animateLetter, text.length, letterInterval])

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (triggerReplay > 0) {
            const timer = setTimeout(startAnimation, cascadeDelay)
            return () => clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerReplay])

    return (
        <span className={className} aria-label={text}>
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className={cn(
                        'inline-block transition-all duration-150 ease-out',
                        letter.isMatrix && 'matrix-glow text-brand-accent'
                    )}
                >
                    {letter.isSpace ? '\u00A0' : letter.char}
                </span>
            ))}
        </span>
    )
}

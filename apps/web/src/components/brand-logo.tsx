'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MatrixText } from '@/components/ui/matrix-text'

interface BrandLogoProps {
    className?: string
    size?: 'sm' | 'default'
    initialDelay?: number
}

const LETTER_INTERVAL = 80
const SANTANA_CASCADE = 7 * LETTER_INTERVAL

export function BrandLogo({ className, size = 'default', initialDelay = 400 }: BrandLogoProps) {
    const [replayCount, setReplayCount] = useState(0)

    const textSize = size === 'sm' ? 'text-lg' : 'text-xl'

    return (
        <span
            className={cn('inline-flex items-baseline gap-1.5', className)}
            onMouseEnter={() => setReplayCount(c => c + 1)}
        >
            <MatrixText
                text="SANTANA"
                className={cn(textSize, 'font-extrabold tracking-widest')}
                initialDelay={initialDelay}
                cascadeDelay={0}
                letterInterval={LETTER_INTERVAL}
                triggerReplay={replayCount}
            />
            <MatrixText
                text="AI"
                className={cn(textSize, 'text-brand-accent font-extrabold')}
                initialDelay={initialDelay + SANTANA_CASCADE}
                cascadeDelay={SANTANA_CASCADE}
                letterInterval={LETTER_INTERVAL}
                triggerReplay={replayCount}
            />
        </span>
    )
}

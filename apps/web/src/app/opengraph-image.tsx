import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
    const interBold = await fetch(
        new URL(
            'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf'
        )
    ).then(res => res.arrayBuffer())

    const interLight = await fetch(
        new URL(
            'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf'
        )
    ).then(res => res.arrayBuffer())

    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(135deg, #007a40 0%, #00b162 40%, #86efac 100%)',
                gap: '24px'
            }}
        >
            {/* Hero tagline — protagonist */}
            <div
                style={{
                    display: 'flex',
                    fontFamily: 'Inter',
                    fontSize: 72,
                    fontWeight: 800,
                    color: '#0a0a0a',
                    letterSpacing: '-0.03em',
                    gap: '18px'
                }}
            >
                <span>Make</span>
                <span style={{ color: 'white' }}>AI</span>
                <span>Your Unfair Advantage</span>
            </div>
            {/* Brand logo: SANTANA AI — smaller, below */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px'
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter',
                        fontSize: 36,
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '0.1em',
                        textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)'
                    }}
                >
                    SANTANA
                </span>
                <span
                    style={{
                        fontFamily: 'Inter',
                        fontSize: 36,
                        fontWeight: 800,
                        color: 'white',
                        textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)'
                    }}
                >
                    AI
                </span>
            </div>
        </div>,
        {
            ...size,
            fonts: [
                { name: 'Inter', data: interBold, weight: 800, style: 'normal' },
                { name: 'Inter', data: interLight, weight: 300, style: 'normal' }
            ]
        }
    )
}

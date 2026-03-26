import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00b162',
                borderRadius: '20%',
                fontSize: 26,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.5px',
                textShadow: '0 0 2px white, 0 0 2px white'
            }}
        >
            AI
        </div>,
        { ...size }
    )
}

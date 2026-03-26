import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Santana AI',
        short_name: 'Santana AI',
        description:
            'Custom AI agents, automations, and integrations that give your team back 10+ hours every week.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fafcfa',
        theme_color: '#00b162',
        icons: [
            {
                src: '/icon',
                sizes: '32x32',
                type: 'image/png'
            },
            {
                src: '/apple-icon',
                sizes: '180x180',
                type: 'image/png'
            }
        ]
    }
}

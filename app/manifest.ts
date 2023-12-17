import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        lang: 'en',
        name: process.env.NEXT_PUBLIC_MANIFEST_NAME ?? '',
        short_name: process.env.NEXT_PUBLIC_MANIFEST_NAME ?? '',
        description: process.env.NEXT_PUBLIC_MANIFEST_DESCRIPTION ?? '',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/?source=pwa',
        icons: [
            {
                src: '/icon1.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/icon2.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/icon3.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'icon4.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}

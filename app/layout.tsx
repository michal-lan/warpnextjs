import GoogleTagManager from '@/components/GTM'
import GlobalStyles from '@/components/globalStyles'
import '@/styles/globals.scss'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    robots: 'index,follow',
    viewport: 'width=device-width, initial-scale=1',
    formatDetection: {
        // email: false,
        // address: false,
        telephone: false,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <Suspense>
                    <GoogleTagManager />
                </Suspense>
                {children}

                <GlobalStyles />
            </body>
        </html>
    )
}

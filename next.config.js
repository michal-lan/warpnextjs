/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // trailingSlash: true, // this creates a problem with ClassNames, investigation needed
}

if (process.env.NEXT_PUBLIC_ASSETS_URL) {
    const assetsUrl = new URL(process.env.NEXT_PUBLIC_ASSETS_URL)
    nextConfig.images = {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                protocol: assetsUrl.protocol.replace(':', ''),
                hostname: assetsUrl.hostname,
                port: assetsUrl.port,
            },
        ],
    }
}

module.exports = nextConfig

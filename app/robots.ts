import { MetadataRoute } from 'next'

// https://en.wikipedia.org/wiki/Robots.txt#Standard
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/sitemap.xml`,
    }
}

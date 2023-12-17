import { SeoProps } from '@/types/fragments/seo.type'

export const prepareSEO = (seo: SeoProps, overwrite?: SeoProps) => {
    let result = {}

    if (seo) {
        try {
            result = {
                title: overwrite?.title || seo?.title || '',
                openGraph: {
                    author: seo?.opengraphAuthor || '',
                    title: seo?.opengraphTitle || '',
                    description: seo?.opengraphDescription || '',
                    url: seo?.opengraphUrl || '',
                },
                description: overwrite?.metaDesc || seo?.metaDesc || '',
                keywords: seo?.metaKeywords || '',
                canonical: seo?.canonical || '',
                metadataBase: seo?.canonical || '',
            }
        } catch (error) {
            console.error(error)
            throw new Error('Failed to prepare seo')
        }
    }

    return result
}

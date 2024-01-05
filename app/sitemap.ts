import { GetAllSlugsDocument, GetAllSlugsQuery } from '@/__generated__/graphql'
import { getAllSlugs } from '@/utils/getAllTypesSlugs'
import makeApolloRequest from 'apollo-client'
import { MetadataRoute } from 'next'

// Generates urls with production version (without port)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data } = await makeApolloRequest<GetAllSlugsQuery>(
        GetAllSlugsDocument,
    )

    const allSlugs = getAllSlugs(data, true)

    const routes = allSlugs?.map((route: { slug: string[] }) => ({
        url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/${route.slug.join('/')}`,
        lastModified: new Date(),
    }))

    return routes
}

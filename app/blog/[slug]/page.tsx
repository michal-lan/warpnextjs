import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { Metadata } from 'next'
import {
    GetBlogPostsQuery,
    GetBlogPostsDocument,
    GetContentNodeQuery,
    GetContentNodeDocument,
} from '@/__generated__/graphql'
import { notFound } from 'next/navigation'
import { PageProps } from '@/types/page'
import { prepareSEO } from '@/utils/prepareSEO'
import { getArchiveSlugs } from '@/utils/getArchiveSlugs'
import Template from '@/components/Template'
import { archiveName } from '../page'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const { data } = await makeApolloRequest<GetBlogPostsQuery>(
        GetBlogPostsDocument,
        {
            size: 1000,
        },
    )

    return getArchiveSlugs(data)
}

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    return await makeApolloRequest<GetContentNodeQuery>(
        GetContentNodeDocument,
        {
            pageSlug: `${archiveName}/${params.slug}`,
            contentType: 'POST',
        },
    )
})

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.contentNode?.seo)
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })

    if (!data?.contentNode) {
        notFound()
    }

    return <Template data={data} type='post' />
}

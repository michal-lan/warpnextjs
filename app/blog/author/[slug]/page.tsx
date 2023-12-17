import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { Metadata } from 'next'
import {
    GetAuthorDocument,
    GetAuthorQuery,
    GetBlogAuthorSlugsDocument,
    GetBlogAuthorSlugsQuery,
} from '@/__generated__/graphql'
import Wrapper from '@/components/Wrapper'
import Container from '@/components/Container'
import SeoSchema from '@/components/SeoSchema'
import { notFound } from 'next/navigation'
import { PageProps } from '@/types/page'
import { prepareSEO } from '@/utils/prepareSEO'
import { getArchiveSlugs } from '@/utils/getArchiveSlugs'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const { data } = await makeApolloRequest<GetBlogAuthorSlugsQuery>(
        GetBlogAuthorSlugsDocument,
    )

    return getArchiveSlugs(data)
}

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    return await makeApolloRequest<GetAuthorQuery>(GetAuthorDocument, {
        pageSlug: params.slug,
    })
})

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.user?.seo)
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })

    if (!data?.user) {
        notFound()
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <div className='py-2 mb-4 w-full border-b border-gray-200 bg-white text-gray-400'>
                        {data?.user?.name} - single user content
                    </div>
                    <p>Please add here some of design</p>
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.user?.seo} />
        </>
    )
}

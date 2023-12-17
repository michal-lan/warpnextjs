import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { Metadata } from 'next'
import {
    GetPostQuery,
    GetPostDocument,
    GetBlogPostsQuery,
    GetBlogPostsDocument,
} from '@/__generated__/graphql'
import Wrapper from '@/components/Wrapper'
import Container from '@/components/Container'
import SeoSchema from '@/components/SeoSchema'
import { notFound } from 'next/navigation'
import { PageProps } from '@/types/page'
import { prepareSEO } from '@/utils/prepareSEO'
import { getArchiveSlugs } from '@/utils/getArchiveSlugs'
import Content from '@/components/Content'

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
    return await makeApolloRequest<GetPostQuery>(GetPostDocument, {
        pageSlug: params.slug,
    })
})

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.post?.seo)
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })
    const post = data?.post

    if (!post) {
        notFound()
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <article
                        key={post?.id}
                        className='flex max-w-xl flex-col items-start justify-between'
                    >
                        <div className='mx-auto max-w-2xl lg:mx-0 my-12'>
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                {post?.title}
                            </h2>

                            <div className='mt-2 text-lg leading-8 text-gray-600'>
                                <Content value={post?.content} />
                            </div>
                        </div>
                    </article>
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.post?.seo} />
        </>
    )
}

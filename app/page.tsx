import Container from '@/components/Container'
import Wrapper from '@/components/Wrapper'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import makeApolloRequest from 'apollo-client'
import SeoSchema from '@/components/SeoSchema'
import { cache } from 'react'
import { PageProps } from '@/types/page'
import { GetPageByIdDocument, GetPageByIdQuery } from '@/__generated__/graphql'
import { prepareSEO } from '@/utils/prepareSEO'
// import PageBuilder from '@/components/PageBuilder'
import Content from '@/components/Content'
import getReadingSettings from '@/utils/getReadingSettings'

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    const { pageOnFront } = await getReadingSettings()

    return await makeApolloRequest<GetPageByIdQuery>(GetPageByIdDocument, {
        pageId: pageOnFront,
    })
})

// it's okay to call API request 2nd time (here for seo and below for data), because nextJS is combine it to only one query.
export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.page?.seo)
}

export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })

    if (!data?.page) {
        notFound()
    }

    // in that way we are able to render content of page as gutenberg blocks (we are able to use ACF Blocks also here)
    // <Content value={data?.page?.content} />

    // if someone needs use blocks then should install "WPGraphQL Blocks" and then assign them similar way like pageBuilder (TODO: maybe build an example)
    // const blocks = data?.page?.blocks
    // console.log(blocks)

    // const pageBuilder = data?.page?.pageBuilder?.pageBuilder
    // console.log(pageBuilder)

    return (
        <>
            <Wrapper>
                <Container>
                    <div className='py-2 mb-4 w-full border-b border-gray-200 bg-white text-gray-400'>
                        {data?.page?.title}
                    </div>

                    <Content value={data?.page?.content} />
                    {/* <PageBuilder sections={pageBuilder} /> */}
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.page?.seo} />
        </>
    )
}

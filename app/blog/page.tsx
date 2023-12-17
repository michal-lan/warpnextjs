import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { Metadata } from 'next'
import {
    GetPageByIdQuery,
    GetPageByIdDocument,
    GetBlogPostsQuery,
    GetBlogPostsDocument,
} from '@/__generated__/graphql'
import Wrapper from '@/components/Wrapper'
import Container from '@/components/Container'
import SeoSchema from '@/components/SeoSchema'
import { notFound } from 'next/navigation'
import { PageProps } from '@/types/page'
import { prepareSEO } from '@/utils/prepareSEO'
import ArchivePaginatedPage from '@/components/Blog/ArchivePaginatedPage'
import { PER_PAGE } from '@/constants/app'
import getReadingSettings from '@/utils/getReadingSettings'
import { OffsetPaginationProps } from '@/types/pagination.type'
import { getPageOffset } from '@/utils/paginationHelpers'

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    const { pageForPosts } = await getReadingSettings()

    return await makeApolloRequest<GetPageByIdQuery>(GetPageByIdDocument, {
        pageId: pageForPosts,
    })
})

const postsRequest = cache(
    async ({ offset = 0, size = PER_PAGE }: OffsetPaginationProps) => {
        return await makeApolloRequest<GetBlogPostsQuery>(
            GetBlogPostsDocument,
            {
                offset: offset,
                size: size,
            },
        )
    },
)

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.page?.seo)
}

export default async function Page({ params, searchParams }: PageProps) {
    const currentPage = Number(params?.page) || 1
    const { data } = await pageRequest({ params, searchParams })
    const { data: postsData } = await postsRequest({
        offset: getPageOffset(currentPage),
    })

    const totalPosts = postsData?.posts?.pageInfo?.offsetPagination?.total ?? 0
    const posts = postsData?.posts?.nodes ?? []

    if (!data?.page) {
        notFound()
    }

    return (
        <>
            <Wrapper>
                <Container>
                    <ArchivePaginatedPage
                        items={posts}
                        currentPage={currentPage}
                        totalItems={totalPosts}
                    />
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.page?.seo} />
        </>
    )
}

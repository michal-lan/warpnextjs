import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { Metadata } from 'next'
import {
    GetBlogPostsDocument,
    GetBlogPostsQuery,
    GetPageByIdDocument,
    GetPageByIdQuery,
} from '@/__generated__/graphql'
import Wrapper from '@/components/Wrapper'
import Container from '@/components/Container'
import SeoSchema from '@/components/SeoSchema'
import { notFound, redirect } from 'next/navigation'
import { PageProps } from '@/types/page'
import { prepareSEO } from '@/utils/prepareSEO'
import { PER_PAGE } from '@/constants/app'
import ArchivePaginatedPage from '@/components/Blog/ArchivePaginatedPage'
import getReadingSettings from '@/utils/getReadingSettings'
import {
    emptyPropsRequest,
    getPagePaths,
    getPaginationData,
    paginationTitleSEO,
} from '@/utils/paginationHelpers'
import { OffsetPaginationProps } from '@/types/pagination.type'

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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const { totalPages } = await getPaginationData({
        params: emptyPropsRequest.params,
        searchParams: emptyPropsRequest.searchParams,
        pageRequest,
        postsRequest,
    })

    return getPagePaths(totalPages)
}

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data, totalPages } = await getPaginationData({
        params,
        searchParams,
        pageRequest,
        postsRequest,
    })

    const paginationTitle = paginationTitleSEO(
        data?.page?.seo?.title,
        parseInt(params?.page),
        totalPages,
    )

    return prepareSEO(data?.page?.seo, {
        title: paginationTitle,
    })
}

export default async function Page({ params, searchParams }: PageProps) {
    const { currentPage, data, totalPosts, posts, totalPages } =
        await getPaginationData({
            params,
            searchParams,
            pageRequest,
            postsRequest,
        })

    if (!data?.page) {
        notFound()
    }

    if (currentPage === 1) {
        redirect('/blog')
    }

    if (currentPage > totalPages) {
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

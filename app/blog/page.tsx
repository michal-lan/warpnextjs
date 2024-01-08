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
import { PER_PAGE } from '@/constants/app'
import getReadingSettings from '@/utils/getReadingSettings'
import { OffsetPaginationProps } from '@/types/pagination.type'
import { getPageOffset } from '@/utils/paginationHelpers'
import Template from '@/components/Template'

// this should be the name of archive in queried URI
export const archiveName = 'blog'

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    const { pageForPosts } = await getReadingSettings()

    return await makeApolloRequest<GetContentNodeQuery>(
        GetContentNodeDocument,
        {
            pageSlug: pageForPosts,
            idType: 'DATABASE_ID',
        },
    )
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
    return prepareSEO(data?.contentNode?.seo)
}

export default async function Page({ params, searchParams }: PageProps) {
    const currentPage = Number(params?.page) || 1
    const { data } = await pageRequest({ params, searchParams })
    const { data: postsData } = await postsRequest({
        offset: getPageOffset(currentPage),
    })

    const totalPosts = postsData?.posts?.pageInfo?.offsetPagination?.total ?? 0
    const posts = postsData?.posts?.nodes ?? []

    if (!data?.contentNode) {
        notFound()
    }

    const additionalData = {
        posts,
        currentPage,
        totalPosts,
    }

    return <Template {...additionalData} data={data} type='blogArchive' />
}

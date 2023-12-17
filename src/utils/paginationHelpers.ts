import { PER_PAGE } from '@/constants/app'
import {
    PagePropsPagination,
    PreparePaginationDataResponseProps,
} from '@/types/pagination.type'

export const emptyPropsRequest = {
    params: {
        page: '',
        slug: '',
    },
    searchParams: {},
}

// 1st method - all slugs will be static
export const getPagePaths = (totalPages: number) => {
    let pagePaths = []

    if (totalPages > 1) {
        for (let i = 2; i <= totalPages; i++) {
            pagePaths.push({
                page: `${i}`,
            })
        }
    }

    return pagePaths
}

// 2nd method - prerender the next 5 pages after the first page, which is handled by the index page. Other pages will be prerendered at runtime.
export const getPagePathsFirstFew = () => {
    return Array.from({ length: 5 }).map((_, i) => ({
        page: `${i + 2}`,
    }))
}

// get offset by current page or none offset for the first page
export const getPageOffset = (currentPage: number) => {
    return currentPage ? (currentPage - 1) * PER_PAGE : 0
}

// get number of available pages in pagination
export const getTotalPagesAmount = (totalPosts: number) => {
    return totalPosts ? Math.ceil(totalPosts / PER_PAGE) : 0
}

export const getPaginationData = async ({
    params,
    searchParams,
    pageRequest,
    postsRequest,
}: PagePropsPagination) => {
    const response: PreparePaginationDataResponseProps = {
        currentPage: 1,
        data: {},
        totalPosts: 0,
        posts: [],
        totalPages: 0,
    }
    let postsQueryParams = {}

    if (params?.page) {
        response.currentPage = Number(params?.page) || 1
        const { data } = await pageRequest({ params, searchParams })
        response.data = data

        postsQueryParams = {
            offset: getPageOffset(response.currentPage),
        }
    }
    const { data: postsData } = await postsRequest(postsQueryParams)

    response.totalPosts =
        postsData?.posts?.pageInfo?.offsetPagination?.total ?? 0
    response.posts = postsData?.posts?.nodes ?? []
    response.totalPages = getTotalPagesAmount(response.totalPosts)

    return response
}

export const paginationTitleSEO = (
    title: string,
    currentPage: number,
    totalPages: number,
) => {
    if (title && currentPage && totalPages && totalPages > 0) {
        const splittedTitle = title.split(' - ')

        if (splittedTitle && splittedTitle.length > 1) {
            splittedTitle.splice(1, 0, `Page ${currentPage} of ${totalPages}`)
            return splittedTitle.join(' - ')
        }
    }

    return title
}

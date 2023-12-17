import { PageProps } from './page'

export type ArchivePaginatedPageProps = {
    items: any[]
    currentPage: number
    totalItems: number
}

export type PaginationProps = {
    totalItems: number
    currentPage: number
    renderPageLink: (page: number) => string
    itemsPerPage: number
    renderFirstPageLink: string
}

export type OffsetPaginationProps = {
    offset?: Number
    size?: Number
}

export type PreparePaginationDataResponseProps = {
    currentPage: number
    data: any
    totalPosts: number
    posts: []
    totalPages: number
}

export type PagePropsPagination = {
    params: {
        slug: string[] | string
        page: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
    pageRequest: ({ params, searchParams }: PageProps) => any
    postsRequest: ({ offset, size }: OffsetPaginationProps) => any
}

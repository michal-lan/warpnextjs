export type PageProps = {
    params: {
        slug: string[] | string
        page: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

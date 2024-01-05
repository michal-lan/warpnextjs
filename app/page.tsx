import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import { PageProps } from '@/types/page'
import {
    GetContentNodeDocument,
    GetContentNodeQuery,
} from '@/__generated__/graphql'
import { prepareSEO } from '@/utils/prepareSEO'
import Template from '@/components/Template'

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    return await makeApolloRequest<GetContentNodeQuery>(
        GetContentNodeDocument,
        {
            pageSlug: '/',
        },
    )
})

// it's okay to call API request 2nd time (here for seo and below for data), because nextJS is combine it to only one query.
export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { data } = await pageRequest({ params, searchParams })
    return prepareSEO(data?.contentNode?.seo)
}

export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })

    if (!data?.contentNode) {
        notFound()
    }

    return <Template data={data} type='page' />
}

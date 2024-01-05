import makeApolloRequest from 'apollo-client'
import { cache } from 'react'
import {
    GetContentNodeQuery,
    GetContentNodeDocument,
} from '@/__generated__/graphql'
import { notFound } from 'next/navigation'
import { PageProps } from '@/types/page'
import Template from '@/components/Template'

const pageRequest = cache(async ({ params, searchParams }: PageProps) => {
    const contentType =
        searchParams?.post_type !== undefined &&
        typeof searchParams?.post_type === 'string'
            ? searchParams.post_type.toUpperCase()
            : 'PAGE'

    return await makeApolloRequest<GetContentNodeQuery>(
        GetContentNodeDocument,
        {
            pageSlug: searchParams?.p,
            idType: 'DATABASE_ID',
            asPreview: true,
            contentType: contentType,
        },
    )
})

export default async function Page({ params, searchParams }: PageProps) {
    const { data } = await pageRequest({ params, searchParams })

    if (!data?.contentNode) {
        notFound()
    }

    return <Template data={data} type={searchParams?.post_type} />
}

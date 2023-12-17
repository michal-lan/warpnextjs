import {
    ReadingSettingsDocument,
    ReadingSettingsQuery,
} from '@/__generated__/graphql'
import makeApolloRequest from 'apollo-client'

const getReadingSettings = async () => {
    let readingSettings = {
        pageForPosts: null,
        pageOnFront: null,
        showOnFront: null,
        postsPerPage: null,
    }

    const { data } = await makeApolloRequest<ReadingSettingsQuery>(
        ReadingSettingsDocument,
    )

    if (data) {
        readingSettings = data?.readingSettings
    }

    return { ...readingSettings }
}

export default getReadingSettings

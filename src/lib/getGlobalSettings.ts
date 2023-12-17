import {
    GetGlobalSettingsDocument,
    GetGlobalSettingsQuery,
} from '@/__generated__/graphql'
import { MENU_LOCATIONS } from '@/constants/menuLocations'
import { globalSettingsProps } from '@/types/lib/globalSettings.type'
import { flatListToHierarchical } from '@/utils/flatListToHierarchical'
import makeApolloRequest from 'apollo-client'
import { cache } from 'react'

const pageRequest = cache(async () => {
    return await makeApolloRequest<GetGlobalSettingsQuery>(
        GetGlobalSettingsDocument,
        {
            headerLocation: MENU_LOCATIONS.PRIMARY,
            footerLocation: MENU_LOCATIONS.FOOTER,
        },
    )
})

export default async function getGlobalSettings() {
    const globalSettings: globalSettingsProps = {
        headerMenuItems: [],
        footerMenuItems: [],
        globalStylesheet: '',
    }

    const { data } = await pageRequest()

    globalSettings.headerMenuItems =
        flatListToHierarchical(data?.headerMenuItems?.nodes) ?? []
    globalSettings.footerMenuItems =
        flatListToHierarchical(data?.footerMenuItems?.nodes) ?? []
    globalSettings.globalStylesheet = data?.globalStylesheet ?? ''

    return globalSettings
}

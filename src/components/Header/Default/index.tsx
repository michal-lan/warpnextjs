import React from 'react'
import getGlobalSettings from '@/lib/getGlobalSettings'
import HeaderDefaultContent from '@/components/Header/Default/content'

const HeaderDefault = async () => {
    const { headerMenuItems } = await getGlobalSettings()

    return <HeaderDefaultContent headerMenuItems={headerMenuItems} />
}

export default HeaderDefault

import React from 'react'
import getGlobalSettings from '@/lib/getGlobalSettings'

const GlobalStyles = async () => {
    const { globalStylesheet } = await getGlobalSettings()

    return (
        <style
            id='global-styles-inline-css'
            dangerouslySetInnerHTML={{
                __html: globalStylesheet ?? '',
            }}
        ></style>
    )
}

export default GlobalStyles

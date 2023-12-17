/**
 * UseMediaQuery
 *
 * you can use the rest of MediaQueries in your project, but in example we only needed isMobile
 */

import { useMediaQuery as mediaQuery } from 'react-responsive'

const sizeRootVars = {
    xxl: 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
    xs: 0,
}

const UseMediaQuery = (): Record<string, boolean> => {
    // const xsScreen = mediaQuery({ maxWidth: sizeRootVars.xs });
    // const smScreen = mediaQuery({ maxWidth: sizeRootVars.sm });
    // const mdScreen = mediaQuery({ maxWidth: sizeRootVars.md });
    // const lgScreen = mediaQuery({ maxWidth: sizeRootVars.lg });
    // const xlScreen = mediaQuery({ maxWidth: sizeRootVars.xl });
    // const doublexlSceen = mediaQuery({ maxWidth: sizeRootVars.xxl });
    const isMobile = mediaQuery({ maxWidth: sizeRootVars.lg })

    return {
        // xsScreen,
        // smScreen,
        // mdScreen,
        // lgScreen,
        // xlScreen,
        // doublexlSceen,
        isMobile,
    }
}

export default UseMediaQuery

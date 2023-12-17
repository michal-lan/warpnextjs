import { CUSTOM_PAGES } from '@/constants/CustomPages'

export const getArchiveSlugs = (data: {}, applySEORobotsFilter = false) => {
    let slugList: { slug: string[] }[] = []

    if (data && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([postType, value]) => {
            const postTypeNodes = value || {}

            Object.entries(postTypeNodes).forEach(([key, nodes]) => {
                if (typeof nodes === 'object' && Array.isArray(nodes)) {
                    nodes.forEach(node => {
                        let robotsIndexStatus = 'index'
                        const isSlugInArray = slugList.some(
                            el => el.slug === node.slug,
                        )

                        // if seo filtering is enabled - check seo status
                        if (applySEORobotsFilter) {
                            robotsIndexStatus =
                                node?.seo?.metaRobotsNoindex ?? 'index'
                        }

                        // if slug is not added yet and robots status is not equal noindex - add to list
                        if (!isSlugInArray && robotsIndexStatus !== 'noindex') {
                            // exclusion pages that are overwritten
                            if (!CUSTOM_PAGES.includes(node.slug)) {
                                slugList.push({
                                    slug: node.slug,
                                })
                            }
                        }
                    })
                }
            })
        })
    }

    return slugList
}

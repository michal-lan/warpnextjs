import { SLUG_OVERRIDE } from '@/constants/slugOverride'

export const getAllSlugs = (data: {}, applySEORobotsFilter = false) => {
    let slugList: { slug: string[] }[] = []

    if (data && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([postType, value]) => {
            const overrideSlugs: { [postType: string]: string[] } =
                SLUG_OVERRIDE

            const postTypeNodes = value || {}
            const slugParent = overrideSlugs.hasOwnProperty(postType)
                ? overrideSlugs[postType]
                : [postType]

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
                            slugList.push({
                                slug: slugParent.concat([node.slug]),
                            })
                        }
                    })
                }
            })
        })
    }

    return slugList
}

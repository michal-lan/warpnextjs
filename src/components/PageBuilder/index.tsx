import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    AcfPageBuilderComponents,
    AcfPageBuilderFieldName,
} from '@/constants/AcfPageBuilder'
import { PageBuilderSectionProps } from '@/types/components/PageBuilder/pageBuilder.type'

const PageBuilder = ({ sections }: { sections: [] | undefined }) => {
    if (typeof sections === 'undefined' || !Array.isArray(sections)) return null

    const pageBuilderSections: PageBuilderSectionProps[] = []

    sections.forEach((section: any) => {
        const sectionId = section.__typename
            ? section.__typename.replace(AcfPageBuilderFieldName, '')
            : null

        if (sectionId) {
            pageBuilderSections.push({
                sectionId: sectionId,
                section: section,
            })
        }
    })
    return (
        <>
            {pageBuilderSections?.map(block => {
                // component does exist
                if (
                    typeof AcfPageBuilderComponents[block.sectionId] !==
                    'undefined'
                ) {
                    return React.createElement(
                        AcfPageBuilderComponents[block.sectionId],
                        {
                            key: uuidv4(),
                            attributes: block.section,
                        },
                    )
                }

                // component doesn't exist yet
                return (
                    <div key={uuidv4()} className='border p-4 my-2'>
                        The "{block.sectionId}" component was unavailable.
                    </div>
                )
            })}
        </>
    )
}

export default PageBuilder

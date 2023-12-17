import { SeoFragment } from '@/types/fragments/seo.type'
import { parseJSON } from '@/utils/parseJSON'

const SeoSchema = ({ seo }: SeoFragment) => {
    const schema = seo?.schema?.raw ? parseJSON(seo?.schema?.raw) : {}

    return (
        <script
            key='application-ldjson'
            type='application/ld+json'
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    )
}

export default SeoSchema

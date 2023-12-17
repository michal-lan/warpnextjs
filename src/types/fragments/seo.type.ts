export type SeoFragment = {
    __typename?: 'Page'
    seo?: SeoProps
}

export type SeoProps =
    | {
          __typename?: 'PostTypeSEO'
          metaDesc?: string | null
          metaKeywords?: string | null
          canonical?: string | null
          opengraphDescription?: string | null
          opengraphAuthor?: string | null
          opengraphTitle?: string | null
          opengraphUrl?: string | null
          title?: string | null
          breadcrumbs?: Array<{
              __typename?: 'SEOPostTypeBreadcrumbs'
              text?: string | null
              url?: string | null
          } | null> | null
          opengraphImage?: {
              __typename?: 'MediaItem'
              link?: string | null
          } | null
          schema?: {
              __typename?: 'SEOPostTypeSchema'
              raw?: string | null
          } | null
      }
    | null
    | undefined

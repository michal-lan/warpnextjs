import TemplateBlogArchive from '@/templates/blog-archive'
import TemplateBlogPost from '@/templates/blog-post'
import TemplatePage from '@/templates/page'

// assign all templates where key should be a post type name (if needed to preview)
export const Templates: any = {
    post: TemplateBlogPost,
    page: TemplatePage,
    blogArchive: TemplateBlogArchive,
}

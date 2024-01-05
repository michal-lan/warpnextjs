import ArchivePaginatedPage from '@/components/Blog/ArchivePaginatedPage'
import Container from '@/components/Container'
import SeoSchema from '@/components/SeoSchema'
import Wrapper from '@/components/Wrapper'

const TemplateBlogArchive = (props: any) => {
    const { data, posts, currentPage, totalPosts } = props

    return (
        <>
            <Wrapper>
                <Container>
                    <ArchivePaginatedPage
                        items={posts}
                        currentPage={currentPage}
                        totalItems={totalPosts}
                    />
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.seo} />
        </>
    )
}

export default TemplateBlogArchive

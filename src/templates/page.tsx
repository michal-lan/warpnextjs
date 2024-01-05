import Container from '@/components/Container'
import Content from '@/components/Content'
import SeoSchema from '@/components/SeoSchema'
import Wrapper from '@/components/Wrapper'

const TemplatePage = ({ data }: any) => {
    // in that way we are able to render content of page as gutenberg blocks (we are able to use ACF Blocks also here)
    // <Content value={data?.page?.content} />

    // if someone needs use blocks then should install "WPGraphQL Blocks" and then assign them similar way like pageBuilder (TODO: maybe build an example)
    // const blocks = data?.page?.blocks
    // console.log(blocks)

    // const pageBuilder = data?.page?.pageBuilder?.pageBuilder
    // console.log(pageBuilder)

    return (
        <>
            <Wrapper>
                <Container>
                    <div className='py-2 mb-4 w-full border-b border-gray-200 bg-white text-gray-400'>
                        {data?.title} - page single content
                    </div>

                    <Content value={data?.page?.content} />
                    {/* <PageBuilder sections={pageBuilder} /> */}

                    <p>Please add here some of design</p>
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.seo} />
        </>
    )
}

export default TemplatePage

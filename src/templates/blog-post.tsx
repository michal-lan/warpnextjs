import Container from '@/components/Container'
import Content from '@/components/Content'
import SeoSchema from '@/components/SeoSchema'
import Wrapper from '@/components/Wrapper'

const TemplateBlogPost = ({ data }: any) => {
    return (
        <>
            <Wrapper>
                <Container>
                    <article
                        key={data?.id}
                        className='flex max-w-xl flex-col items-start justify-between'
                    >
                        <div className='mx-auto max-w-2xl lg:mx-0 my-12'>
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                {data?.title}
                            </h2>

                            <div className='mt-2 text-lg leading-8 text-gray-600'>
                                <Content value={data?.content} />
                            </div>
                        </div>
                    </article>
                </Container>
            </Wrapper>
            <SeoSchema seo={data?.seo} />
        </>
    )
}

export default TemplateBlogPost

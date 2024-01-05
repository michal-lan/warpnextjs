import { PER_PAGE } from '@/constants/app'
import Pagination from '../Pagination'
import { ArchivePaginatedPageProps } from '@/types/pagination.type'
import Content from '../Content'

const ArchivePaginatedPage = ({
    currentPage,
    totalItems,
    items,
}: ArchivePaginatedPageProps): JSX.Element => {
    return (
        <>
            <div className='mx-auto max-w-2xl lg:mx-0 my-12'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    From the blog
                </h2>
                <p className='mt-2 text-lg leading-8 text-gray-600'>
                    Learn how to grow your business with our expert advice.
                </p>
            </div>
            <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                {items?.map(post => (
                    <article
                        key={post?.id}
                        className='flex max-w-xl flex-col items-start justify-between'
                    >
                        <div className='group relative'>
                            <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                                <a href={`/blog/${post?.slug}`}>
                                    <span className='absolute inset-0' />
                                    {post?.title}
                                </a>
                            </h3>

                            <div className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                                <Content value={post?.excerpt} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={PER_PAGE}
                renderPageLink={page => `/blog/page/${page}`}
                renderFirstPageLink={'/blog'}
            />
        </>
    )
}

export default ArchivePaginatedPage

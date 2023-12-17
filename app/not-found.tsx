import Wrapper from '@/components/Wrapper'
// import { Metadata } from 'next'

// Metadata is not supported in not-found file
// const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'http://localhost'
// export const metadata: Metadata = {
//     metadataBase: new URL(wordpressUrl),
//     title: 'Page not found',
//     openGraph: {
//         title: 'Page not found',
//         url: wordpressUrl,
//     },
// }

export default function NotFound() {
    return (
        <>
            <title>Page not found</title>
            <Wrapper>
                <div className='text-center py-12 px-6'>
                    <p className='text-base font-semibold text-indigo-600'>
                        404
                    </p>
                    <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                        Page not found
                    </h1>
                    <p className='mt-6 text-base leading-7 text-gray-600'>
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                        <a
                            href='/'
                            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Go back home
                        </a>
                        <a
                            href='#contact'
                            className='text-sm font-semibold text-gray-900'
                        >
                            Contact support{' '}
                            <span aria-hidden='true'>&rarr;</span>
                        </a>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

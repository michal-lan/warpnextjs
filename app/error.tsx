'use client' // Error components must be Client Components
import Container from '@/components/Container'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <Container className='py-12 md:py-16 '>
            <div className='text-center'>
                <p className='text-base font-semibold text-indigo-600'>
                    There was a problem
                </p>
                <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                    Something went wrong
                </h1>

                <p className='mt-6 text-base leading-7 text-gray-600'>
                    Please try again later or contact support if the problem
                    persists.
                </p>

                <p className='mt-6 text-base leading-7 text-gray-600 p-4 bg-gray-50 rounded-md'>
                    {error.message}
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <button
                        type='button'
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className='w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Try again
                    </button>

                    <a
                        href='#contact'
                        className='w-full text-sm font-semibold text-gray-900'
                    >
                        Contact support <span aria-hidden='true'>&rarr;</span>
                    </a>
                </div>
            </div>
        </Container>
    )
}

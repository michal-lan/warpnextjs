// Based on: https://github.com/vercel/examples/blob/main/solutions/pagination-with-ssg/components/Pagination.tsx#L14

import Link from 'next/link'
import React from 'react'
import { DOTTS } from '@/constants/app'
import usePagination from '@/hooks/usePagination'
import { PaginationProps } from '@/types/pagination.type'

const Pagination = ({
    totalItems,
    currentPage,
    itemsPerPage,
    renderPageLink,
    renderFirstPageLink,
}: PaginationProps) => {
    const pages = usePagination(totalItems, currentPage, itemsPerPage)

    return (
        <div className='flex items-center justify-center my-8'>
            {pages.map((pageNumber, i) =>
                pageNumber === DOTTS ? (
                    <span
                        key={i}
                        className='px-4 py-2 rounded-full text-sm font-semibold text-black'
                    >
                        {pageNumber}
                    </span>
                ) : (
                    <Link
                        key={i}
                        href={
                            pageNumber === 1
                                ? renderFirstPageLink
                                : renderPageLink(pageNumber as number)
                        }
                        className={`${
                            pageNumber === currentPage
                                ? 'text-indigo-600'
                                : 'text-black'
                        } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
                    >
                        {pageNumber}
                    </Link>
                ),
            )}
        </div>
    )
}

export default Pagination

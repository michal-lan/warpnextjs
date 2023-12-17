'use client'

import React, { useEffect, useState } from 'react'

const ProgressBar = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const loadingInterval = setInterval(() => {
            setProgress(prevProgress =>
                prevProgress >= 100 ? 0 : prevProgress + 10,
            )
        }, 600)

        return () => {
            clearInterval(loadingInterval)
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 w-full h-[3px] z-50 bg-gray-50'>
            <div
                className='h-full bg-blue-500 transition-[width] duration-500 ease-in-out'
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}

export default ProgressBar

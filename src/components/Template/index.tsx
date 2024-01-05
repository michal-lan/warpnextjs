import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Templates } from '@/constants/Templates'

const Template = (props: any) => {
    const { data, type } = props

    if (!data?.contentNode || !type) return null

    if (typeof Templates[type] === 'undefined') return null

    return React.createElement(Templates[type], {
        ...props,
        key: uuidv4(),
        data: data?.contentNode,
    })
}

export default Template

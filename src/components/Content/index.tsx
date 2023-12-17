const Content = ({ value }: { value: string }) => {
    return (
        <div
            className='content'
            dangerouslySetInnerHTML={{
                __html: value ?? '',
            }}
        />
    )
}

export default Content

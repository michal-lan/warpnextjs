type HeroProps = {
    attributes: {
        heading?: string
        description?: string
        ishidden?: boolean
    }
}

export default function Hero(props: HeroProps) {
    let configuration = {
        isHidden: props.attributes?.ishidden ?? false,
        heading: props?.attributes?.heading ?? '',
        description: props?.attributes?.description ?? '',
    }

    if (configuration.isHidden) return <></>

    return (
        <div className='min-h-[400px] flex flex-col justify-center items-center bg-slate-200 p-6'>
            <h2 className='text-2xl font-bold'>{configuration.heading}</h2>
            <div className='mt-3 text-base'>{configuration.description}</div>
        </div>
    )
}

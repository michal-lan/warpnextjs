export default function Container({ children, className = '' }: any) {
    return (
        <div className={`container px-6 lg:px-16 mx-auto ${className}`}>
            {children}
        </div>
    )
}

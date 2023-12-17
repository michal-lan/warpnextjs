import HeaderDefault from '@/components/Header/Default'
import FooterDefault from '@/components/Footer/Default'

const Wrapper = ({ children }: any) => {
    return (
        <>
            <HeaderDefault />
            <main>{children}</main>
            <FooterDefault />
        </>
    )
}

export default Wrapper

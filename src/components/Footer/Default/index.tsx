import getGlobalSettings from '@/lib/getGlobalSettings'
import FooterDefaultContent from './content'

const FooterDefault = async () => {
    const { footerMenuItems } = await getGlobalSettings()

    return <FooterDefaultContent footerMenuItems={footerMenuItems} />
}

export default FooterDefault

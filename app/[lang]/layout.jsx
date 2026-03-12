import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import themeConfig from '../../theme.config'
import logoDark from '../../assets/logo/kaidan-logo-spring-2026.svg'
import logoLight from '../../assets/logo/kaidan-logo-spring-2026-light.svg'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }]
}

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar logo={
    <>
      <Image src={logoDark} alt="logo" height={28} className="logo-light" />
      <Image src={logoLight} alt="logo" height={28} className="logo-dark" />
    </>
  }>
    <LocaleSwitch />
  </Navbar>
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params
  const pageMap = await getPageMap(`/${lang}`)

  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={pageMap}
      i18n={themeConfig.i18n}
      docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
      footer={footer}
    >
      {children}
    </Layout>
  )
}

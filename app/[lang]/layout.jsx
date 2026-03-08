import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import themeConfig from '../../theme.config'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }]
}

const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar logo={<b>Nextra</b>}>
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

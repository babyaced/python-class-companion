import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  unstable_shouldAddLocaleToLinks: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: 'dark-plus',
        light: 'light-plus',
      },
    },
  },
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      { source: '/en', destination: '/en/Overview', permanent: false },
      { source: '/zh', destination: '/zh/Overview', permanent: false },
      { source: '/en/Learn', destination: '/en/Learn/LearnOverview', permanent: false },
      { source: '/zh/Learn', destination: '/zh/Learn/LearnOverview', permanent: false },
      { source: '/en/Reference', destination: '/en/Reference/ReferenceOverview', permanent: false },
      { source: '/zh/Reference', destination: '/zh/Reference/ReferenceOverview', permanent: false },
    ]
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // emit JS so you can import the SVG as a component
      },
    },
  },
  env:{
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  }
})
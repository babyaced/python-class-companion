import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // Prefix locale to all sidebar/links for i18n (recommended instead of manual pageMap transform)
  unstable_shouldAddLocaleToLinks: true,
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
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
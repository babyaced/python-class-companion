/**
 * Nextra i18n middleware: redirects requests without a locale to the same path
 * with the user's preferred locale (cookie or Accept-Language).
 * See https://nextra.site/docs/guide/i18n
 */
export { middleware } from 'nextra/locales'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind).*)',
  ],
}

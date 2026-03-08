import { Head } from 'nextra/components'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  // Define your metadata here
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

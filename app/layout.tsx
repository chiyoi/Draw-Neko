import '@radix-ui/themes/styles.css'
import type { Metadata, Viewport } from 'next'

import { ChildrenProps } from './common/props'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Draw Neko',
  description: 'Draw a cute anime cat girl.',
  icons: {
    icon: '/icon.png',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FEF7FB' },
    { media: '(prefers-color-scheme: dark)', color: '#21121D' },
  ],
}

export default ({ children }: ChildrenProps) => (
  <html lang='en'>
    <ClientLayout>
      {children}
    </ClientLayout>
  </html>
)

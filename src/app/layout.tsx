import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import ClientProviders from './providers'
import '../index.css'

export const metadata: Metadata = {
  title: 'Simple Stack',
  description: 'Task board app',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}

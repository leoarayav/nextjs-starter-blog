import Navigation from '@/components/navigation'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nextblog',
  description: 'A starter blog template for Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='antialiased max-w-2xl mb-20 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto'>
          <main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
            <Navigation />
            {children}
          </main>
      </body>
    </html>
  )
}

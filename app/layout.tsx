import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kimaireviews.com'),
  title: {
    default: 'KimAI Reviews — Honest AI Tool Reviews',
    template: '%s | KimAI Reviews',
  },
  description:
    'In-depth, unbiased reviews of the best AI tools for writing, coding, image generation, productivity, and video. Find the right AI tool for you.',
  keywords: ['AI tools', 'AI reviews', 'ChatGPT review', 'Claude review', 'Midjourney review', 'AI writing tools', 'AI coding tools'],
  authors: [{ name: 'KimAI Reviews' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kimaireviews.com',
    siteName: 'KimAI Reviews',
    title: 'KimAI Reviews — Honest AI Tool Reviews',
    description: 'In-depth, unbiased reviews of the best AI tools.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KimAI Reviews — Honest AI Tool Reviews',
    description: 'In-depth, unbiased reviews of the best AI tools.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3488498466731854"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

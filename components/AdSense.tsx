'use client'

import Script from 'next/script'

// ──────────────────────────────────────────────────────────────────
// Google AdSense Integration
//
// HOW TO ACTIVATE:
// 1. Replace PUBLISHER_ID with your real ca-pub-XXXXXXXXXXXXXXXX
// 2. Uncomment <AdSense> in app/layout.tsx
// 3. Place <AdUnit slot="..." /> wherever you want ads
// ──────────────────────────────────────────────────────────────────

interface AdSenseProps {
  publisherId: string
}

export default function AdSense({ publisherId }: AdSenseProps) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

// ── Inline ad unit — place anywhere inside page content ──

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  return (
    <div className={`my-6 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

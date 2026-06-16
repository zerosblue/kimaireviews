'use client'

interface AffiliateButtonProps {
  href: string
  text?: string
  toolName?: string
  variant?: 'primary' | 'outline'
}

export default function AffiliateButton({
  href,
  text = 'Try It Free',
  toolName,
  variant = 'primary',
}: AffiliateButtonProps) {
  const handleClick = () => {
    // Analytics hook — replace with your GA4 / gtag event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'affiliate_click', {
        tool_name: toolName ?? 'unknown',
        destination_url: href,
      })
    }
  }

  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
  const styles =
    variant === 'primary'
      ? `${base} bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md`
      : `${base} border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={styles}
    >
      {text}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}

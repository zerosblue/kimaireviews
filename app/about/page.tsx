import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About KimAI Reviews — honest AI tool reviews from a developer who actually uses them.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About KimAI Reviews</h1>
      <p className="text-xl text-gray-500 mb-10">Honest AI tool reviews from a developer who actually uses them.</p>

      <div className="prose-like space-y-6 text-gray-700 leading-relaxed">
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who I Am</h2>
          <p>
            I&apos;m a Korean solo developer based in Seoul with 18+ years in CRM and Sales Operations. I discovered AI tools in 2022 and they fundamentally changed how I work. Claude is now my primary AI assistant — I use it daily for writing, coding, and problem-solving.
          </p>
          <p className="mt-3">
            This site exists because I got tired of reading marketing-speak reviews that never answered the real question: <strong>will this tool actually help me ship faster?</strong>
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">My Review Philosophy</h2>
          <ul className="space-y-2">
            {[
              'I test every tool personally before writing a word.',
              'Ratings are based on real workflows — not feature checklists.',
              'I disclose affiliate relationships clearly. My opinion stays mine.',
              'Negative experiences get written up, not buried.',
              'Pricing changes fast — I update reviews when tools change.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Disclosure</h2>
          <p>
            Some links on this site are affiliate links. If you click and buy, I may earn a small commission — at no extra cost to you. This never influences my ratings or recommendations. I only recommend tools I&apos;d genuinely use myself.
          </p>
        </section>

        <div className="text-center pt-4">
          <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Browse Reviews →
          </Link>
        </div>
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getReviewsByCategory, CATEGORIES, CATEGORY_COLORS } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import type { Category } from '@/lib/reviews'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.toLowerCase() }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = CATEGORIES.find(c => c.toLowerCase() === slug)
  if (!name) return {}
  return {
    title: `Best ${name} AI Tools`,
    description: `In-depth reviews of the best AI tools for ${name.toLowerCase()}. Compare features, pricing, and performance.`,
  }
}

const CATEGORY_EMOJI: Record<Category, string> = {
  Writing: '✍️', Coding: '💻', Image: '🎨', Productivity: '⚡', Video: '🎬',
}

const CATEGORY_DESCRIPTION: Record<Category, string> = {
  Writing: 'AI writing assistants, grammar checkers, and content generators.',
  Coding: 'AI coding assistants, code completion, and developer productivity tools.',
  Image: 'AI image generators, editors, and creative tools.',
  Productivity: 'AI-powered task management, note-taking, and workflow automation.',
  Video: 'AI video creation, editing, and production tools.',
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const name = CATEGORIES.find(c => c.toLowerCase() === slug) as Category | undefined
  if (!name) notFound()

  const reviews = getReviewsByCategory(name)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{CATEGORY_EMOJI[name]}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${CATEGORY_COLORS[name]}`}>{name}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{name} AI Tools</h1>
        <p className="text-gray-500 max-w-xl">{CATEGORY_DESCRIPTION[name]}</p>
      </div>

      {/* AdSense placeholder */}
      {/* <AdUnit slot="YOUR_SLOT_ID_HERE" /> */}

      {reviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {reviews.map(review => (
              <ReviewCard key={review.slug} review={review} featured />
            ))}
          </div>
          <p className="text-sm text-gray-400 text-center">{reviews.length} review{reviews.length !== 1 ? 's' : ''} in {name}</p>
        </>
      ) : (
        <div className="py-20 text-center text-gray-400">
          <div className="text-5xl mb-4">{CATEGORY_EMOJI[name]}</div>
          <p className="text-lg font-medium">No {name} reviews yet</p>
          <p className="text-sm mt-1">Check back soon — reviews are on the way!</p>
        </div>
      )}
    </div>
  )
}

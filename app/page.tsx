import Link from 'next/link'
import { getAllReviews, getFeaturedReviews, CATEGORIES, CATEGORY_COLORS } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import type { Category } from '@/lib/reviews'

export default function HomePage() {
  const featured = getFeaturedReviews(3)
  const recent = getAllReviews().slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            Honest · In-Depth · Unbiased
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Find the Right<br />AI Tool for You
          </h1>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-8">
            We test and review the best AI tools — writing, coding, image generation, productivity, and video — so you don&apos;t have to guess.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-all border border-white/20"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* AdSense placeholder — top of page */}
        <div className="my-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-24 flex items-center justify-center text-gray-400 text-sm">
          Advertisement — Replace with AdUnit slot
        </div>

        {/* Featured Reviews */}
        {featured.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Reviews</h2>
              <Link href="/category/writing" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map(review => (
                <ReviewCard key={review.slug} review={review} featured />
              ))}
            </div>
          </section>
        )}

        {/* Categories grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => {
              const emoji: Record<Category, string> = {
                Writing: '✍️', Coding: '💻', Image: '🎨', Productivity: '⚡', Video: '🎬',
              }
              return (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{emoji[cat]}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat]}`}>{cat}</span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Recent Reviews */}
        {recent.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Reviews</h2>
            <div className="space-y-3">
              {recent.map(review => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          </section>
        )}

        {/* AdSense placeholder — bottom of page */}
        <div className="mb-10 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-24 flex items-center justify-center text-gray-400 text-sm">
          Advertisement — Replace with AdUnit slot
        </div>

        {recent.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-lg font-medium">Reviews coming soon!</p>
            <p className="text-sm mt-1">Add MDX files to <code className="bg-gray-100 px-1 rounded">content/reviews/</code> to get started.</p>
          </div>
        )}
      </div>
    </>
  )
}

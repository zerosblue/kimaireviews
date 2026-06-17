import type { Metadata } from 'next'
import { getAllReviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'

export const metadata: Metadata = {
  title: 'All AI Tool Reviews',
  description: 'Browse all AI tool reviews on KimAI Reviews — sorted by latest.',
}

export default function AllReviewsPage() {
  const reviews = getAllReviews()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">All Reviews</h1>
        <p className="text-gray-500">{reviews.length} reviews — sorted by latest</p>
      </div>

      <div className="space-y-3">
        {reviews.map((review, i) => (
          <div key={review.slug} className="flex items-center gap-3">
            <span className="text-sm text-gray-300 w-6 text-right flex-shrink-0">{i + 1}</span>
            <div className="flex-1">
              <ReviewCard review={review} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

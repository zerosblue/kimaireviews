import Link from 'next/link'
import type { Review } from '@/lib/reviews'
import StarRating from './StarRating'
import CategoryBadge from './CategoryBadge'

interface ReviewCardProps {
  review: Review
  featured?: boolean
}

export default function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const { slug, title, description, date, category, rating, readingTime } = review

  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/reviews/${slug}`} className="group block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200 overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-36 flex items-center justify-center">
          <span className="text-5xl">🤖</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={category} />
            <span className="text-xs text-gray-400">{readingTime}</span>
          </div>
          <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors mb-1 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <StarRating rating={rating} size="sm" />
            <time className="text-xs text-gray-400">{formatted}</time>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/reviews/${slug}`} className="group flex gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🤖</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CategoryBadge category={category} />
          <span className="text-xs text-gray-400">{readingTime}</span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <StarRating rating={rating} size="sm" />
          <time className="text-xs text-gray-400">{formatted}</time>
        </div>
      </div>
    </Link>
  )
}

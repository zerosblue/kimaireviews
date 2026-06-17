import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllReviews, getReviewBySlug } from '@/lib/reviews'
import StarRating from '@/components/StarRating'
import CategoryBadge from '@/components/CategoryBadge'
import AffiliateButton from '@/components/AffiliateButton'
import { AdUnit } from '@/components/AdSense'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllReviews().map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const review = getReviewBySlug(slug)
  if (!review) return {}
  return {
    title: review.title,
    description: review.description,
    openGraph: {
      title: review.title,
      description: review.description,
      type: 'article',
      publishedTime: review.date,
    },
  }
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const review = getReviewBySlug(slug)
  if (!review) notFound()

  const {
    title, description, date, category, rating, readingTime,
    pros, cons, affiliateUrl, affiliateText, toolWebsite, pricingModel, content,
  } = review

  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/" className="hover:text-indigo-600">Home</a>
        <span className="mx-2">/</span>
        <a href={`/category/${category.toLowerCase()}`} className="hover:text-indigo-600">{category}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={category} linked />
          {pricingModel && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">{pricingModel}</span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">{title}</h1>
        <p className="text-gray-500 text-lg mb-4">{description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <time dateTime={date}>{formatted}</time>
          <span>·</span>
          <span>{readingTime}</span>
          <span>·</span>
          <StarRating rating={rating} size="sm" />
        </div>
      </header>

      {/* AdSense — top of article */}
      {/* <AdUnit slot="YOUR_SLOT_ID_HERE" /> */}
      <div className="mb-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-20 flex items-center justify-center text-gray-400 text-sm">
        Advertisement — activate AdUnit when AdSense approved
      </div>

      {/* Score card */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-indigo-600 leading-none">{rating.toFixed(1)}</div>
            <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
            <StarRating rating={rating} size="lg" showNumber={false} />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-green-700 mb-2 text-sm flex items-center gap-1">
                <span>✓</span> Pros
              </h3>
              <ul className="space-y-1">
                {pros.map((p, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-600 mb-2 text-sm flex items-center gap-1">
                <span>✗</span> Cons
              </h3>
              <ul className="space-y-1">
                {cons.map((c, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        {affiliateUrl && (
          <div className="mt-5 pt-5 border-t border-indigo-100 flex flex-wrap items-center gap-3">
            <AffiliateButton href={affiliateUrl} text={affiliateText ?? 'Try It Free'} toolName={title} />
            {toolWebsite && (
              <a href={toolWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-indigo-600 underline">
                Visit official site
              </a>
            )}
          </div>
        )}
      </div>

      {/* MDX Content */}
      <div className="review-prose">
        <MDXRemote source={content} components={{ AffiliateButton }} />
      </div>

      {/* AdSense — end of article */}
      {/* <AdUnit slot="YOUR_SLOT_ID_HERE" /> */}
      <div className="mt-10 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-20 flex items-center justify-center text-gray-400 text-sm">
        Advertisement — activate AdUnit when AdSense approved
      </div>

      {/* Bottom CTA */}
      {affiliateUrl && (
        <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-center text-white">
          <p className="font-semibold text-lg mb-1">Ready to try {title.split(':')[0]}?</p>
          <p className="text-indigo-200 text-sm mb-4">Join thousands of users already using this tool.</p>
          <AffiliateButton href={affiliateUrl} text={affiliateText ?? 'Get Started Free'} toolName={title} variant="outline" />
          <p className="text-xs text-indigo-300 mt-3">Affiliate link — we may earn a small commission at no cost to you.</p>
        </div>
      )}
    </article>
  )
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Category } from './constants'

export type { Category }
export { CATEGORIES, CATEGORY_COLORS } from './constants'

export interface ReviewFrontmatter {
  title: string
  description: string
  date: string
  category: Category
  rating: number
  pros: string[]
  cons: string[]
  affiliateUrl?: string
  affiliateText?: string
  image?: string
  featured?: boolean
  toolWebsite?: string
  pricingModel?: string
}

export interface Review extends ReviewFrontmatter {
  slug: string
  readingTime: string
  content: string
}

const reviewsDir = path.join(process.cwd(), 'posts')

export function getAllReviews(): Review[] {
  if (!fs.existsSync(reviewsDir)) return []
  const files = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(reviewsDir, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        ...(data as ReviewFrontmatter),
        readingTime: readingTime(content).text,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getReviewBySlug(slug: string): Review | null {
  const filePath = path.join(reviewsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    ...(data as ReviewFrontmatter),
    readingTime: readingTime(content).text,
    content,
  }
}

export function getReviewsByCategory(category: string): Review[] {
  return getAllReviews().filter(
    r => r.category.toLowerCase() === category.toLowerCase()
  )
}

export function getFeaturedReviews(limit = 3): Review[] {
  const all = getAllReviews()
  const featured = all.filter(r => r.featured)
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit)
}

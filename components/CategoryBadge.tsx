import Link from 'next/link'
import type { Category } from '@/lib/reviews'
import { CATEGORY_COLORS } from '@/lib/reviews'

interface CategoryBadgeProps {
  category: Category
  linked?: boolean
}

export default function CategoryBadge({ category, linked = false }: CategoryBadgeProps) {
  const cls = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[category]}`

  if (linked) {
    return (
      <Link href={`/category/${category.toLowerCase()}`} className={`${cls} hover:opacity-80 transition-opacity`}>
        {category}
      </Link>
    )
  }

  return <span className={cls}>{category}</span>
}

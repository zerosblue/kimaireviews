export type Category = 'Writing' | 'Coding' | 'Image' | 'Productivity' | 'Video'

export const CATEGORIES: Category[] = ['Writing', 'Coding', 'Image', 'Productivity', 'Video']

export const CATEGORY_COLORS: Record<Category, string> = {
  Writing: 'bg-blue-100 text-blue-800',
  Coding: 'bg-green-100 text-green-800',
  Image: 'bg-purple-100 text-purple-800',
  Productivity: 'bg-orange-100 text-orange-800',
  Video: 'bg-red-100 text-red-800',
}

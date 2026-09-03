import { Link } from 'react-router-dom'

import type { Category } from '../content/categories'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link className="category-card" to={`/guide/${category.slug}`}>
      <span className="category-card__number" aria-hidden="true">{category.accent}</span>
      <span className="category-card__copy">
        <span className="category-card__english">{category.englishName}</span>
        <strong>{category.name}</strong>
        <span className="category-card__description">{category.description}</span>
      </span>
      <span className="category-card__arrow" aria-hidden="true">↗</span>
    </Link>
  )
}

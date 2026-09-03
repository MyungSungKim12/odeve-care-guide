import { Link } from 'react-router-dom'

import { categories } from '../content/categories'

export function HomePage() {
  return (
    <main>
      <h1>오더브 시술 안내</h1>
      <nav aria-label="시술 카테고리">
        {categories.map((category) => (
          <Link key={category.slug} to={`/guide/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </main>
  )
}

import { useParams } from 'react-router-dom'

import { getCategoryBySlug } from '../content/categories'
import { NotFoundPage } from './NotFoundPage'

export function GuidePage() {
  const { slug = '' } = useParams()
  const category = getCategoryBySlug(slug)

  if (!category) {
    return <NotFoundPage />
  }

  return (
    <main>
      <h1>{category.name}</h1>
    </main>
  )
}

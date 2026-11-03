import { describe, expect, it } from 'vitest'

import { categories, getCategoryBySlug } from './categories'

describe('care guide categories', () => {
  it('keeps only the three customer-facing categories in display order', () => {
    expect(categories.map((category) => category.slug)).toEqual([
      'brow',
      'lip',
      'eyeline',
    ])
  })

  it('uses the supplied before, after, and retouch images for every category', () => {
    expect(categories.map((category) => ({
      slug: category.slug,
      sections: category.sections.map((section) => ({ id: section.id, src: section.images[0]?.src })),
    }))).toEqual([
      {
        slug: 'brow',
        sections: [
          { id: 'before', src: '/images/brow-before.jpg' },
          { id: 'after', src: '/images/brow-after.jpg' },
          { id: 'retouch', src: '/images/brow-retouch.jpg' },
        ],
      },
      {
        slug: 'lip',
        sections: [
          { id: 'before', src: '/images/lip-before.jpg' },
          { id: 'after', src: '/images/lip-after.jpg' },
          { id: 'retouch', src: '/images/lip-retouch.jpg' },
        ],
      },
      {
        slug: 'eyeline',
        sections: [
          { id: 'before', src: '/images/eyeline-before.jpg' },
          { id: 'after', src: '/images/eyeline-after.jpg' },
          { id: 'retouch', src: '/images/eyeline-retouch.jpg' },
        ],
      },
    ])
  })

  it('returns undefined for an unknown direct URL', () => {
    expect(getCategoryBySlug('missing')).toBeUndefined()
  })
})

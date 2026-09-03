import { describe, expect, it } from 'vitest'

import { categories, getCategoryBySlug } from './categories'

describe('care guide categories', () => {
  it('keeps the five customer-facing categories in display order', () => {
    expect(categories.map((category) => category.slug)).toEqual([
      'brow',
      'smp',
      'eyeline',
      'lip',
      'remove',
    ])
  })

  it('includes every lip care section in the intended order', () => {
    expect(getCategoryBySlug('lip')?.sections.map((section) => section.id)).toEqual([
      'before',
      'after',
      'balm',
      'healing',
      'result',
    ])
  })

  it('returns undefined for an unknown direct URL', () => {
    expect(getCategoryBySlug('missing')).toBeUndefined()
  })
})

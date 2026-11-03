export type ImageAspect = 'square' | 'portrait'

export interface GuideImageData {
  src: string
  alt: string
  aspect: ImageAspect
}

export interface GuideSection {
  id: string
  label: string
  eyebrow: string
  images: GuideImageData[]
}

export interface Category {
  slug: string
  name: string
  englishName: string
  accent: string
  sections: GuideSection[]
}

export const categories: Category[] = [
  {
    slug: 'brow',
    name: '눈썹',
    englishName: 'Brow',
    accent: '01',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/brow-before.jpg', alt: '눈썹 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/brow-after.jpg', alt: '눈썹 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'retouch',
        label: '리터치 안내',
        eyebrow: 'Retouch care',
        images: [{ src: '/images/brow-retouch.jpg', alt: '눈썹 리터치 안내사항', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'lip',
    name: '입술',
    englishName: 'Lip',
    accent: '02',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/lip-before.jpg', alt: '입술 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/lip-after.jpg', alt: '입술 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'retouch',
        label: '리터치 안내',
        eyebrow: 'Retouch care',
        images: [{ src: '/images/lip-retouch.jpg', alt: '입술 리터치 안내사항', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'eyeline',
    name: '아이라인',
    englishName: 'Eyeline',
    accent: '03',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/eyeline-before.jpg', alt: '아이라인 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/eyeline-after.jpg', alt: '아이라인 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'retouch',
        label: '리터치 안내',
        eyebrow: 'Retouch care',
        images: [{ src: '/images/eyeline-retouch.jpg', alt: '아이라인 리터치 안내사항', aspect: 'square' }],
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

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
  description: string
  accent: string
  sections: GuideSection[]
}

export const categories: Category[] = [
  {
    slug: 'brow',
    name: '눈썹',
    englishName: 'Brow',
    description: '자연스러운 눈썹을 위한 시술 전·후 관리',
    accent: '01',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/brow-before.png', alt: '눈썹 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/brow-after.png', alt: '눈썹 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'lash',
        label: '속눈썹 영양제',
        eyebrow: 'Lash care',
        images: [{ src: '/images/lash-addict.png', alt: '래쉬애딕트 속눈썹 영양제 안내사항', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'scalp',
    name: '두피',
    englishName: 'Scalp',
    description: '두피 시술의 착색과 회복을 위한 관리',
    accent: '02',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/scalp-before.png', alt: '두피 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/scalp-after.png', alt: '두피 시술 후 안내사항', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'eyeline',
    name: '아이라인',
    englishName: 'Eyeline',
    description: '선명한 라인을 오래 유지하기 위한 관리',
    accent: '03',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/eyeline-before.png', alt: '아이라인 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/eyeline-after.png', alt: '아이라인 시술 후 안내사항', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'lip',
    name: '입술',
    englishName: 'Lip',
    description: '입술 시술 준비부터 회복 과정까지 한눈에',
    accent: '04',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/lip-before.png', alt: '입술 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/lip-after.png', alt: '입술 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'balm',
        label: '추천 립밤',
        eyebrow: 'Recommended care',
        images: [{ src: '/images/lip-balm.jpg', alt: '오더브 추천 립밤 네 가지', aspect: 'square' }],
      },
      {
        id: 'healing',
        label: '회복 과정',
        eyebrow: 'Healing process',
        images: [{ src: '/images/lip-healing.jpg', alt: '입술 시술 후 한 달간 회복 과정', aspect: 'portrait' }],
      },
      {
        id: 'result',
        label: '전후 사진',
        eyebrow: 'Before & after',
        images: [{ src: '/images/lip-result.png', alt: '입술 시술 전과 탈각 후 리터치 전 비교', aspect: 'square' }],
      },
    ],
  },
  {
    slug: 'remove',
    name: '잔흔 제거',
    englishName: 'Pigment removal',
    description: '잔흔·앰플 제거 전후에 꼭 필요한 관리',
    accent: '05',
    sections: [
      {
        id: 'before',
        label: '시술 전',
        eyebrow: 'Before care',
        images: [{ src: '/images/remove-before.png', alt: '잔흔 제거 시술 전 안내사항', aspect: 'square' }],
      },
      {
        id: 'after',
        label: '시술 후',
        eyebrow: 'After care',
        images: [{ src: '/images/remove-after.png', alt: '잔흔 제거 시술 후 안내사항', aspect: 'square' }],
      },
      {
        id: 'ampoule',
        label: '앰플 제거 후',
        eyebrow: 'Ampoule after care',
        images: [{ src: '/images/remove-ampoule-after.png', alt: '앰플 제거 시술 후 안내사항', aspect: 'square' }],
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

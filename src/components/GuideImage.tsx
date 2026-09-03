import { useState } from 'react'

import type { GuideImageData } from '../content/categories'

interface GuideImageProps {
  image: GuideImageData
  onOpen: (image: GuideImageData) => void
}

export function GuideImage({ image, onOpen }: GuideImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <p className="guide-image__error" role="status">이미지를 불러오지 못했습니다.</p>
  }

  return (
    <button
      className={`guide-image guide-image--${image.aspect}`}
      type="button"
      aria-label={`${image.alt} 크게 보기`}
      onClick={() => onOpen(image)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      <span className="guide-image__hint" aria-hidden="true">눌러서 크게 보기</span>
    </button>
  )
}

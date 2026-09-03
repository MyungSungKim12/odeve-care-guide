import { useEffect } from 'react'

import type { GuideImageData } from '../content/categories'

interface ImageLightboxProps {
  image: GuideImageData
  onClose: () => void
}

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 크게 보기"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose()
      }}
    >
      <button className="lightbox__close" type="button" onClick={onClose} aria-label="확대 이미지 닫기">
        <span aria-hidden="true">×</span>
      </button>
      <div className="lightbox__stage">
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  )
}

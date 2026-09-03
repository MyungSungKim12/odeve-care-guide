import { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { BrandHeader } from '../components/BrandHeader'
import { GuideImage } from '../components/GuideImage'
import { ImageLightbox } from '../components/ImageLightbox'
import { SectionTabs } from '../components/SectionTabs'
import type { GuideImageData } from '../content/categories'
import { getCategoryBySlug } from '../content/categories'
import { NotFoundPage } from './NotFoundPage'

export function GuidePage() {
  const { slug = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const category = getCategoryBySlug(slug)
  const [openImage, setOpenImage] = useState<GuideImageData | null>(null)
  const closeLightbox = useCallback(() => setOpenImage(null), [])

  if (!category) {
    return <NotFoundPage />
  }

  const requestedId = location.hash.slice(1)
  const activeSection = category.sections.find((section) => section.id === requestedId) ?? category.sections[0]

  return (
    <div className="site-shell">
      <BrandHeader compact />
      <main className="guide-page">
        <Link className="back-link" to="/" aria-label="카테고리 목록으로 돌아가기">
          <span aria-hidden="true">←</span> 전체 안내
        </Link>
        <header className="guide-heading">
          <p className="eyebrow">{category.englishName}</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </header>
        <SectionTabs
          sections={category.sections}
          activeId={activeSection.id}
          onSelect={(id) => {
            setOpenImage(null)
            navigate({ pathname: location.pathname, hash: id })
          }}
        />
        <section
          className="guide-panel"
          id={`panel-${activeSection.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeSection.id}`}
        >
          <div className="guide-panel__heading">
            <span>{activeSection.eyebrow}</span>
            <h2>{activeSection.label} 안내사항</h2>
          </div>
          <div className="guide-images">
            {activeSection.images.map((image) => (
              <GuideImage key={image.src} image={image} onOpen={setOpenImage} />
            ))}
          </div>
        </section>
      </main>
      {openImage ? <ImageLightbox image={openImage} onClose={closeLightbox} /> : null}
    </div>
  )
}

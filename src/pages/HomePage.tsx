import { BrandHeader } from '../components/BrandHeader'
import { CategoryCard } from '../components/CategoryCard'
import { LocationMap } from '../components/LocationMap'
import { categories } from '../content/categories'

export function HomePage() {
  return (
    <div className="site-shell">
      <BrandHeader />
      <main className="home-page">
        <section className="home-hero" aria-labelledby="home-title">
          <p className="eyebrow">Care guide</p>
          <h1 id="home-title">시술 전·후 안내</h1>
        </section>
        <nav className="category-grid" aria-label="시술 카테고리">
          {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
        </nav>
        <LocationMap />
        <p className="home-note">궁금한 점은 예약 전 오더브로 문의해 주세요.</p>
        <div className="social-footer">
          <a
            className="instagram-link"
            href="https://www.instagram.com/odeve_beauty?obrf=MXd2d3piNnZwcDZyOA=="
            target="_blank"
            rel="noreferrer"
            aria-label="오더브 인스타그램 방문"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.25" cy="6.75" r="1" className="instagram-link__dot" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  )
}

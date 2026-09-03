import { BrandHeader } from '../components/BrandHeader'
import { CategoryCard } from '../components/CategoryCard'
import { categories } from '../content/categories'

export function HomePage() {
  return (
    <div className="site-shell">
      <BrandHeader />
      <main className="home-page">
        <section className="home-hero" aria-labelledby="home-title">
          <p className="eyebrow">Care guide</p>
          <h1 id="home-title">시술 전·후 안내</h1>
          <p className="home-hero__description">
            방문 전 준비부터 시술 후 관리까지,<br className="mobile-break" /> 필요한 내용을 확인해 주세요.
          </p>
        </section>
        <nav className="category-grid" aria-label="시술 카테고리">
          {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
        </nav>
        <p className="home-note">궁금한 점은 예약 전 오더브로 문의해 주세요.</p>
      </main>
    </div>
  )
}

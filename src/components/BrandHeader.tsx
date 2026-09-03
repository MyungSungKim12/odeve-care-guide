import { Link } from 'react-router-dom'

interface BrandHeaderProps {
  compact?: boolean
}

export function BrandHeader({ compact = false }: BrandHeaderProps) {
  return (
    <header className={compact ? 'brand-header brand-header--compact' : 'brand-header'}>
      <Link className="brand-header__link" to="/" aria-label="오더브 시술 안내 홈">
        <span className="brand-header__wordmark">odéve</span>
        <span className="brand-header__meta">오더브 뷰티 · @odeve_beauty</span>
      </Link>
    </header>
  )
}

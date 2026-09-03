import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없어요</h1>
      <p>주소가 변경되었거나 존재하지 않는 안내입니다.</p>
      <Link className="primary-link" to="/">카테고리로 돌아가기</Link>
    </main>
  )
}

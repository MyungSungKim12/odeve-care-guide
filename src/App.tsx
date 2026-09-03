import { Route, Routes } from 'react-router-dom'

import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guide/:slug" element={<GuidePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

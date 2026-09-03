import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { GuidePage } from '../pages/GuidePage'

function renderLipGuide(initialEntry = '/guide/lip') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/guide/:slug" element={<GuidePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('guide interactions', () => {
  it('switches from before care to after care with an accessible tab', async () => {
    const user = userEvent.setup()
    renderLipGuide()

    expect(screen.getByRole('img', { name: '입술 시술 전 안내사항' })).toBeVisible()
    await user.click(screen.getByRole('tab', { name: '시술 후' }))

    expect(screen.getByRole('tab', { name: '시술 후' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('img', { name: '입술 시술 후 안내사항' })).toBeVisible()
    expect(screen.queryByRole('img', { name: '입술 시술 전 안내사항' })).not.toBeInTheDocument()
  })

  it('opens the current image and closes it with Escape', async () => {
    const user = userEvent.setup()
    renderLipGuide('/guide/lip#result')

    await user.click(screen.getByRole('button', { name: '입술 시술 전과 탈각 후 리터치 전 비교 크게 보기' }))
    expect(screen.getByRole('dialog', { name: '이미지 크게 보기' })).toBeVisible()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('offers a readable fallback when an image cannot load', () => {
    renderLipGuide('/guide/lip#balm')

    const image = screen.getByRole('img', { name: '오더브 추천 립밤 네 가지' })
    fireEvent.error(image)

    expect(screen.getByText('이미지를 불러오지 못했습니다.')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('application routes', () => {
  it('renders the selected guide from a direct URL', () => {
    render(
      <MemoryRouter initialEntries={['/guide/lip']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '입술' })).toBeInTheDocument()
  })

  it('keeps guide details focused on the original image without repeated Korean copy', () => {
    render(
      <MemoryRouter initialEntries={['/guide/scalp']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.queryByText('두피 시술의 착색과 회복을 위한 관리')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '시술 전 안내사항' })).not.toBeInTheDocument()
    expect(screen.getByText('Before care')).toBeInTheDocument()
  })

  it('shows a recovery page for an unknown guide URL', () => {
    render(
      <MemoryRouter initialEntries={['/guide/unknown']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없어요' })).toBeInTheDocument()
  })
})

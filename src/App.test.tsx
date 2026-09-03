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

  it('shows a recovery page for an unknown guide URL', () => {
    render(
      <MemoryRouter initialEntries={['/guide/unknown']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없어요' })).toBeInTheDocument()
  })
})

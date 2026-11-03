import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('application routes', () => {
  it('links to the Odeve Instagram profile from the home page footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    const instagramLink = screen.getByRole('link', { name: '오더브 인스타그램 방문' })

    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/odeve_beauty?obrf=MXd2d3piNnZwcDZyOA==',
    )
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noreferrer')
  })

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
      <MemoryRouter initialEntries={['/guide/brow']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.queryByText('자연스러운 눈썹을 위한 시술 전·후 관리')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '시술 전 안내사항' })).not.toBeInTheDocument()
    expect(screen.getByText('Before care')).toBeInTheDocument()
  })

  it('does not expose removed scalp and pigment removal guides', () => {
    render(
      <MemoryRouter initialEntries={['/guide/scalp']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없어요' })).toBeInTheDocument()
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

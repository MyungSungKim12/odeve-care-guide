import type { GuideSection } from '../content/categories'

interface SectionTabsProps {
  sections: GuideSection[]
  activeId: string
  onSelect: (id: string) => void
}

export function SectionTabs({ sections, activeId, onSelect }: SectionTabsProps) {
  return (
    <div className="section-tabs" role="tablist" aria-label="안내 종류">
      {sections.map((section) => (
        <button
          className="section-tabs__tab"
          id={`tab-${section.id}`}
          key={section.id}
          type="button"
          role="tab"
          aria-selected={section.id === activeId}
          aria-controls={`panel-${section.id}`}
          tabIndex={section.id === activeId ? 0 : -1}
          onClick={() => onSelect(section.id)}
        >
          {section.label}
        </button>
      ))}
    </div>
  )
}

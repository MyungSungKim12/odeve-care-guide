# 오더브 시술 안내 웹사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 고객이 모든 주요 휴대폰과 태블릿에서 카테고리별 원본 시술 전·후 안내 이미지를 편하게 확인할 수 있는 Vercel 배포용 웹사이트를 만든다.

**Architecture:** Vite 기반 React 단일 페이지 앱에서 콘텐츠 정보를 타입이 있는 데이터로 관리하고 React Router로 홈·카테고리·404 화면을 분리한다. 원본 사진은 정적 자산으로 제공하고, 접근 가능한 탭과 이미지 확대 모달을 작은 독립 컴포넌트로 구성한다.

**Tech Stack:** React 19, TypeScript 6, Vite 8, React Router 7, Vitest 4, Testing Library 16, ESLint 10, CSS

**Spec:** `docs/superpowers/specs/2026-09-03-odeve-care-guide-design.md`

## Global Constraints

- 원본 안내 이미지 15장의 픽셀 내용은 편집하지 않는다.
- 320px 스마트폰부터 1280px 이상 태블릿·데스크톱까지 가로 스크롤 없이 대응한다.
- iOS·Android 카카오톡 인앱 브라우저, Safari, Chrome에서 터치 가능한 최소 영역을 44px로 유지한다.
- 서버, 데이터베이스, 로그인, 관리자 기능은 만들지 않는다.
- 최종 ZIP에는 `node_modules`, `dist`, `.git`을 포함하지 않는다.

---

### Task 1: 프로젝트 기반과 정적 자산

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `public/images/*`

**Interfaces:**
- Produces: `npm run dev`, `npm run test`, `npm run lint`, `npm run build` 명령과 `/images/<semantic-name>` 정적 URL

- [ ] **Step 1: 생성 파일과 의존성 목록을 확정한다**

`package.json` scripts를 아래 계약으로 작성한다.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Vite·TypeScript·Vitest 설정을 작성한다**

`vite.config.ts`에 React 플러그인과 jsdom 테스트 환경, `src/test/setup.ts` 설정을 연결한다.

```ts
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
})
```

- [ ] **Step 3: 원본 이미지를 의미 있는 이름으로 복사한다**

`brow-before.png`, `brow-after.png`, `scalp-before.png`, `scalp-after.png`, `lash-addict.png`, `eyeline-before.png`, `eyeline-after.png`, `lip-before.png`, `lip-after.png`, `lip-balm.jpg`, `lip-healing.jpg`, `lip-result.png`, `remove-before.png`, `remove-after.png`, `remove-ampoule-after.png`로 복사하며 원본 해시와 복사본 해시가 일치하는지 확인한다.

- [ ] **Step 4: 의존성을 설치하고 빈 앱 빌드를 확인한다**

Run: `npm install && npm run build`

Expected: TypeScript와 Vite가 exit code 0으로 `dist`를 만든다.

- [ ] **Step 5: 커밋한다**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json eslint.config.js index.html src public
git commit -m "chore: scaffold responsive care guide"
```

### Task 2: 콘텐츠 데이터와 라우팅

**Files:**
- Create: `src/content/categories.ts`
- Create: `src/content/categories.test.ts`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`

**Interfaces:**
- Produces: `GuideImage`, `GuideSection`, `Category`, `categories`, `getCategoryBySlug(slug: string): Category | undefined`
- Produces: `/`, `/guide/:slug`, `*` 라우트

- [ ] **Step 1: 콘텐츠 매핑 실패 테스트를 작성한다**

```ts
expect(categories.map((category) => category.slug)).toEqual([
  'brow', 'scalp', 'eyeline', 'lip', 'remove',
])
expect(getCategoryBySlug('lip')?.sections.map((section) => section.id)).toEqual([
  'before', 'after', 'balm', 'healing', 'result',
])
expect(getCategoryBySlug('missing')).toBeUndefined()
```

- [ ] **Step 2: 테스트가 모듈 부재로 실패하는지 확인한다**

Run: `npm test -- src/content/categories.test.ts`

Expected: `categories` 모듈을 찾을 수 없어 FAIL.

- [ ] **Step 3: 콘텐츠 타입과 다섯 카테고리 매핑을 구현한다**

각 섹션은 `{ id, label, eyebrow, images }`를 가지고, 각 이미지는 `{ src, alt, aspect }`를 갖는다. 입술과 잔흔 제거의 추가 안내도 동일한 섹션 모델로 표현한다.

- [ ] **Step 4: 콘텐츠 테스트 통과를 확인한다**

Run: `npm test -- src/content/categories.test.ts`

Expected: 3 assertions PASS.

- [ ] **Step 5: 라우팅 실패 테스트를 작성한다**

```tsx
render(<MemoryRouter initialEntries={['/guide/lip']}><App /></MemoryRouter>)
expect(screen.getByRole('heading', { name: '입술' })).toBeInTheDocument()

render(<MemoryRouter initialEntries={['/guide/unknown']}><App /></MemoryRouter>)
expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없어요' })).toBeInTheDocument()
```

- [ ] **Step 6: 테스트가 페이지 컴포넌트 부재로 실패하는지 확인한다**

Run: `npm test -- src/App.test.tsx`

Expected: 라우트에 필요한 화면이 없어 FAIL.

- [ ] **Step 7: 홈·상세·404 라우트 골격을 구현한다**

`App`은 `Routes`만 소유하고 실제 화면은 `src/pages` 컴포넌트를 사용하도록 경계를 둔다.

- [ ] **Step 8: 라우팅 테스트 통과를 확인하고 커밋한다**

Run: `npm test -- src/content/categories.test.ts src/App.test.tsx`

Expected: 모든 테스트 PASS.

```bash
git add src
git commit -m "feat: add care categories and routes"
```

### Task 3: 홈·상세·탭·이미지 확대 동작

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/GuidePage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/components/BrandHeader.tsx`
- Create: `src/components/CategoryCard.tsx`
- Create: `src/components/SectionTabs.tsx`
- Create: `src/components/GuideImage.tsx`
- Create: `src/components/ImageLightbox.tsx`
- Create: `src/components/guide-interactions.test.tsx`

**Interfaces:**
- Consumes: `Category`, `GuideSection`, `GuideImage` from `src/content/categories.ts`
- Produces: `SectionTabs({ sections, activeId, onSelect })`, `GuideImage({ image, onOpen })`, `ImageLightbox({ image, onClose })`

- [ ] **Step 1: 사용자 동작 실패 테스트를 작성한다**

```tsx
await user.click(screen.getByRole('tab', { name: '시술 후' }))
expect(screen.getByRole('tab', { name: '시술 후' })).toHaveAttribute('aria-selected', 'true')
expect(screen.getByRole('img', { name: /입술 시술 후 안내/ })).toBeVisible()

await user.click(screen.getByRole('button', { name: /크게 보기/ }))
expect(screen.getByRole('dialog', { name: '이미지 크게 보기' })).toBeVisible()
await user.keyboard('{Escape}')
expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
```

- [ ] **Step 2: 테스트가 컴포넌트 부재로 실패하는지 확인한다**

Run: `npm test -- src/components/guide-interactions.test.tsx`

Expected: 컴포넌트를 찾지 못해 FAIL.

- [ ] **Step 3: 홈과 카테고리 카드 구현을 작성한다**

홈은 브랜드 소개와 다섯 개의 실제 링크 카드를 렌더링하며 카드 전체가 터치 가능해야 한다.

- [ ] **Step 4: 상세 탭과 안내 이미지 구현을 작성한다**

탭은 URL hash로 선택 상태를 반영하고, 잘못된 hash는 첫 섹션으로 정규화한다. 이미지는 `loading="lazy"`, `decoding="async"`를 사용하고 오류 시 대체 문구를 표시한다.

- [ ] **Step 5: 접근 가능한 확대 모달을 구현한다**

모달은 `role="dialog"`, `aria-modal="true"`를 가지며 Escape, 닫기 버튼, 배경 클릭으로 닫힌다. 열린 동안 본문 스크롤을 막고 닫힐 때 원래 상태로 복구한다.

- [ ] **Step 6: 사용자 동작 테스트 통과를 확인한다**

Run: `npm test -- src/components/guide-interactions.test.tsx src/App.test.tsx`

Expected: 탭 선택, 이미지 전환, 모달 열기와 닫기 모두 PASS.

- [ ] **Step 7: 전체 테스트 후 커밋한다**

Run: `npm test`

Expected: 모든 테스트 PASS.

```bash
git add src
git commit -m "feat: build guide browsing experience"
```

### Task 4: 반응형 시각 디자인과 공유 메타데이터

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`
- Modify: `index.html`
- Create: `public/og-image.png`
- Create: `public/favicon.svg`
- Create: `vercel.json`

**Interfaces:**
- Consumes: 모든 페이지와 컴포넌트의 의미 있는 class 이름
- Produces: 320px~1280px 이상의 유동형 레이아웃, 안전영역, Open Graph 카드, SPA fallback

- [ ] **Step 1: 모바일 기본 스타일을 작성한다**

`clamp()`, CSS Grid `repeat(auto-fit, minmax())`, `max-width`, `env(safe-area-inset-*)`를 사용하고 모든 이미지에 `max-width: 100%`를 적용한다.

- [ ] **Step 2: 태블릿과 넓은 화면 스타일을 작성한다**

768px 이상에서는 카드 2~3열과 중앙 정렬 상세 레이아웃을, 1024px 이상에서는 탐색과 이미지의 최대 폭을 제한한다. `@media (orientation: landscape)`에서 짧은 뷰포트의 모달 이미지 높이를 제한한다.

- [ ] **Step 3: 접근성·사용자 설정 스타일을 작성한다**

키보드 `:focus-visible`, 44px 터치 영역, `prefers-reduced-motion`, 충분한 명도 대비, 브라우저 글자 확대 시 겹침 없는 여백을 적용한다.

- [ ] **Step 4: 대표 이미지와 메타데이터를 연결한다**

`index.html`에 `og:title`, `og:description`, `og:type`, `og:image`, `twitter:card`, `theme-color`를 추가한다. 배포 주소가 정해지기 전에는 절대 URL이 필요한 `og:url`을 넣지 않는다.

- [ ] **Step 5: 정적 검사와 빌드 후 커밋한다**

Run: `npm run lint && npm test && npm run build`

Expected: 세 명령 모두 exit code 0.

```bash
git add src index.html public vercel.json
git commit -m "style: add responsive tablet and mobile design"
```

### Task 5: 사용 안내, 시각 검증, ZIP 패키징

**Files:**
- Create: `README.md`
- Create: `.gitignore`
- Create: `scripts/verify-package.ps1`
- Create: `docs/qa/responsive-qa.md`
- Create: `docs/qa/screenshots/*`
- Create: `../odeve-care-guide.zip`

**Interfaces:**
- Produces: 한국어 로컬 실행·Vercel 배포·카카오톡 링크 공유 설명과 재현 가능한 ZIP 검증 절차

- [ ] **Step 1: README와 패키지 검증 스크립트를 작성한다**

README에 Node.js 20.19 이상 또는 22.12 이상, `npm install`, `npm run dev`, Vercel Import 절차와 다음 공유 예시를 포함한다.

```text
시술 전후 안내사항은 아래 링크에서 확인해주세요.

https://프로젝트명.vercel.app
```

`scripts/verify-package.ps1`은 명시한 소스만 ZIP으로 압축하고 임시 디렉토리에 해제한 뒤 `npm ci`, `npm test`, `npm run build`를 실행한다.

- [ ] **Step 2: 전체 자동 검증을 실행한다**

Run: `npm run lint && npm test && npm run build`

Expected: 린트 오류 0, 테스트 실패 0, 빌드 exit code 0.

- [ ] **Step 3: 실제 프로덕션 미리보기를 화면 크기별로 확인한다**

320×568, 360×800, 390×844, 430×932, 768×1024, 1024×1366, 1280×800에서 홈과 입술 상세를 캡처한다. 각 화면에서 가로 스크롤 없음, 카드 재배치, 탭 줄바꿈, 이미지 비율, 모달 닫기 버튼, 안전영역을 확인하고 결과를 `docs/qa/responsive-qa.md`에 기록한다.

- [ ] **Step 4: ZIP을 만들고 독립 재검증한다**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-package.ps1`

Expected: `D:\backup\Documents\카카오톡 받은 파일\작업\odeve-care-guide.zip` 생성, 해제본 테스트와 빌드 PASS.

- [ ] **Step 5: 최종 상태를 커밋한다**

```bash
git add README.md .gitignore scripts docs/qa
git commit -m "docs: add deployment and responsive QA guide"
```

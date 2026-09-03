# 오더브 시술 안내

고객이 시술 카테고리를 선택하고 기존 시술 전·후 안내 이미지를 확인할 수 있는 반응형 웹사이트입니다. 스마트폰, 폴더블, iPad, Galaxy Tab, 데스크톱 화면에 대응합니다.

## 로컬 실행

Node.js 20.19 이상 또는 22.12 이상이 필요합니다.

```bash
npm install
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 열어 확인합니다.

## 검사와 프로덕션 빌드

```bash
npm run lint
npm test
npm run build
```

빌드 결과는 `dist` 폴더에 생성됩니다.

## 콘텐츠 관리

- 원본 안내 이미지: `public/images`
- 카테고리 및 이미지 연결: `src/content/categories.ts`
- 전체 화면 스타일: `src/styles/global.css`
- 설계 및 구현 계획: `docs/superpowers`
- 반응형 검증 기록과 캡처: `docs/qa`

이미지를 교체할 때는 같은 파일명을 사용하면 코드 수정 없이 반영됩니다. 카테고리명이나 탭 구성을 바꾸려면 `src/content/categories.ts`를 수정합니다.

## GitHub 업로드

이 프로젝트의 원격 저장소는 다음 주소입니다.

```text
https://github.com/MyungSungKim12/odeve-care-guide.git
```

## Vercel 배포

1. Vercel에서 **Add New → Project**를 선택합니다.
2. GitHub의 `MyungSungKim12/odeve-care-guide` 저장소를 가져옵니다.
3. Framework Preset이 **Vite**로 인식되는지 확인합니다.
4. Build Command는 `npm run build`, Output Directory는 `dist`를 사용합니다.
5. **Deploy**를 누릅니다.

`vercel.json`에 직접 접속 URL을 위한 SPA 재작성 설정이 포함되어 있으므로 `/guide/lip` 같은 주소도 새로고침할 수 있습니다.

## 카카오톡에서 링크를 클릭할 수 없을 때

카카오톡에는 반드시 `https://`부터 시작하는 완전한 배포 주소를 별도 줄로 전송하세요. 주소 앞뒤에 괄호, 마침표, 쉼표, 한글을 붙이지 않는 것이 안전합니다.

```text
시술 전후 안내사항은 아래 링크에서 확인해주세요.

https://프로젝트명.vercel.app
```

다음 형태는 링크 인식이 깨질 수 있으므로 피합니다.

```text
안내주소:https://프로젝트명.vercel.app입니다.
```

프로젝트에는 카카오톡 링크 미리보기용 Open Graph 정보와 `public/og-image.png`가 포함되어 있습니다. 배포 주소가 확정된 후 카카오톡 링크 카드가 갱신되지 않으면 카카오 디버거에서 기존 미리보기 캐시를 초기화해야 할 수 있습니다.

## ZIP 만들기 및 독립 검증

PowerShell에서 다음을 실행하면 상위 폴더에 `odeve-care-guide.zip`을 만들고, 임시 폴더에 다시 풀어 설치·테스트·빌드까지 확인합니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-package.ps1
```

ZIP에는 `node_modules`, `dist`, `.git`이 포함되지 않습니다.

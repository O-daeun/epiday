# epiday

#### Epiday는 감정 상태를 기록하고, 사용자들 간에 명언과 글귀를 공유할 수 있는 서비스입니다.

<br />

### 배포 URL

- <a href='https://epiday.vercel.app/'>Epiday 배포 링크</a>

<br />

### 개발 개요

- 개발 기간: 2024년 9월 - 10월

- 개발 방식: 기획안, 디자인 시안, 백엔드 서버 스웨거 문서를 기반으로 프론트엔드 개발 진행

<br />

### 기술 스텍

- React.js 기반 Next.js 웹 애플리케이션

  - 랜딩 페이지에서 SSR(Server Side Rendering) 적용, 나머지 페이지는 CSR(Client Side Rendering) 방식으로 React Query를 통해 API 데이터 관리
  - React Query로 API 데이터 호출 및 상태 관리
  - NextAuth를 통한 인증 관리
  - Zustand로 모달과 토스트 상태 전역 관리
  - react-calendar, recharts를 사용하여 달력 및 감정 차트 기능 구현
  - react-avatar-editor로 프로필 이미지 편집 기능 제공 (확대 및 위치 조정 가능)
  - Heroicons에서 필요한 아이콘 추가

- 배포: Vercel 사용
<br />

### 사용 방법

- 랜딩 페이지 제외한 모든 페이지는 로그인 필요
- 글귀 작성: 공유하고 싶은 글귀나 문구 작성 가능 (저자, 태그 추가 가능)
- 소셜 기능: 글귀에 좋아요, 댓글 기능 제공 (비밀 댓글 옵션 포함)
- 감정 기록: 일별 감정을 개인적으로 기록하고, 달력과 차트를 통해 감정 비율을 시각적으로 확인 가능

<br />

### 향후 추가 가능 기능

- SNS 로그인 (Google, Kakao)

<br />

### 버전 정보

- 현재 버전: 1.0.1
  - 로딩 스켈레톤 추가 구현 (<a href='https://github.com/O-daeun/epiday/pull/1'>관련 PR 페이지</a>)


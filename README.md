# 이음수첩 프론트엔드

이음수첩은 보호자가 평소에 말과 사진으로 돌봄 방법을 쌓아 두고, 보호자가 갑자기 쓰러지면 휴대폰 QR로 그 기록을 임시 보호자에게 넘기는 AI 돌봄 인수인계서입니다. 이 저장소는 보호자, 임시 보호자, 당사자가 휴대폰 브라우저로 쓰는 웹 화면입니다.

- 백엔드: [youth-heackathon/ieum-be](https://github.com/youth-heackathon/ieum-be)
- 기획·제출물(기획서, 화면 설계, 유저 플로우, ERD): [sgggg123/ieum-sucheop](https://github.com/sgggg123/ieum-sucheop)

## 기술

| 항목 | 사용 |
|---|---|
| 화면 | React 18, TypeScript 5.9 |
| 빌드 | Vite 6 |
| 스타일 | Tailwind CSS 4, 디지털 정부서비스 UI/UX 가이드라인(KRDS) 기반 색상 토큰 |
| 글꼴 | Pretendard GOV |

## 실행

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 타입 검사 후 dist/에 빌드
npm run preview   # 빌드 결과 미리보기
```

백엔드(`ieum-be`)를 로컬에서 함께 띄우면 개발 서버가 `/api` 요청을 `http://localhost:8080`으로 넘깁니다(`vite.config.ts`).

## 화면

주소는 `#/화면 번호` 형식입니다. 예: `http://localhost:5173/#/Q1`. 화면 번호는 기획서와 화면 설계의 번호와 같습니다.

| 묶음 | 화면 |
|---|---|
| 가입·초기 설정 | L0 로그인, L1 초기 설정 1/3, L1b 카드 공개 범위, L1c 1단계 공개 항목 고르기, L2 당사자 동의(쉬운 말), L3 대리(임시) 보호자 설정 |
| 보호자 | A1 홈, A2 복약안내문 촬영, A3 음성 기록, A4 인수인계서, A5 자리비움 시작, A6 홈(자리비움 중), A7 복귀 확인, A8 열람 알림(1단계), A8b 열람 알림(2단계 요청) |
| QR 열람·임시 보호자 | Q1 QR 1단계, B0 로그·IP 제공 동의, B1 1단계 기본 열람 확인, B2 2단계 열람 요청, B2b 승인 대기, B3 상세(2단계), B4 기록 남기기 |
| 인수인계 이해 확인 | B5 인수인계 함께 확인, B5a 안내 읽기, B5b 내 말로 설명, B5c 원문 재안내, B5d 결과, B5e 열람 만료 |
| 당사자 | C1a 일과표(순서 그림), C1b 일과표(큰 글씨 한 줄), C2 안심 카드 |

## 폴더 구조

```text
src/
  App.tsx              주소(#/화면 번호)에 맞는 화면을 그림
  screens/
    index.ts           화면 번호 → 제목, 컴포넌트 목록
    signup.tsx         가입·초기 설정 (L)
    guardian.tsx       보호자 (A)
    viewer.tsx         QR 열람·임시 보호자 (Q, B)
    understanding.tsx  인수인계 이해 확인 (B5~B5e)
    recipient.tsx      당사자 (C)
  FakeQr.tsx           시연용 QR 그림
  Icons.tsx            아이콘 모음
  index.css            KRDS 기반 토큰, 고대비 모드(<html data-contrast="high">)
  app.css              화면 공통 스타일
```

## 현재 상태

- 제출용 프로토타입의 화면을 React로 옮긴 단계입니다. 아직 서버 API와 연결하지 않았고, 화면의 데이터는 고정된 예시입니다.
- QR은 시연용 그림이며, 실제 QR 링크(예: `/q/:토큰`)를 붙일 때 라우터를 도입할 예정입니다.
- 시연에서만 쓰는 버튼(`aria-disabled="true"`)은 눌러도 이동하지 않습니다.
- 서버 API 명세는 백엔드의 `/swagger-ui.html` 또는 [`docs/openapi.json`](https://github.com/youth-heackathon/ieum-be/blob/main/ieum-be/docs/openapi.json)에 있습니다. 타입은 `npx openapi-typescript docs/openapi.json -o src/api.d.ts`로 만들 수 있습니다.

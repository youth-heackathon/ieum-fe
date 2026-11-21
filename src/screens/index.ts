import type { FC } from "react";
import * as signup from "./signup";
import * as guardian from "./guardian";
import * as viewer from "./viewer";
import * as recipient from "./recipient";

/** 화면 id(= 주소 #/id) → 제목, 컴포넌트. B5~B5e는 Understanding이 그린다 */
export const screens: Record<string, { title: string; C?: FC }> = {
  L0: { title: "로그인", C: signup.L0 },
  L1: { title: "초기 설정 1/3", C: signup.L1 },
  L1b: { title: "초기 설정 2/3 · 카드 공개 범위", C: signup.L1b },
  L1c: { title: "1단계 공개 항목 고르기", C: signup.L1c },
  L2: { title: "당사자 동의 · 쉬운 말", C: signup.L2 },
  L3: { title: "대리(임시) 보호자 설정", C: signup.L3 },
  A1: { title: "홈", C: guardian.A1 },
  A2: { title: "복약안내문 촬영", C: guardian.A2 },
  A3: { title: "음성 기록", C: guardian.A3 },
  A4: { title: "인수인계서", C: guardian.A4 },
  A5: { title: "자리비움 시작", C: guardian.A5 },
  A6: { title: "홈 (자리비움 중)", C: guardian.A6 },
  A7: { title: "복귀 확인", C: guardian.A7 },
  A8: { title: "열람 알림 · 1단계", C: guardian.A8 },
  A8b: { title: "열람 알림 · 2단계 요청", C: guardian.A8b },
  Q1: { title: "QR 1단계", C: viewer.Q1 },
  B0: { title: "로그·IP 제공 동의", C: viewer.B0 },
  B1: { title: "1단계 기본 열람 확인", C: viewer.B1 },
  B2: { title: "2단계 열람 요청", C: viewer.B2 },
  B2b: { title: "승인 대기", C: viewer.B2b },
  B3: { title: "상세 (2단계)", C: viewer.B3 },
  B4: { title: "기록 남기기", C: viewer.B4 },
  B5: { title: "인수인계 함께 확인" },
  B5a: { title: "이해 확인 / 안내 읽기" },
  B5b: { title: "이해 확인 / 내 말로 설명" },
  B5c: { title: "이해 확인 / 원문 재안내" },
  B5d: { title: "이해 확인 / 결과" },
  B5e: { title: "이해 확인 / 열람 만료" },
  C1a: { title: "일과표 · 순서 그림", C: recipient.C1a },
  C1b: { title: "일과표 · 큰 글씨 한 줄", C: recipient.C1b },
  C2: { title: "안심 카드", C: recipient.C2 },
};

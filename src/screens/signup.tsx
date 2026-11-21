// 디자인 원본: github.com/sgggg123/ieum-sucheop prototype/app.html (9e8f206) 마크업·문구를 그대로 옮김
import { useState } from "react";
import { Ic } from "../Icons";
import { api, fresh } from "../api";

export const L0 = () => {
  const [error, setError] = useState("");
  // shortcut: 문자 인증 가입(otp → signup → recipients → consents)은 안 붙임. 체험 가구(박지은·김순자)로 로그인
  const start = () =>
    api("/demo/sessions", "POST").then(
      () => (fresh(), (location.hash = "#/A1")),
      (e: Error) => setError(e.message),
    );
  return (
    <>
      <header className="ab">
        <span></span>
        <h1>이음수첩</h1>
        <span></span>
      </header>
      <div className="tabs2" role="tablist" aria-label="로그인 방식">
        <span role="tab" aria-selected="false">
          처음 가입
        </span>
        <span className="on" role="tab" aria-selected="true">
          로그인
        </span>
      </div>
      <div className="ct">
        <div className="fld">
          <span className="lbl">휴대폰 번호</span>
          <span className="inp">010-2345-6789</span>
        </div>
        <div className="fld">
          <span className="lbl">비밀번호</span>
          <span className="inp">••••••••</span>
        </div>
        <p className="note">
          <Ic n="info" />
          <span>처음에는 휴대폰 문자 인증으로 가입하고, 그다음부터는 전화번호와 비밀번호로 로그인해요.</span>
        </p>
        <p className="cap" style={{ border: "1px dashed #9AA3AD", borderRadius: "8px", padding: "8px 12px" }}>
          체험 모드 · 쿠키 세션으로 로그인을 유지하고, 문자 인증은 모의로 처리해요
        </p>
        {error && (
          <p className="note" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="bt col">
        <button className="btn btn-p full" onClick={start}>
          로그인
        </button>
        <a className="btn btn-t full" href="#/L1">
          문자 인증으로 가입하기
        </a>
      </div>
    </>
  );
};

export const L1 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/L0" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>초기 설정</h1>
      <span className="r">1/3</span>
    </header>
    <div className="ct tight">
      <ol className="steps" aria-label="3단계 중 1단계">
        <li className="on">1 기본 정보</li>
        <li>2 공개 범위</li>
        <li>3 대리 보호자</li>
      </ol>
      <div className="fld">
        <span className="lbl">나 (보호자) · 이름과 나이</span>
        <div className="row">
          <span className="inp grow">이영희</span>
          <span className="inp" style={{ width: "100px" }}>
            54세
          </span>
        </div>
      </div>
      <div className="fld">
        <span className="lbl">돌봐 드리는 분 · 이름과 나이</span>
        <div className="row">
          <span className="inp grow">김순자</span>
          <span className="inp" style={{ width: "100px" }}>
            82세
          </span>
        </div>
      </div>
      <div className="fld">
        <span className="lbl" id="l-care">
          돌봄 상황
        </span>
        <div className="opts" role="radiogroup" aria-labelledby="l-care">
          <span className="opt on" role="radio" aria-checked="true">
            <Ic n="check" />
            치매
          </span>
          <span className="opt" role="radio" aria-checked="false">
            지적장애
          </span>
          <span className="opt" role="radio" aria-checked="false">
            지체장애
          </span>
          <span className="opt" role="radio" aria-checked="false">
            기타
          </span>
        </div>
      </div>
      <div className="fld">
        <span className="lbl">알레르기·위험행동</span>
        <span className="inp area">
          페니실린, 복숭아 알레르기
          <br />
          밤에 혼자 밖으로 나가려 함
        </span>
      </div>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/L1b">
        다음
      </a>
    </div>
  </>
);

export const L1b = () => (
  <>
    <header className="ab">
      <a className="l" href="#/L1" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>초기 설정</h1>
      <span className="r">2/3</span>
    </header>
    <div className="ct tight">
      <ol className="steps" aria-label="3단계 중 2단계">
        <li className="done">1 기본 정보</li>
        <li className="on">2 공개 범위</li>
        <li>3 대리 보호자</li>
      </ol>
      <h2 className="h2">위급할 때 무엇을 보여 줄까요?</h2>
      <div className="card" style={{ padding: "0 16px" }}>
        <div className="kv">
          <div>
            <span>1단계 · QR을 찍은 누구나</span>
            <b>알레르기, 복용 약</b>
          </div>
          <a className="link" href="#/L1c">
            변경
            <Ic n="next" />
          </a>
        </div>
        <div className="kv">
          <div>
            <span>2단계 · 보호자가 허락한 사람만</span>
            <b>일과·진정법 등 7개 항목</b>
          </div>
          <a className="link" href="#/L1b" aria-disabled="true">
            변경
            <Ic n="next" />
          </a>
        </div>
        <div className="kv">
          <div>
            <span>동의 기간</span>
            <b>1년 (2027년 11월 21일까지)</b>
          </div>
          <a className="link" href="#/L1b" aria-disabled="true">
            변경
            <Ic n="next" />
          </a>
        </div>
      </div>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/L2">
        동의하고 다음
      </a>
    </div>
  </>
);

export const L1c = () => (
  <>
    <header className="ab">
      <a className="l" href="#/L1b" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>1단계에 보일 정보</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <p className="note">
        <Ic n="info" />
        <span>
          QR을 찍으면 <b>누구나</b> 이 정보를 볼 수 있어요. 알레르기와 약 정보만 고를 수 있어요.
        </span>
      </p>
      <p className="cap">
        <b style={{ color: "var(--color-t1)" }}>항상 보여요</b> · 알레르기
      </p>
      <div className="tg">
        <span>
          복용 중인 약 이름<small>도네페질, 와파린, 아모디핀</small>
        </span>
        <span className="sw on" role="switch" aria-checked="true">
          보이기<i></i>
        </span>
      </div>
      <div className="tg">
        <span>
          주의가 필요한 약 종류<small>혈액희석제 복용 중</small>
        </span>
        <span className="sw on" role="switch" aria-checked="true">
          보이기<i></i>
        </span>
      </div>
      <div className="tg">
        <span>
          보호자 본인 약·알레르기<small>기본 꺼짐</small>
        </span>
        <span className="sw" role="switch" aria-checked="false">
          숨기기<i></i>
        </span>
      </div>
      <p className="cap">일과나 행동 요령은 보는 사람마다 다르게 받아들일 수 있어 1단계에 넣지 않아요.</p>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/L1b">
        저장
      </a>
    </div>
  </>
);

export const L2 = () => (
  <>
    <header className="ab">
      <span></span>
      <h1>본인 동의</h1>
      <span></span>
    </header>
    <div className="ct mid" style={{ gap: "14px" }}>
      <svg width="220" height="112" viewBox="0 0 220 112" role="img" aria-label="돌봐 주는 사람이 수첩을 보는 그림">
        <circle cx="52" cy="30" r="20" fill="#ECF2FE" stroke="#256EF4" strokeWidth="3" />
        <path d="M18 108c0-24 15-40 34-40s34 16 34 40" fill="#ECF2FE" stroke="#256EF4" strokeWidth="3" />
        <circle cx="168" cy="30" r="20" fill="#FFF5D6" stroke="#8A5A00" strokeWidth="3" />
        <path d="M134 108c0-24 15-40 34-40s34 16 34 40" fill="#FFF5D6" stroke="#8A5A00" strokeWidth="3" />
        <rect x="88" y="40" width="44" height="56" rx="4" fill="#fff" stroke="#1E2124" strokeWidth="3" />
        <path d="M98 56h24M98 68h24M98 80h14" stroke="#1E2124" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="easy">
        <span>
          <Ic n="pill" />
        </span>
        <p>약 먹는 시간</p>
      </div>
      <div className="easy">
        <span>
          <Ic n="music" />
        </span>
        <p>좋아하는 노래</p>
      </div>
      <div className="easy">
        <span>
          <Ic n="phone" />
        </span>
        <p>연락할 사람</p>
      </div>
      <p className="h1" style={{ fontSize: "25px" }}>
        이 정보를 돌봐 주는 사람이 볼 수 있어요. 괜찮아요?
      </p>
    </div>
    <div className="bt col">
      <a className="btn btn-p full" href="#/L3">
        <Ic n="check" />
        괜찮아요
      </a>
      <a className="btn btn-t full" href="#/L1b">
        <Ic n="x" />
        싫어요
      </a>
      <a
        className="btn full"
        style={{ color: "var(--color-p-d)", textDecoration: "underline", fontSize: "17px" }}
        href="#/L3"
      >
        후견인이 대신 동의하기
      </a>
    </div>
  </>
);

export const L3 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/L1b" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>초기 설정</h1>
      <span className="r">3/3</span>
    </header>
    <div className="ct tight">
      <ol className="steps" aria-label="3단계 중 3단계">
        <li className="done">1 기본 정보</li>
        <li className="done">2 공개 범위</li>
        <li className="on">3 대리 보호자</li>
      </ol>
      <h2 className="h2">
        내가 응답하지 못할 때<br />
        대신 허락할 사람
      </h2>
      <div className="fld">
        <span className="lbl">이름과 관계</span>
        <div className="row">
          <span className="inp grow">이민수</span>
          <span className="inp" style={{ width: "110px" }}>
            아들
          </span>
        </div>
      </div>
      <div className="fld">
        <span className="lbl">휴대폰 번호</span>
        <span className="inp">010-9876-5432</span>
      </div>
      <ul className="chk-list">
        <li>
          <Ic n="check" />
          초대를 수락하고 동의해야 대리 보호자가 돼요
        </li>
        <li>
          <Ic n="check" />
          2단계 열람을 허락할 권한을 미리 맡겨요
        </li>
        <li>
          <Ic n="check" />
          지금 건너뛰고 나중에 추가해도 돼요
        </li>
      </ul>
    </div>
    <div className="bt">
      <a className="btn btn-t" href="#/A1">
        건너뛰기
      </a>
      <a className="btn btn-p grow" href="#/A1">
        초대 보내기
      </a>
    </div>
  </>
);

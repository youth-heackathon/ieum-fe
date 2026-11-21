// 디자인 원본: github.com/sgggg123/ieum-sucheop prototype/app.html (9e8f206) 마크업·문구를 그대로 옮김
import { Ic } from "../Icons";
import { FakeQr } from "../FakeQr";

export const A1 = () => (
  <>
    <header className="ab home">
      <span className="logo">
        <svg aria-hidden="true">
          <use href="#logo" />
        </svg>
        이음수첩
      </span>
      <span className="who">
        김순자 님<Ic n="down" style={{ width: "20px", height: "20px" }} />
      </span>
    </header>
    <div className="ct tight">
      <div className="card">
        <span className="lbl">인수인계서</span>
        <div className="gauge" role="img" aria-label="7개 항목 중 5개를 채웠어요">
          <span>
            <Ic n="pill" />
          </span>
          <span>
            <Ic n="shield" />
          </span>
          <span>
            <Ic n="hand" />
          </span>
          <span>
            <Ic n="music" />
          </span>
          <span>
            <Ic n="alert" />
          </span>
          <span className="no">
            <Ic n="clock" />
          </span>
          <span className="no">
            <Ic n="phone" />
          </span>
        </div>
        <div className="miss" style={{ marginTop: "10px", display: "block" }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <b>빠진 항목이 있어요</b>
            <a className="link" href="#/A3">
              채우기
              <Ic n="next" />
            </a>
          </div>
          <span>
            일과 · 밤에 잠을 못 주무실 때<br />
            비상연락처 1명 더
          </span>
        </div>
      </div>
      <div className="tiles">
        <a className="tile" href="#/A2">
          <Ic n="cam" />
          <span>
            <b>
              복약안내문
              <br />
              찍기
            </b>
            <br />
            <span>약이 바뀐 날 한 장만</span>
          </span>
        </a>
        <a className="tile s2" href="#/A3">
          <Ic n="mic" />
          <span>
            <b>
              말로
              <br />
              기록
            </b>
            <br />
            <span>AI가 정리해요</span>
          </span>
        </a>
      </div>
      <a
        className="li"
        href="#/A4"
        style={{ border: "1px solid var(--color-dv)", borderRadius: "12px", padding: "0 16px" }}
      >
        <div>
          <b>인수인계서 확인</b>
          <span>최근 저장 11월 18일</span>
        </div>
        <Ic n="next" style={{ color: "var(--color-t3)" }} />
      </a>
    </div>
    <div className="bt slim">
      <a className="btn btn-s full" href="#/A5">
        <Ic n="away" />
        자리비움
      </a>
    </div>
    <nav className="tb" aria-label="하단 메뉴">
      <a className="on" href="#/A1" aria-current="page">
        <Ic n="home" />홈
      </a>
      <a href="#/A4">
        <Ic n="doc" />
        인수인계서
      </a>
      <a href="#/L1c">
        <Ic n="qr" />
        QR
      </a>
      <a href="#/L1b">
        <Ic n="set" />
        설정
      </a>
    </nav>
  </>
);

export const A2 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/A1" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>복약안내문 촬영</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <div className="photo" role="img" aria-label="찍은 복약안내문. 이름은 검은 상자로 가려짐">
        <div className="paper" aria-hidden="true">
          <p className="t">복약안내문</p>성명
          <div className="ln" style={{ width: "60%", marginLeft: "30px", marginTop: "-9px" }}></div>
          <div className="ln"></div>
          <div className="dr">
            <i></i>
            <div className="ln" style={{ flex: "1" }}></div>
          </div>
          <div className="dr">
            <i></i>
            <div className="ln" style={{ flex: "1" }}></div>
          </div>
          <div className="dr">
            <i></i>
            <div className="ln" style={{ flex: "1" }}></div>
          </div>
        </div>
        <div className="mask" aria-hidden="true">
          이름 가림
        </div>
        <p className="ph">
          <Ic n="hand" />
          검은 상자를 이름 위로 끌어 놓으세요
        </p>
      </div>
      <h2 className="h2">AI가 이렇게 읽었어요. 맞나요?</h2>
      <div className="med">
        <b>도네페질정 5mg</b>
        <p className="d">1정 · 저녁 식후</p>
      </div>
      <div className="med">
        <b>와파린정 2mg</b>
        <p className="d">1정 · 아침 식후</p>
        <span className="bdg bdg-gray" style={{ marginTop: "6px" }}>
          주의가 필요한 약 · 혈액희석제
        </span>
      </div>
      <div className="med chk">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <b>아모디핀정 5mg</b>
          <span className="bdg bdg-warn">
            <Ic n="alert" />
            확인 필요
          </span>
        </div>
        <p className="d">
          <span className="fx">1정?</span> · 아침 식후 · 용량 글자가 흐려요
        </p>
      </div>
    </div>
    <div className="bt">
      <a className="btn btn-t" href="#/A2" aria-disabled="true">
        다시 찍기
      </a>
      <a className="btn btn-p grow" href="#/A4">
        맞아요, 저장
      </a>
    </div>
  </>
);

export const A3 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/A1" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>말로 기록</h1>
      <span></span>
    </header>
    <div className="ct" style={{ gap: "8px" }}>
      <p className="scope" style={{ fontSize: "16px" }}>
        <Ic n="info" style={{ color: "var(--color-p-d)" }} />
        AI가 정리해요 · 확인해야 저장돼요
      </p>
      <p className="bub me">
        <small>나</small>엄마가 <mark>공황 발작이 오면 넓은 공원으로 가서</mark> <mark>산책을 10분 이상 해 주세요</mark>
        .
      </p>
      <div className="aic">
        <p className="lbl" style={{ color: "var(--color-p-d)" }}>
          이렇게 정리했어요
        </p>
        <div className="row" style={{ flexWrap: "wrap", gap: "6px" }}>
          <span className="bdg bdg-gray">위험행동과 진정법</span>
        </div>
        <p>공황 발작이 오면 넓은 공원으로 모시고 가서 10분 이상 함께 산책해요.</p>
        <p className="q">
          <b>원문</b> “공황 발작이 오면 넓은 공원으로 가서”, “산책을 10분 이상 해 주세요”
        </p>
        <div className="row">
          <a className="btn btn-t grow" href="#/A3" aria-disabled="true">
            고치기
          </a>
          <a className="btn btn-p grow" href="#/A4">
            맞아요
          </a>
        </div>
      </div>
      <p className="bub ai">
        <small>빠진 항목 · 일과(밤잠)</small>밤에 잠을 못 주무시면 어떻게 하세요?
      </p>
    </div>
    <div className="bt">
      <a className="btn btn-t" href="#/A3" aria-disabled="true" aria-label="음성이 안 되면 글로 쓰기">
        <Ic n="pen" />
        글로 쓰기
      </a>
      <a className="btn btn-p grow" href="#/A3" aria-disabled="true">
        <Ic n="mic" />
        누르고 말하기
      </a>
    </div>
  </>
);

export const A4 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/A1" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>인수인계서</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <div className="card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px" }}>
        <FakeQr />
        <div style={{ lineHeight: "1.35" }}>
          <b style={{ fontSize: "17px" }}>김순자 님 QR</b>
          <p className="cap" style={{ fontSize: "15px" }}>
            찍으면 알레르기·약만 보여요
          </p>
        </div>
      </div>
      <div className="must">
        <h3>
          <Ic n="alert" />꼭 알아야 해요
        </h3>
        <ul>
          <li>혈액희석제(와파린)를 먹어요</li>
          <li>밤에 혼자 밖으로 나가려 해요</li>
          <li>음식은 잘게 잘라 주세요</li>
        </ul>
      </div>
      <div>
        <div className="li">
          <div>
            <b>일과</b>
            <span>밤잠 항목이 빠졌어요</span>
          </div>
          <a className="btn btn-s" style={{ padding: "0 16px" }} href="#/A3">
            <Ic n="pen" style={{ width: "20px", height: "20px" }} />
            쓰기
          </a>
        </div>
        <div className="li">
          <div>
            <b>비상연락처</b>
            <span>1명 더 필요해요</span>
          </div>
          <a className="btn btn-s" style={{ padding: "0 16px" }} href="#/A3">
            <Ic n="pen" style={{ width: "20px", height: "20px" }} />
            쓰기
          </a>
        </div>
        <div className="li">
          <div>
            <b>복약</b>
            <span>마지막 확인 11월 18일</span>
          </div>
          <span className="bdg bdg-ok">
            <Ic n="check" />
            완료
          </span>
        </div>
        <div className="li">
          <div>
            <b>건강·병력</b>
            <span>마지막 확인 11월 10일</span>
          </div>
          <span className="bdg bdg-ok">
            <Ic n="check" />
            완료
          </span>
        </div>
        <div className="li">
          <div>
            <b>식사·알레르기</b>
            <span>마지막 확인 11월 3일</span>
          </div>
          <span className="bdg bdg-ok">
            <Ic n="check" />
            완료
          </span>
        </div>
      </div>
      <div className="li">
        <div>
          <b>의사소통</b>
          <span>마지막 확인 11월 18일</span>
        </div>
        <a
          className="link"
          href="#/A4"
          aria-disabled="true"
          style={{ color: "var(--color-red)", fontSize: "16px", padding: "0" }}
        >
          <Ic n="alert" style={{ width: "18px", height: "18px", marginRight: "3px" }} />꼭 알아야 해요로
        </a>
      </div>
      <div className="li">
        <div>
          <b>위험행동과 진정법</b>
          <span>마지막 확인 11월 18일</span>
        </div>
        <span className="bdg bdg-ok">
          <Ic n="check" />
          완료
        </span>
      </div>
    </div>
  </>
);

export const A5 = () => (
  <>
    <div {...{ inert: "" }} style={{ display: "flex", flexDirection: "column", flex: "1", minHeight: "0" }}>
      <header className="ab home">
        <span className="logo">
          <svg aria-hidden="true">
            <use href="#logo" />
          </svg>
          이음수첩
        </span>
        <span className="who">
          김순자 님<Ic n="down" style={{ width: "20px", height: "20px" }} />
        </span>
      </header>
      <div className="ct tight">
        <div className="card">
          <span className="lbl">인수인계서</span>
          <div className="gauge" role="img" aria-label="7개 항목 중 5개를 채웠어요">
            <span>
              <Ic n="pill" />
            </span>
            <span>
              <Ic n="shield" />
            </span>
            <span>
              <Ic n="hand" />
            </span>
            <span>
              <Ic n="music" />
            </span>
            <span>
              <Ic n="alert" />
            </span>
            <span className="no">
              <Ic n="clock" />
            </span>
            <span className="no">
              <Ic n="phone" />
            </span>
          </div>
          <div className="miss" style={{ marginTop: "10px", display: "block" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <b>빠진 항목이 있어요</b>
              <span className="link">
                채우기
                <Ic n="next" />
              </span>
            </div>
            <span>
              일과 · 밤에 잠을 못 주무실 때<br />
              비상연락처 1명 더
            </span>
          </div>
        </div>
        <div className="tiles">
          <span className="tile">
            <Ic n="cam" />
            <span>
              <b>
                복약안내문
                <br />
                찍기
              </b>
              <br />
              <span>약이 바뀐 날 한 장만</span>
            </span>
          </span>
          <span className="tile s2">
            <Ic n="mic" />
            <span>
              <b>
                말로
                <br />
                기록
              </b>
              <br />
              <span>AI가 정리해요</span>
            </span>
          </span>
        </div>
        <span className="li" style={{ border: "1px solid var(--color-dv)", borderRadius: "12px", padding: "0 16px" }}>
          <div>
            <b>인수인계서 확인</b>
            <span>최근 저장 11월 18일</span>
          </div>
          <Ic n="next" style={{ color: "var(--color-t3)" }} />
        </span>
      </div>
      <div className="bt slim">
        <span className="btn btn-s full">
          <Ic n="away" />
          자리비움
        </span>
      </div>
      <div className="tb">
        <a className="on">
          <Ic n="home" />홈
        </a>
        <a>
          <Ic n="doc" />
          인수인계서
        </a>
        <a>
          <Ic n="qr" />
          QR
        </a>
        <a>
          <Ic n="set" />
          설정
        </a>
      </div>
    </div>
    <div className="dim" aria-hidden="true"></div>
    <div className="sheet" role="dialog" aria-label="자리비움 시작 확인">
      <span className="grab" aria-hidden="true"></span>
      <h2 className="h2">자리비움을 시작할까요?</h2>
      <p>시작하면 돌봄자용 링크가 만들어져요.</p>
      <ul className="chk-list">
        <li>
          <Ic n="check" />
          정한 기간이 지나면 링크가 닫혀요
        </li>
        <li>
          <Ic n="check" />
          누가 언제 봤는지 기록돼요
        </li>
        <li>
          <Ic n="check" />
          돌아오면 버튼 하나로 닫혀요
        </li>
      </ul>
      <div className="kv" style={{ border: "1px solid var(--color-dv)", borderRadius: "8px", padding: "0 16px" }}>
        <div>
          <span>기간</span>
          <b>3일 (11월 21일까지)</b>
        </div>
        <a className="link" href="#/A5" aria-disabled="true">
          변경
          <Ic n="next" />
        </a>
      </div>
      <div className="row">
        <a className="btn btn-t" href="#/A1">
          취소
        </a>
        <a className="btn btn-p grow" href="#/A6">
          자리비움 시작
        </a>
      </div>
    </div>
  </>
);

export const A6 = () => (
  <>
    <header className="ab home">
      <span className="logo">
        <svg aria-hidden="true">
          <use href="#logo" />
        </svg>
        이음수첩
      </span>
      <span className="who">김순자 님</span>
    </header>
    <div className="ct tight">
      <p className="away">
        <i aria-hidden="true"></i>자리비움 중 · 11월 18일부터
      </p>
      <div className="stats">
        <div>
          <b>3회</b>
          <span>열람</span>
        </div>
        <div>
          <b>2건</b>
          <span>들어온 기록</span>
        </div>
      </div>
      <div className="row">
        <a className="btn btn-t grow" href="#/B3">
          링크 보기
        </a>
        <a className="btn btn-d grow" href="#/A1">
          열람 막기
        </a>
      </div>
      <p className="lbl">들어온 기록</p>
      <div className="li">
        <div>
          <b>점심 식사 완료</b>
          <span>12:40 · 박○○ 선생님</span>
        </div>
        <span className="bdg bdg-ok">식사</span>
      </div>
      <div className="li">
        <div>
          <b>저녁 약 드림</b>
          <span>19:10 · 박○○ 선생님</span>
        </div>
        <span className="bdg bdg-ok">복약</span>
      </div>
      <p className="lbl">열람 기록</p>
      <div className="li">
        <div>
          <b>돌봄 인력 · 긴급 요약</b>
          <span>15:12 · 링크로 열람</span>
        </div>
        <span className="bdg bdg-gray">2단계</span>
      </div>
    </div>
    <div className="bt slim">
      <a className="btn btn-p full" href="#/A7">
        복귀
      </a>
    </div>
    <nav className="tb" aria-label="하단 메뉴">
      <a className="on" href="#/A6" aria-current="page">
        <Ic n="home" />홈
      </a>
      <a href="#/A4">
        <Ic n="doc" />
        인수인계서
      </a>
      <a href="#/L1c">
        <Ic n="qr" />
        QR
      </a>
      <a href="#/L1b">
        <Ic n="set" />
        설정
      </a>
    </nav>
  </>
);

export const A7 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/A6" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>복귀 확인</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <h2 className="h2">
        자리를 비운 동안
        <br />
        이런 일이 있었어요
      </h2>
      <p className="lbl">돌봄자 기록 2건과 넘겨받은 한 줄</p>
      <div className="li">
        <div>
          <b>점심 식사 완료</b>
          <span>11월 18일 12:40</span>
        </div>
      </div>
      <div className="li">
        <div>
          <b>저녁 약 드림</b>
          <span>11월 18일 19:10</span>
        </div>
      </div>
      <div className="li">
        <div>
          <b>넘겨받은 한 줄</b>
          <span>“밤에 혼자 나가려 한 적이 있어요”</span>
        </div>
      </div>
      <p className="lbl">열람 기록 3회 · 구급대원 1회, 돌봄 인력 2회</p>
      <div className="card" style={{ padding: "14px 16px" }}>
        <b>구두로 전달받은 내용이 있나요?</b>
        <div className="row" style={{ marginTop: "10px" }}>
          <a className="btn btn-t grow" href="#/A3">
            <Ic n="mic" />
            말로 기록
          </a>
          <a className="btn btn-t grow" href="#/A7" aria-disabled="true">
            없어요
          </a>
        </div>
      </div>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/A1">
        인수인계서에 반영하고 복귀
      </a>
    </div>
  </>
);

export const A8 = () => (
  <>
    <header className="ab">
      <span className="l">
        <Ic n="bell" style={{ color: "var(--color-amb)" }} />
      </span>
      <h1>열람 알림</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <div className="alertc">
        <h2 className="h2">
          <Ic n="qr" />
          누군가 1단계 정보를 열었어요
        </h2>
        <dl>
          <dt>시각</dt>
          <dd>오늘 오후 3:12</dd>
          <dt>기기</dt>
          <dd>Android · Chrome</dd>
          <dt>IP</dt>
          <dd>211.36.***.***</dd>
          <dt>본 정보</dt>
          <dd>알레르기·약 정보</dd>
        </dl>
      </div>
      <p className="cap">위치 정보는 모으지 않아요. 대리 보호자 이민수 님에게도 같은 알림이 갔어요.</p>
      <p className="note">
        <Ic n="info" />
        <span>모르는 열람이면 QR을 새로 발급하세요. 이전 QR은 바로 쓸 수 없게 돼요.</span>
      </p>
    </div>
    <div className="bt col">
      <a className="btn btn-t full" href="#/A1">
        확인
      </a>
      <a className="btn btn-d full" href="#/A8" aria-disabled="true">
        QR 새로 발급
      </a>
    </div>
  </>
);

export const A8b = () => (
  <>
    <header className="ab">
      <span className="l">
        <Ic n="bell" style={{ color: "var(--color-p-d)" }} />
      </span>
      <h1>승인 요청</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <div className="card req" style={{ padding: "16px 18px" }}>
        <h2 className="h2">
          김순자 님 QR
          <br />
          전체 보기 요청
        </h2>
        <dl>
          <dt>사유</dt>
          <dd>돌봄 공백</dd>
          <dt>요청한 분</dt>
          <dd>돌봄 인력</dd>
          <dt>기기·IP</dt>
          <dd>Android · 211.36.***</dd>
          <dt>요청 시각</dt>
          <dd>오늘 오후 3:13</dd>
        </dl>
      </div>
      <div className="timer">
        <b>8:42</b>
        <p>10분 안에 승인하지 않으면 요청이 만료돼요.</p>
      </div>
      <div>
        <a className="btn btn-p full" href="#/B3">
          <Ic n="check" />
          승인
        </a>
        <p className="cap" style={{ textAlign: "center", marginTop: "4px" }}>
          승인 전에 문자 인증을 한 번 더 해요
        </p>
      </div>
      <a className="btn btn-t full" href="#/A8" aria-disabled="true">
        <Ic n="x" />
        거절
      </a>
    </div>
    <div className="bt">
      <a className="btn btn-d full" href="#/A8" aria-disabled="true">
        이 QR 폐기하고 새로 발급
      </a>
    </div>
  </>
);

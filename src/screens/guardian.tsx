// 디자인 원본: github.com/sgggg123/ieum-sucheop prototype/app.html (9e8f206) 마크업·문구를 그대로 옮김
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Ic } from "../Icons";
import { api, device, fresh, useApi, useLeft, when, type S } from "../api";

const Err = ({ msg }: { msg: string }) =>
  msg ? (
    <p className="note" role="alert">
      <Ic n="alert" style={{ color: "var(--color-red)" }} />
      <span>{msg}</span>
    </p>
  ) : null;

export const A1 = () => {
  // 홈 폴링: 열람·상세조회 요청이 들어오면 바로 보이게
  const { data: home, error } = useApi<S["Home"]>("/home", { poll: 3000 });
  const pending = home?.pendingDetailRequests?.length ?? 0;
  const unread = home?.unreadNotifications ?? 0;
  return (
    <>
      <header className="ab home">
        <span className="logo">
          <svg aria-hidden="true">
            <use href="#logo" />
          </svg>
          이음수첩
        </span>
        <span className="who">
          {home?.recipient?.name} 님<Ic n="down" style={{ width: "20px", height: "20px" }} />
        </span>
      </header>
      <div className="ct tight">
        <Err msg={error} />
        {pending > 0 && (
          <a className="btn btn-d full" href="#/A8b">
            <Ic n="bell" />
            상세 정보 보기 요청이 왔어요
          </a>
        )}
        {pending === 0 && unread > 0 && (
          <a className="btn btn-s full" href="#/A8">
            <Ic n="bell" />새 열람 알림 {unread}건
          </a>
        )}
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
};

const SAMPLE = "/medications/sources/sample";

export const A2 = () => {
  // shortcut: 사진 촬영·업로드 대신 서버의 샘플 복약안내문 (체험 API). 실제 업로드 API가 생기면 바꾼다
  const { data, error } = useApi<S["SourceResult"]>(SAMPLE, { post: true });
  const [doses, setDoses] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState("");
  const meds = data?.medications ?? [];
  const missingDose = meds.some((m) => m.doseNeedsCheck && !doses[m.id!]?.trim());
  const save = () =>
    Promise.all(
      meds
        .filter((m) => m.verifyStatus !== "blocked")
        .map((m) => api(`/medications/${m.id}/confirm`, "POST", m.doseNeedsCheck ? { dose: doses[m.id!] } : {})),
    ).then(
      () => (fresh(SAMPLE), (location.hash = "#/A4")),
      (e: Error) => setSaveError(e.message),
    );
  return (
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
        {!data && !error && <p className="cap">읽는 중…</p>}
        {meds.map((m) => (
          <div className={m.doseNeedsCheck || m.verifyStatus !== "pass" ? "med chk" : "med"} key={m.id}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <b>{m.name}</b>
              {m.verifyStatus === "blocked" ? (
                <span className="bdg bdg-red">
                  <Ic n="x" />
                  저장 안 함
                </span>
              ) : (
                (m.doseNeedsCheck || m.verifyStatus === "review") && (
                  <span className="bdg bdg-warn">
                    <Ic n="alert" />
                    확인 필요
                  </span>
                )
              )}
            </div>
            {m.doseNeedsCheck ? (
              <p className="d">
                <input
                  className="fx"
                  style={{ width: "96px" }}
                  aria-label={`${m.name} 용량`}
                  placeholder={`${m.dose}?`}
                  value={doses[m.id!] ?? ""}
                  onChange={(e) => setDoses({ ...doses, [m.id!]: e.target.value })}
                />{" "}
                · {m.timing} · 용량 글자가 흐려요. 약봉투를 보고 적어 주세요
              </p>
            ) : (
              <p className="d">
                {m.dose} · {m.timing}
              </p>
            )}
            {m.easyText && <p className="d">쉬운 말: {m.easyText}</p>}
            {m.reason && <p className="d">{m.reason}</p>}
            {m.caution && (
              <span className="bdg bdg-gray" style={{ marginTop: "6px" }}>
                주의가 필요한 약 · {m.caution}
              </span>
            )}
          </div>
        ))}
        <Err msg={error || saveError} />
      </div>
      <div className="bt">
        <a className="btn btn-t" href="#/A2" aria-disabled="true">
          다시 찍기
        </a>
        <button className="btn btn-p grow" onClick={save} disabled={!meds.length || missingDose}>
          맞아요, 저장
        </button>
      </div>
    </>
  );
};

export const A3 = () => {
  // shortcut: 녹음 대신 서버의 샘플 음성 받아쓰기 (체험 API). 마이크 녹음은 안 붙임
  const { data: heard } = useApi<S["Transcript"]>("/records/transcribe/sample", { post: true });
  const [text, setText] = useState<string>();
  const [draft, setDraft] = useState<S["DraftResult"]>();
  const [error, setError] = useState("");
  const value = text ?? heard?.text ?? "";
  const items = draft?.items ?? [];
  const run = (injectMistake: boolean) =>
    api<S["DraftResult"]>("/records/draft", "POST", { text: value, injectMistake }).then(
      (d) => (setDraft(d), setError("")),
      (e: Error) => setError(e.message),
    );
  const save = () =>
    Promise.all(
      items.filter((i) => i.verifyStatus !== "blocked").map((i) => api(`/records/${i.id}/confirm`, "POST", {})),
    ).then(
      () => (location.hash = "#/A4"),
      (e: Error) => setError(e.message),
    );
  return (
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
        <textarea
          className="inp area"
          aria-label="기록할 내용"
          value={value}
          onChange={(e) => (setText(e.target.value), setDraft(undefined))}
        />
        {items.map((i) => (
          <div className="aic" key={i.id}>
            <div className="row" style={{ flexWrap: "wrap", gap: "6px" }}>
              <span className="bdg bdg-gray">{i.category}</span>
              {i.verifyStatus === "review" && (
                <span className="bdg bdg-warn">
                  <Ic n="alert" />
                  확인 필요
                </span>
              )}
              {i.verifyStatus === "blocked" && (
                <span className="bdg bdg-red">
                  <Ic n="x" />
                  저장 막음
                </span>
              )}
            </div>
            <p>{i.summary}</p>
            <p className="q">
              <b>원문</b> “{i.quote}”
            </p>
            {i.reason && <p className="cap">{i.reason}</p>}
          </div>
        ))}
        {draft?.followUps?.map((q) => (
          <p className="bub ai" key={q}>
            <small>빠진 항목</small>
            {q}
          </p>
        ))}
        <Err msg={error} />
      </div>
      <div className="bt">
        {draft ? (
          <>
            <button className="btn btn-t" onClick={() => setDraft(undefined)}>
              고치기
            </button>
            <button
              className="btn btn-p grow"
              onClick={save}
              disabled={!items.some((i) => i.verifyStatus !== "blocked")}
            >
              맞아요, 저장
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-x" onClick={() => run(true)} disabled={!value.trim()}>
              AI 실수 끼워 넣기
              <small>시연용</small>
            </button>
            <button className="btn btn-p grow" onClick={() => run(false)} disabled={!value.trim()}>
              정리하기
            </button>
          </>
        )}
      </div>
    </>
  );
};

const Done = ({ at, stale }: { at?: string; stale?: boolean }) =>
  !at ? (
    <span className="bdg bdg-gray">확인 전</span>
  ) : stale ? (
    <span className="bdg bdg-warn">
      <Ic n="alert" />
      30일 지남
    </span>
  ) : (
    <span className="bdg bdg-ok">
      <Ic n="check" />
      완료
    </span>
  );

export const A4 = () => {
  const { data: card, error } = useApi<S["Card"]>("/access-codes");
  const { data: who } = useApi<S["Recipient"]>("/recipients/me");
  const { data: records = [] } = useApi<S["CareRecord"][]>("/records");
  const { data: meds = [] } = useApi<S["Medication"][]>("/medications");
  const shown = records.filter((r) => r.verifyStatus !== "blocked");
  const must = [
    ...meds.filter((m) => m.confirmedAt && m.caution).map((m) => `${m.caution} · ${m.name ?? "이름 가림"}`),
    ...shown.filter((r) => r.confirmedAt && r.emergencyVisible).map((r) => r.summary),
  ];
  return (
    <>
      <header className="ab">
        <a className="l" href="#/A1" aria-label="뒤로">
          <Ic n="back" />
        </a>
        <h1>인수인계서</h1>
        <span></span>
      </header>
      <div className="ct tight">
        <Err msg={error} />
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px" }}>
          {card?.qrToken && (
            // 폰 카메라로 찍으면 /a/{토큰} 조회 화면이 열린다
            <QRCodeSVG
              value={`${location.origin}/a/${card.qrToken}`}
              size={120}
              marginSize={2}
              style={{ flex: "none" }}
              role="img"
              aria-label={`${who?.name ?? ""} 님 QR`}
            />
          )}
          <div style={{ lineHeight: "1.35" }}>
            <b style={{ fontSize: "17px" }}>{who?.name} 님 QR</b>
            <p className="cap" style={{ fontSize: "15px" }}>
              찍으면 알레르기·약만 보여요
            </p>
            {card?.code8 && (
              <p className="cap" style={{ fontSize: "15px" }}>
                찍을 수 없으면 코드 <b>{card.code8}</b>
              </p>
            )}
          </div>
        </div>
        {must.length > 0 && (
          <div className="must">
            <h3>
              <Ic n="alert" />꼭 알아야 해요
            </h3>
            <ul>
              {must.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          {shown.map((r) => (
            <div className="li" key={r.id}>
              <div>
                <b>{r.category}</b>
                <span>{r.summary}</span>
              </div>
              <Done at={r.confirmedAt} stale={r.stale} />
            </div>
          ))}
          <div className="li">
            <div>
              <b>복약</b>
              <span>{meds.map((m) => m.name ?? "이름 가림").join(", ") || "아직 없어요"}</span>
            </div>
            <Done at={meds.find((m) => m.confirmedAt)?.confirmedAt} />
          </div>
        </div>
        <a className="btn btn-s full" href="#/A3">
          <Ic n="pen" />
          기록 더 쓰기
        </a>
      </div>
    </>
  );
};

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

export const A8 = () => {
  const { data: logs, error } = useApi<S["LogEntry"][]>("/access-logs");
  const [err, setErr] = useState("");
  const log = logs?.find((l) => l.kind === "emergency");
  const fail = (e: Error) => setErr(e.message);
  const ok = () => api("/notifications/read", "POST").then(() => (location.hash = "#/A1"), fail);
  const reissue = () => api("/access-codes", "POST").then(() => (location.hash = "#/A4"), fail);
  return (
    <>
      <header className="ab">
        <span className="l">
          <Ic n="bell" style={{ color: "var(--color-amb)" }} />
        </span>
        <h1>열람 알림</h1>
        <span></span>
      </header>
      <div className="ct tight">
        <Err msg={error || err} />
        <div className="alertc">
          <h2 className="h2">
            <Ic n="qr" />
            누군가 1단계 정보를 열었어요
          </h2>
          <dl>
            <dt>시각</dt>
            <dd>{when(log?.createdAt)}</dd>
            <dt>기기</dt>
            <dd>{log && device(log.userAgent)}</dd>
            <dt>본 정보</dt>
            <dd>알레르기·약 정보</dd>
          </dl>
        </div>
        <p className="cap">위치 정보는 모으지 않아요. 연결된 보호자 모두에게 같은 알림이 갔어요.</p>
        <p className="note">
          <Ic n="info" />
          <span>모르는 열람이면 QR을 새로 발급하세요. 이전 QR은 바로 쓸 수 없게 돼요.</span>
        </p>
      </div>
      <div className="bt col">
        <button className="btn btn-t full" onClick={ok}>
          확인
        </button>
        <button className="btn btn-d full" onClick={reissue}>
          QR 새로 발급
        </button>
      </div>
    </>
  );
};

export const A8b = () => {
  const { data: reqs, error } = useApi<S["PendingRequest"][]>("/detail-requests", { poll: 3000 });
  const { data: who } = useApi<S["Recipient"]>("/recipients/me");
  const [err, setErr] = useState("");
  const req = reqs?.[0];
  const left = useLeft(req?.deadlineAt);
  const decide = (d: "approve" | "reject") =>
    api(`/detail-requests/${req!.id}/${d}`, "POST").then(
      () => (location.hash = "#/A1"),
      (e: Error) => setErr(e.message),
    );
  return (
    <>
      <header className="ab">
        <span className="l">
          <Ic n="bell" style={{ color: "var(--color-p-d)" }} />
        </span>
        <h1>승인 요청</h1>
        <span></span>
      </header>
      <div className="ct tight">
        <Err msg={error || err} />
        {reqs && !req && (
          <>
            <p className="note">
              <Ic n="info" />
              <span>지금 기다리는 요청이 없어요.</span>
            </p>
            <a className="btn btn-t full" href="#/A1">
              홈으로
            </a>
          </>
        )}
        {req && (
          <>
            <div className="card req" style={{ padding: "16px 18px" }}>
              <h2 className="h2">
                {who?.name} 님 QR
                <br />
                전체 보기 요청
              </h2>
              <dl>
                <dt>기기</dt>
                <dd>{device(req.userAgent)}</dd>
                <dt>마감</dt>
                <dd>{when(req.deadlineAt)}</dd>
              </dl>
            </div>
            <div className="timer">
              <b>{left.text}</b>
              <p>10분 안에 승인하지 않으면 요청이 만료돼요.</p>
            </div>
            <div>
              <button className="btn btn-p full" onClick={() => decide("approve")}>
                <Ic n="check" />
                승인
              </button>
              <p className="cap" style={{ textAlign: "center", marginTop: "4px" }}>
                승인하면 그분이 60분 동안 상세 정보를 볼 수 있어요
              </p>
            </div>
            <button className="btn btn-t full" onClick={() => decide("reject")}>
              <Ic n="x" />
              거절
            </button>
          </>
        )}
      </div>
      <div className="bt">
        <a className="btn btn-d full" href="#/A8" aria-disabled="true">
          이 QR 폐기하고 새로 발급
        </a>
      </div>
    </>
  );
};

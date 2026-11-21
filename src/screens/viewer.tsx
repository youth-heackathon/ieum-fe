// 디자인 원본: github.com/sgggg123/ieum-sucheop prototype/app.html (9e8f206) 마크업·문구를 그대로 옮김
import { useEffect, useState } from "react";
import { Ic } from "../Icons";
import { api, qrToken, useApi, useLeft, when, type S } from "../api";

const Err = ({ msg }: { msg: string }) =>
  msg ? (
    <p className="note" role="alert">
      <Ic n="alert" style={{ color: "var(--color-red)" }} />
      <span>{msg}</span>
    </p>
  ) : null;

/** 긴급조회(1단계). 열 때마다 서버가 기기정보를 남기고 보호자에게 알린다 → Q1·B1이 같은 응답을 나눠 쓴다 */
const Emergency = () => {
  const { data: e, error } = useApi<S["Emergency"]>(qrToken ? `/public/access/${qrToken}/emergency` : null, {
    post: true,
  });
  if (!qrToken) return <Err msg="QR을 다시 찍어 주세요." />;
  if (error) return <Err msg={error} />;
  if (!e) return <p className="cap">불러오는 중…</p>;
  if (e.allowed === false) return <Err msg="보호자가 아직 공개에 동의하지 않았어요." />;
  const meds = e.medications ?? [];
  const cautions = [...new Set(meds.map((m) => m.caution).filter(Boolean))];
  return (
    <>
      {e.items?.map((i, k) => (
        <div className="info" key={k}>
          <span>{i.category}</span>
          <b>{i.summary}</b>
        </div>
      ))}
      {meds.length > 0 && (
        <div className="info">
          <span>복용 중인 약</span>
          <b>{meds.map((m) => m.name ?? "이름 가림").join(", ")}</b>
        </div>
      )}
      {cautions.length > 0 && (
        <div className="info">
          <span>주의가 필요한 약 종류</span>
          <b>{cautions.join(", ")} 복용 중</b>
        </div>
      )}
      {e.notice && <p className="cap">{e.notice}</p>}
    </>
  );
};

export const Q1 = () => (
  <>
    <div className="qhead">
      <p>
        <Ic n="qr" />
        이음수첩 · 긴급 돌봄 정보 1단계
      </p>
      <h1>
        돌봄이 필요한
        <br />
        가족이 있어요
      </h1>
    </div>
    <div className="ct tight">
      <Emergency />
      <a className="btn btn-t full call" href="#/Q1" aria-disabled="true">
        <span className="row">
          <Ic n="phone" />
          보호자에게 전화
        </span>
        <small>번호는 가려져요</small>
      </a>
      <p className="cap" style={{ textAlign: "center" }}>
        알레르기와 약 정보만 보여요 · 연 기록이 보호자에게 가요
      </p>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/B0">
        자세히 보기
      </a>
    </div>
  </>
);

export const B0 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/Q1" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>열람 전 안내</h1>
      <span></span>
    </header>
    <div className="ct mid" style={{ gap: "18px" }}>
      <Ic n="shield" style={{ width: "64px", height: "64px", color: "var(--color-p-d)", strokeWidth: "1.6" }} />
      <h2 className="h2">보호자에게 열람 기록이 전달돼요</h2>
      <div className="card" style={{ width: "100%", textAlign: "left", padding: "4px 16px" }}>
        <div className="li">
          <div>
            <b>전달하는 것</b>
            <span>열람 시각, 기기 정보, IP</span>
          </div>
          <Ic n="check" style={{ color: "var(--color-grn)" }} />
        </div>
        <div className="li" style={{ borderBottom: "0" }}>
          <div>
            <b>모으지 않는 것</b>
            <span>위치 정보, 이름, 전화번호</span>
          </div>
          <Ic n="x" style={{ color: "var(--color-red)" }} />
        </div>
      </div>
      <p className="cap">보호자와 대리 보호자가 누가 봤는지 바로 알 수 있게 하기 위해서예요.</p>
    </div>
    <div className="bt col">
      <a className="btn btn-p full" href="#/B1">
        <Ic n="check" />
        동의하고 보기
      </a>
      <a className="btn btn-t full" href="#/Q1">
        돌아가기
      </a>
    </div>
  </>
);

export const B1 = () => (
  <>
    <header className="ab">
      <span></span>
      <h1>1단계 정보</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <p className="scope">
        <Ic n="bell" style={{ color: "var(--color-p-d)" }} />
        보호자에게 열람 알림이 갔어요
      </p>
      <Emergency />
      <p className="note">
        <Ic n="lock" />
        <span>일과·진정법·연락처는 2단계예요. 보호자가 허락하면 열려요.</span>
      </p>
    </div>
    <div className="bt">
      <a className="btn btn-p grow" href="#/B2">
        <Ic n="lock" />
        2단계 열람 요청
      </a>
      <a className="btn btn-t" href="#/B1" aria-disabled="true" aria-label="보호자 전화">
        <Ic n="phone" />
      </a>
    </div>
  </>
);

export const B2 = () => {
  const [error, setError] = useState("");
  // shortcut: 누구·사유 선택은 서버에 보내지 않음 (DetailReq에 칸이 없다)
  const send = () =>
    api<S["DetailStatus"]>(`/public/access/${qrToken}/detail-requests`, "POST", {}).then(
      (r) => (sessionStorage.setItem("detailReq", r.id!), (location.hash = "#/B2b")),
      (e: Error) => setError(e.message),
    );
  return (
    <>
      <header className="ab">
        <a className="l" href="#/B1" aria-label="뒤로">
          <Ic n="back" />
        </a>
        <h1>2단계 열람 요청</h1>
        <span></span>
      </header>
      <div className="ct tight">
        <p className="lbl" id="l-who">
          어떤 분이세요?
        </p>
        <div className="opts three" role="radiogroup" aria-labelledby="l-who">
          <span className="opt on" role="radio" aria-checked="true">
            <Ic n="check" />
            돌봄 인력
          </span>
          <span className="opt" role="radio" aria-checked="false">
            가족·이웃
          </span>
          <span className="opt" role="radio" aria-checked="false">
            기타
          </span>
        </div>
        <p className="lbl" id="l-why">
          열람 사유
        </p>
        <div className="opts three" role="radiogroup" aria-labelledby="l-why">
          <span className="opt on" role="radio" aria-checked="true">
            <Ic n="check" />
            돌봄 공백
          </span>
          <span className="opt" role="radio" aria-checked="false">
            병원 동행
          </span>
          <span className="opt" role="radio" aria-checked="false">
            기타
          </span>
        </div>
        <span className="inp area">보호자가 입원해 오늘부터 돌봄SOS로 왔어요.</span>
        <p className="note">
          <Ic n="info" />
          <span>보호자와 대리 보호자에게 요청이 가요. 10분 안에 보호자가 인증하면 열려요.</span>
        </p>
        <Err msg={error} />
      </div>
      <div className="bt">
        <button className="btn btn-p full" onClick={send}>
          승인 요청 보내기
        </button>
      </div>
    </>
  );
};

export const B2b = () => {
  const id = sessionStorage.getItem("detailReq");
  const { data: st, error } = useApi<S["DetailStatus"]>(id ? `/public/detail-requests/${id}` : null, { poll: 2000 });
  const left = useLeft(st?.deadlineAt);
  useEffect(() => {
    if (st?.status === "approved" && st.viewToken) {
      sessionStorage.setItem("viewToken", st.viewToken);
      location.hash = "#/B3";
    }
  }, [st]);
  const ended =
    st?.status === "rejected"
      ? "보호자가 거절했어요"
      : st?.status === "expired" || (st && !left.s)
        ? "요청 시간이 지났어요"
        : "";
  return (
    <>
      <header className="ab">
        <span></span>
        <h1>승인 대기</h1>
        <span></span>
      </header>
      <div className="ct mid" style={{ gap: "16px" }}>
        <Err msg={id ? error : "요청을 다시 보내 주세요."} />
        <div className="ring" role="img" aria-label={`남은 시간 ${left.text}`}>
          <svg viewBox="0 0 176 176" aria-hidden="true">
            <circle cx="88" cy="88" r="76" fill="none" stroke="#E6E8EA" strokeWidth="12" />
            <circle
              cx="88"
              cy="88"
              r="76"
              fill="none"
              stroke="#256EF4"
              strokeWidth="12"
              strokeDasharray="477.5"
              strokeDashoffset={477.5 * (1 - left.s / 600)}
            />
          </svg>
          <div>
            <b>{left.text}</b>
            <span>남은 시간</span>
          </div>
        </div>
        <h2 className="h2">{ended || "보호자에게 요청을 보냈어요"}</h2>
        <p>{ended ? "다시 요청할 수 있어요." : "승인되면 바로 열려요."}</p>
        <p className="note">
          <Ic n="info" />
          <span>10분 안에 보호자가 인증하지 않으면 요청이 만료돼요. 1단계 정보는 계속 볼 수 있어요.</span>
        </p>
        <a className="btn btn-t full" href="#/B1">
          1단계 정보 다시 보기
        </a>
        <a className="btn btn-x full" href="#/B1">
          <span className="row">
            <Ic n="clock" />
            시간 경과
          </span>
          <small>시연용 · 시연 때만 보여요</small>
        </a>
      </div>
    </>
  );
};

export const B3 = () => {
  const vt = sessionStorage.getItem("viewToken");
  const { data: d, error } = useApi<S["Detail"]>(vt ? `/public/detail/${vt}` : null);
  return (
    <>
      <header className="ab">
        <a className="l" href="#/B1" aria-label="뒤로">
          <Ic n="back" />
        </a>
        <h1>상세</h1>
        <span></span>
      </header>
      <div className="ct tight">
        <Err msg={vt ? error : "보호자가 허락하면 볼 수 있어요."} />
        <p className="scope">
          <Ic n="check" style={{ color: "var(--color-grn)" }} />
          보호자가 확인했어요 · {when(d?.viewExpiresAt)}까지
        </p>
        {d?.notice && (
          <p className="note">
            <Ic n="info" />
            <span>
              {d.notice}
              <br />
              마지막 확인: {when(d.lastCheckedAt, false)}
            </span>
          </p>
        )}
        <a className="understanding-entry" href="#/B5">
          <Ic n="chat" />
          <span>
            <b>인수인계 함께 확인</b>
            <small>생활 안내를 읽고 내 말로 설명해요</small>
          </span>
          <Ic n="next" />
        </a>
        {d?.records?.map((r, k) => (
          <div className="aic" key={k}>
            <div className="row">
              <span className="bdg bdg-gray">{r.category}</span>
            </div>
            <p>{r.summary}</p>
            <p className="q">
              <b>원문</b> “{r.quote}”
            </p>
          </div>
        ))}
        {d?.medications?.map((m, k) => (
          <div className="slot" key={k}>
            <p>
              <Ic n="clock" />
              {m.timing}
            </p>
            <div>
              {m.name ?? "이름 가림"}
              <span>{m.dose}</span>
            </div>
            {m.caution && (
              <div>
                <span className="bdg bdg-gray">주의가 필요한 약 · {m.caution}</span>
              </div>
            )}
          </div>
        ))}
        {!!d?.medications?.length && <p className="cap">약 정보 출처: 식품의약품안전처</p>}
        <p className="cap">약 이름은 돌봄자 화면에만 보여요.</p>
      </div>
      <div className="bt">
        <a className="btn btn-t grow" href="#/C2" style={{ fontSize: "17px" }}>
          당사자 카드
        </a>
        <a className="btn btn-s grow" href="#/B4">
          <Ic n="pen" />
          기록 남기기
        </a>
      </div>
    </>
  );
};

export const B4 = () => (
  <>
    <header className="ab">
      <a className="l" href="#/B3" aria-label="뒤로">
        <Ic n="back" />
      </a>
      <h1>기록 남기기</h1>
      <span></span>
    </header>
    <div className="ct">
      <p className="lbl">식사</p>
      <div className="row">
        <span className="ck on" role="checkbox" aria-checked="true">
          <Ic n="check" />
          아침
        </span>
        <span className="ck on" role="checkbox" aria-checked="true">
          <Ic n="check" />
          점심
        </span>
        <span className="ck" role="checkbox" aria-checked="false">
          저녁
        </span>
      </div>
      <p className="lbl">복약</p>
      <div className="row">
        <span className="ck on" role="checkbox" aria-checked="true">
          <Ic n="check" />
          아침 약
        </span>
        <span className="ck" role="checkbox" aria-checked="false">
          저녁 약
        </span>
      </div>
      <p className="lbl">다음 사람에게 넘길 한 줄</p>
      <span className="inp area">밤에 혼자 나가려 한 적이 있어요.</span>
      <p className="cap">이 기록은 보호자가 돌아오면 확인해요.</p>
    </div>
    <div className="bt">
      <a className="btn btn-p full" href="#/B3">
        저장
      </a>
    </div>
  </>
);

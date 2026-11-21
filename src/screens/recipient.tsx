// 디자인 원본: github.com/sgggg123/ieum-sucheop prototype/app.html (9e8f206) 마크업·문구를 그대로 옮김
import { Ic } from "../Icons";

export const C1a = () => (
  <>
    <header className="ab">
      <span></span>
      <h1>오늘 할 일</h1>
      <span></span>
    </header>
    <div className="ct tight">
      <p className="when">
        <Ic n="check" style={{ width: "18px", height: "18px", strokeWidth: "3" }} />끝
      </p>
      <div className="step done">
        <span className="pic">
          <Ic n="img" />
          밥그릇
          <br />
          사진
        </span>
        <b>점심 먹기</b>
      </div>
      <p className="when now">지금</p>
      <div className="step now">
        <span className="pic">
          <Ic n="img" />늘 쓰는
          <br />컵 사진
        </span>
        <b>간식 먹기</b>
      </div>
      <p className="when">다음</p>
      <div className="step">
        <span className="pic">
          <Ic n="img" />
          운동화
          <br />
          사진
        </span>
        <b>산책하기</b>
      </div>
      <div className="step">
        <span className="pic">
          <Ic n="img" />
          선생님
          <br />
          사진
        </span>
        <b>
          저녁 먹고
          <br />
          선생님과 약 먹기
        </b>
      </div>
    </div>
    <div className="bt">
      <a className="btn btn-t full" href="#/B3">
        돌봄자 화면으로
      </a>
    </div>
  </>
);

export const C1b = () => (
  <>
    <header className="ab">
      <span></span>
      <h1>지금 할 일</h1>
      <span></span>
    </header>
    <div className="ct mid" style={{ gap: "22px" }}>
      <p style={{ fontSize: "22px", fontWeight: "700", color: "var(--color-t2)" }}>오후 3시 15분</p>
      <p className="one">
        지금은 간식 드실
        <br />
        시간이에요
      </p>
      <span className="pic" style={{ width: "220px", height: "160px" }}>
        <Ic n="img" />늘 쓰시던 컵 사진
      </span>
      <p style={{ fontSize: "20px", fontWeight: "700" }}>다음: 4시 산책하기</p>
    </div>
    <div className="bt">
      <a className="btn btn-t full" href="#/B3">
        돌봄자 화면으로
      </a>
    </div>
  </>
);

export const C2 = () => (
  <>
    <header className="ab">
      <span></span>
      <h1>안심 카드</h1>
      <span></span>
    </header>
    <div className="ct mid" style={{ gap: "28px" }}>
      <span className="avatar">
        <Ic n="user" />
        돌봄자 사진
      </span>
      <p className="one" style={{ fontSize: "31px" }}>
        오늘은 박○○ 선생님이
        <br />
        함께 있어요.
      </p>
    </div>
    <div className="bt">
      <a className="btn btn-p full" style={{ minHeight: "72px", fontSize: "22px" }} href="#/C1b">
        알겠어요
      </a>
    </div>
  </>
);

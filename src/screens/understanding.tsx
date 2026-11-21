// 인수인계 이해 확인(B5~B5e). 원본: sgggg123/ieum-sucheop prototype/understanding.js
// 서버와 AI 호출 없이 동작하는 UI 체험. 준비된 예시 답변만 비교하고 입력과 결과는 메모리에만 둔다.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Ic } from "../Icons";

type Topic = (typeof topics)[number];
type Result = "confirmed" | "pending";
type Feedback = { kind: "complete" | "partial" | "unverified"; covered: string[] };

const topics = [
  {
    id: "walk",
    title: "산책 준비",
    category: "일과",
    question: "산책을 나갈 때 어떻게 준비하시겠어요?",
    quote: "산책할 때는 현관 옆 지팡이를 챙기고, 꼭 함께 나가 주세요.",
    points: [
      { id: "cane", label: "현관 옆 지팡이 챙기기", quote: "현관 옆 지팡이를 챙기고" },
      { id: "together", label: "혼자 보내지 않고 함께 나가기", quote: "꼭 함께 나가 주세요" },
    ],
    examples: [
      { label: "일부만 설명", text: "현관 옆 지팡이를 챙겨 드릴게요.", covered: ["cane"] },
      { label: "모두 설명", text: "현관 옆 지팡이를 챙기고 제가 함께 나갈게요.", covered: ["cane", "together"] },
      { label: "잘 모르겠어요", text: "어떻게 준비해야 할지 잘 모르겠어요.", covered: [] },
    ],
  },
  {
    id: "conversation",
    title: "대화 시작",
    category: "의사소통",
    question: "말을 걸 때 어떻게 이야기하시겠어요?",
    quote: "앞에서 눈을 맞추고, 한 번에 한 문장씩 천천히 말해 주세요.",
    points: [
      { id: "eye-contact", label: "앞에서 눈을 맞추기", quote: "앞에서 눈을 맞추고" },
      { id: "slowly", label: "한 문장씩 천천히 말하기", quote: "한 번에 한 문장씩 천천히 말해 주세요" },
    ],
    examples: [
      { label: "일부만 설명", text: "앞에서 눈을 맞추고 이야기할게요.", covered: ["eye-contact"] },
      {
        label: "모두 설명",
        text: "앞에서 눈을 맞추고 한 문장씩 천천히 이야기할게요.",
        covered: ["eye-contact", "slowly"],
      },
      { label: "잘 모르겠어요", text: "어떻게 말을 걸어야 할지 잘 모르겠어요.", covered: [] },
    ],
  },
];

const initial = {
  index: 0,
  answer: "",
  attempts: 0,
  feedback: null as Feedback | null,
  results: {} as Record<string, Result>,
};
const normalize = (t: string) => t.normalize("NFC").replace(/[\s.,!?。！？]/g, "");
const go = (id: string) => (location.hash = "#/" + id);

function compare(topic: Topic, answer: string): Feedback {
  const ex = topic.examples.find((e) => normalize(e.text) === normalize(answer));
  if (!ex || !ex.covered.length) return { kind: "unverified", covered: [] };
  return { kind: ex.covered.length === topic.points.length ? "complete" : "partial", covered: ex.covered };
}

const header: Record<string, [back: string, label: string, title: string]> = {
  B5: ["B3", "2단계 상세로", "인수인계 함께 확인"],
  B5a: ["B5", "이해 확인 시작으로", "인수인계 함께 확인"],
  B5b: ["B5a", "안내 다시 읽기", "인수인계 함께 확인"],
  B5c: ["B5b", "내 설명 수정하기", "인수인계 함께 확인"],
  B5d: ["B3", "2단계 상세로", "함께 확인한 내용"],
  B5e: ["B1", "1단계 정보로", "열람 만료"],
};

const Context = () => (
  <p className="tb-context">
    <span>김순자 님의 생활 안내</span>
    <span className="tb-tag">2단계 예시</span>
  </p>
);

const Source = ({ topic, open = false }: { topic: Topic; open?: boolean }) => (
  <details className="tb-source" open={open}>
    <summary>
      보호자가 남긴 원문
      <Ic n="down" />
    </summary>
    <blockquote>“{topic.quote}”</blockquote>
    <p>
      {topic.category} 항목 / 마지막 확인 11월 18일
      <br />
      보호자 확인 표시를 포함한 예시 데이터
    </p>
  </details>
);

const Btn = ({ onClick, children }: { onClick: () => void; children: string }) => (
  <button type="button" className="btn btn-p full" onClick={onClick}>
    {children}
  </button>
);
const TextBtn = ({ onClick, children }: { onClick: () => void; children: string }) => (
  <button type="button" className="tb-link" onClick={onClick}>
    {children}
  </button>
);

/** B5* 화면끼리 이동할 때 같은 컴포넌트로 남아 상태가 이어진다 */
export function Understanding({ id }: { id: string }) {
  const [s, setS] = useState(initial);
  const ct = useRef<HTMLDivElement>(null);
  const h = useRef<HTMLHeadingElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const topic = topics[s.index];
  const nextAfter = (results: Record<string, Result>) =>
    topics.findIndex((t, i) => i > s.index && results[t.id] !== "confirmed");

  useEffect(() => {
    ct.current?.scrollTo(0, 0);
    h.current?.focus({ preventScroll: true });
  }, [id, s.index]);

  const openTopic = (index: number, results = s.results) => {
    setS({ ...initial, index, results });
    go("B5a");
  };
  const finish = (result: Result) => {
    const results = { ...s.results, [topic.id]: result };
    const next = nextAfter(results);
    if (next < 0) {
      setS({ ...s, results });
      go("B5d");
    } else openTopic(next, results);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!s.answer.trim()) return;
    setS({ ...s, feedback: compare(topic, s.answer), attempts: s.attempts + 1 });
    go("B5c");
  };

  const progress = (active: number) => (
    <>
      <p className="tb-progress">
        <b>
          안내 {s.index + 1} / {topics.length}
        </b>
        <span>{topic.title}</span>
      </p>
      <ol className="tb-steps" aria-label="안내 확인 단계">
        {["안내 읽기", "내 말로 설명", "함께 확인"].map((label, i) => (
          <li key={label} aria-current={i === active ? "step" : undefined}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>
    </>
  );

  let body, footer;
  if (id === "B5") {
    body = (
      <>
        <Context />
        <span className="tb-hero">
          <Ic n="chat" />
        </span>
        <p className="tb-eyebrow">돌봄을 시작하기 전에</p>
        <h2 className="h1" ref={h} tabIndex={-1}>
          읽은 내용을,
          <br />
          함께 확인해요
        </h2>
        <p className="tb-copy">안내를 읽고 편하게 설명해 주세요.</p>
        <div className="card tb-topics">
          <div className="tb-topic">
            <Ic n="clock" />
            <div>
              <strong>산책 준비</strong>
              <p>챙길 것과 함께할 사람을 확인해요.</p>
            </div>
          </div>
          <div className="tb-topic">
            <Ic n="chat" />
            <div>
              <strong>대화 시작</strong>
              <p>편안한 대화 방법을 확인해요.</p>
            </div>
          </div>
        </div>
        <p className="tb-note">
          기억력을 시험하는 과정이 아니에요.
          <br />
          놓친 내용은 다시 보여드릴게요.
        </p>
        <p className="tb-note">
          예시 데이터와 준비된 답변으로 체험해요.
          <br />
          실제 AI 분석이나 기록 저장은 하지 않아요.
        </p>
      </>
    );
    footer = <Btn onClick={() => openTopic(0, {})}>생활 안내 2개 확인하기</Btn>;
  } else if (id === "B5a") {
    body = (
      <>
        <Context />
        {progress(0)}
        <p className="tb-eyebrow">보호자가 꼭 전하고 싶은 내용</p>
        <h2 className="h1" ref={h} tabIndex={-1}>
          {topic.id === "walk" ? (
            <>
              산책 전에
              <br />
              이렇게 준비해 주세요
            </>
          ) : (
            <>
              말을 걸 때는
              <br />
              이렇게 이야기해 주세요
            </>
          )}
        </h2>
        <div className="card tb-guide">
          <blockquote>{topic.quote}</blockquote>
        </div>
        <Source topic={topic} />
        <p className="tb-copy">
          다음에는 내 말로 설명해 볼게요.
          <br />
          원문을 그대로 외우지 않아도 괜찮아요.
        </p>
        <TextBtn onClick={() => finish("pending")}>나중에 확인할게요</TextBtn>
      </>
    );
    footer = <Btn onClick={() => go("B5b")}>내 말로 설명하기</Btn>;
  } else if (id === "B5b") {
    body = (
      <>
        {progress(1)}
        <h2 className="h1" ref={h} tabIndex={-1}>
          {topic.question}
        </h2>
        <form id="tb-answer-form" onSubmit={submit}>
          <label className="lbl" htmlFor="tb-answer">
            내 설명
          </label>
          <textarea
            id="tb-answer"
            ref={answerRef}
            rows={3}
            maxLength={500}
            value={s.answer}
            onChange={(e) => setS({ ...s, answer: e.target.value })}
            placeholder="어떻게 하실지 편하게 적어 주세요."
            aria-describedby="tb-answer-help"
          />
          <p className="tb-note" id="tb-answer-help">
            아래 예시만 비교하는 UI 체험이에요.
            <br />
            자유 답변은 확인 필요로 남겨요.
          </p>
        </form>
        <div className="tb-examples" role="group" aria-label="체험용 답변 넣기">
          {topic.examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              aria-pressed={ex.text === s.answer}
              onClick={() => {
                setS({ ...s, answer: ex.text });
                answerRef.current?.focus();
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
        <Source topic={topic} />
        <TextBtn onClick={() => finish("pending")}>잘 모르겠어요. 확인 필요로 남기기</TextBtn>
      </>
    );
    footer = (
      <button type="submit" form="tb-answer-form" className="btn btn-p full" disabled={!s.answer.trim()}>
        설명 확인하기
      </button>
    );
  } else if (id === "B5c") {
    // 주소로 바로 열어도 대표 예시를 보여 준다
    const v = s.feedback
      ? s
      : { ...s, answer: topic.examples[0].text, feedback: compare(topic, topic.examples[0].text), attempts: 1 };
    const { kind, covered } = v.feedback!;
    const retry = kind !== "complete" && v.attempts < 2;
    body = (
      <>
        {progress(2)}
        <h2 className="h1 tb-feedback-title" ref={h} tabIndex={-1}>
          {kind === "complete" ? (
            <>
              좋아요, 이렇게
              <br />
              함께해 주세요
            </>
          ) : kind === "partial" ? (
            <>
              한 가지만
              <br />더 확인해 볼까요?
            </>
          ) : (
            <>
              원문과 한 번 더<br />
              확인이 필요해요
            </>
          )}
        </h2>
        <div className="tb-answer">
          <span className="tb-note">내가 설명한 내용</span>
          <p>{v.answer}</p>
        </div>
        {kind === "unverified" ? (
          <p className="note">예시 밖의 답변은 판단하지 않아요. 원문을 다시 보거나 보호자에게 확인해 주세요.</p>
        ) : (
          <ul className="tb-points">
            {topic.points.map((p) => {
              const found = covered.includes(p.id);
              return (
                <li key={p.id} className={found ? "" : "tb-missing"}>
                  <Ic n={found ? "check" : "info"} />
                  <div>
                    <strong>{p.label}</strong>
                    <small>{found ? "설명에 담겼어요" : "원문에서 다시 찾았어요"}</small>
                    {!found && <blockquote>“{p.quote}”</blockquote>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Source topic={topic} open={kind === "unverified"} />
        {retry && <TextBtn onClick={() => finish("pending")}>확인 필요로 남기고 계속하기</TextBtn>}
        {kind !== "complete" && !retry && (
          <p className="tb-note">
            지금 확실하지 않아도 괜찮아요.
            <br />
            보호자에게 확인할 내용으로 남겨요.
          </p>
        )}
      </>
    );
    footer =
      kind === "complete" ? (
        <Btn onClick={() => finish("confirmed")}>{nextAfter(s.results) < 0 ? "확인 마치기" : "다음 안내 보기"}</Btn>
      ) : retry ? (
        <Btn onClick={() => go("B5b")}>한 번 더 설명하기</Btn>
      ) : (
        <Btn onClick={() => finish("pending")}>확인 필요로 남기고 계속</Btn>
      );
  } else if (id === "B5d") {
    const pending = topics.filter((t) => s.results[t.id] !== "confirmed");
    body = (
      <>
        <Context />
        <h2 className="h1" ref={h} tabIndex={-1}>
          {pending.length ? (
            <>
              확인이 필요한 안내가
              <br />
              남아 있어요
            </>
          ) : (
            <>
              생활 안내 2개를
              <br />
              함께 확인했어요
            </>
          )}
        </h2>
        <p className="tb-copy">
          {pending.length ? "모르는 내용은 추측하지 않고 남겨 두었어요." : "돌봄 중에도 원문을 다시 볼 수 있어요."}
        </p>
        <div className="tb-stats">
          <div>
            <b>{topics.length - pending.length}</b>
            <span>확인한 안내</span>
          </div>
          <div>
            <b>{pending.length}</b>
            <span>확인 필요</span>
          </div>
        </div>
        <div>
          {topics.map((t, i) => {
            const ok = s.results[t.id] === "confirmed";
            return (
              <button key={t.id} type="button" className="tb-result" onClick={() => openTopic(i)}>
                <Ic n={ok ? "check" : "info"} />
                <span>
                  <b>{t.title}</b>
                  <small>{ok ? "내용을 함께 확인했어요" : "원문 또는 보호자 확인이 필요해요"}</small>
                </span>
                <Ic n="next" />
              </button>
            );
          })}
        </div>
        <p className="tb-note">
          결과는 이 체험 안에서만 유지돼요.
          <br />
          돌봄 수행이나 자격을 판정하지 않아요.
        </p>
        <TextBtn
          onClick={() => {
            setS(initial);
            go("B5");
          }}
        >
          처음부터 체험하기
        </TextBtn>
      </>
    );
    footer = pending.length ? (
      <Btn onClick={() => openTopic(topics.findIndex((t) => s.results[t.id] !== "confirmed"))}>
        필요한 안내 다시 확인하기
      </Btn>
    ) : (
      <a className="btn btn-p full" href="#/B3">
        2단계 상세로 돌아가기
      </a>
    );
  } else {
    body = (
      <>
        <span className="tb-hero">
          <Ic n="lock" />
        </span>
        <h2 className="h1" ref={h} tabIndex={-1}>
          2단계 열람이
          <br />
          끝났어요
        </h2>
        <p className="tb-copy">생활 안내와 입력한 답변을 이 화면에서 지웠어요. 다시 보려면 보호자 승인이 필요해요.</p>
        <p className="note">이해 확인 결과로 열람 권한이 늘어나지는 않아요.</p>
        <p className="tb-note">
          만료와 재승인을 보여 주는 UI 예시예요.
          <br />
          실제 서버의 접근 제어는 아직 연결하지 않았어요.
        </p>
      </>
    );
    footer = (
      <a className="btn btn-p full" href="#/B1">
        1단계 정보로 돌아가기
      </a>
    );
  }

  const [back, label, title] = header[id];
  return (
    <section className="scr understanding" id={id}>
      <header className="ab">
        <a className="l" href={`#/${back}`} aria-label={label}>
          <Ic n="back" />
        </a>
        <h1>{title}</h1>
        <span className="r">체험</span>
      </header>
      <div className="ct" ref={ct}>
        {body}
      </div>
      <div className="bt">{footer}</div>
    </section>
  );
}

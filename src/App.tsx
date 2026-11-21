import { useEffect, useSyncExternalStore } from "react";
import { IconSprite } from "./Icons";
import { screens } from "./screens";
import { Understanding } from "./screens/understanding";
import { qrToken } from "./api";

// 프로토타입과 같은 #/화면id 주소. QR로 들어오면 /a/{토큰}#/Q1 … 처럼 경로에 토큰이 남는다
const subscribe = (cb: () => void) => {
  addEventListener("hashchange", cb);
  return () => removeEventListener("hashchange", cb);
};
const useHash = () => useSyncExternalStore(subscribe, () => location.hash);

export default function App() {
  const hash = useHash().replace(/^#\/?/, "");
  const id = Object.hasOwn(screens, hash) ? hash : qrToken ? "Q1" : "L0";
  const { title, C } = screens[id];

  useEffect(() => {
    document.title = `${title} · 이음수첩`;
  }, [title]);

  return (
    <main
      className="app"
      // 시연용으로만 있는 버튼은 눌러도 이동하지 않음
      onClickCapture={(e) => (e.target as Element).closest('[aria-disabled="true"]') && e.preventDefault()}
    >
      <IconSprite />
      {C ? (
        <section className="scr" id={id}>
          <C />
        </section>
      ) : (
        <Understanding id={id} />
      )}
    </main>
  );
}

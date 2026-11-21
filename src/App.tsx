import { useEffect, useSyncExternalStore } from "react";
import { IconSprite } from "./Icons";
import { screens } from "./screens";
import { Understanding } from "./screens/understanding";

// 프로토타입과 같은 #/화면id 주소. shortcut: QR 링크(/q/:token 등)를 붙일 때 React Router로 바꾼다
const subscribe = (cb: () => void) => {
  addEventListener("hashchange", cb);
  return () => removeEventListener("hashchange", cb);
};
const useHash = () => useSyncExternalStore(subscribe, () => location.hash);

export default function App() {
  const hash = useHash().replace(/^#\/?/, "");
  const id = Object.hasOwn(screens, hash) ? hash : "L0";
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

// 예시 QR 무늬 (실제로 찍히는 코드는 아님). shortcut: 진짜 QR은 QR 발급 API 붙일 때 qrcode.react로 바꾼다
const n = 29, q = 2, m = 25;
let seed = 20261121;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const finder = (x: number, y: number) => (x < 8 && y < 8) || (x >= m - 8 && y < 8) || (x < 8 && y >= m - 8);
let d = "";
for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) if (!finder(x, y) && rnd() > 0.5) d += `M${x + q} ${y + q}h1v1h-1z`;

const Eye = ({ x, y }: { x: number; y: number }) => (
  <>
    <rect x={x + q} y={y + q} width="7" height="7" />
    <rect x={x + q + 1} y={y + q + 1} width="5" height="5" fill="#fff" />
    <rect x={x + q + 2} y={y + q + 2} width="3" height="3" />
  </>
);

export const FakeQr = () => (
  <svg viewBox="0 0 29 29" style={{ width: 60, height: 60, flex: "none" }} role="img" aria-label="김순자 님 QR (예시)">
    <rect width={n} height={n} fill="#fff" />
    <g fill="#13294B">
      <Eye x={0} y={0} />
      <Eye x={m - 7} y={0} />
      <Eye x={0} y={m - 7} />
      <path d={d} />
    </g>
  </svg>
);

// Vercel Routing Middleware: /api → Railway 백엔드 (같은 출처라 iOS Safari도 쿠키 유지).
// vercel.json rewrite를 안 쓰는 이유: Origin + X-Forwarded-Host가 같이 가면 백엔드 CORS가 403을 낸다
export const config = { matcher: "/api/:path*" };

const BACKEND = "https://ieum-be-production.up.railway.app";

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const headers = new Headers(req.headers);
  for (const h of ["origin", "host", "x-forwarded-host", "x-forwarded-port"]) headers.delete(h);
  const res = await fetch(BACKEND + url.pathname + url.search, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer(),
    redirect: "manual",
  });
  const out = new Headers(res.headers);
  out.delete("content-encoding"); // fetch가 이미 풀어 준 본문이라 그대로 두면 브라우저가 두 번 푼다
  out.delete("content-length");
  return new Response(res.body, { status: res.status, headers: out });
}

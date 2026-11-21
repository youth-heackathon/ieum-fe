// 타입은 백엔드 명세에서 만든다. 백엔드 API가 바뀌면 다시 실행:
//   npx openapi-typescript ../ieum-be/ieum-be/docs/openapi.json -o src/schema.d.ts
import { useEffect, useState } from "react";
import type { components } from "./schema";

export type S = components["schemas"];

/** /api 호출. 실패하면 서버 메시지(ProblemDetail.detail)로 throw. */
export async function api<T = unknown>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (res.status === 401) location.hash = "#/L0";
  if (!res.ok) throw new Error(data?.detail ?? `요청이 실패했어요 (${res.status})`);
  return data as T;
}

const once = new Map<string, Promise<unknown>>();
/** 화면을 열 때 부르는 POST를 한 번만 보낸다 (StrictMode 두 번 실행·화면 오가기에도 기록·알림이 겹치지 않게). */
const postOnce = <T>(path: string) => {
  if (!once.has(path))
    once.set(
      path,
      api(path, "POST").catch((e) => (once.delete(path), Promise.reject(e))),
    );
  return once.get(path) as Promise<T>;
};
/** postOnce 결과를 버린다 (path 없으면 전부: 새 체험 세션을 시작할 때). */
export const fresh = (path?: string) => (path ? once.delete(path) : once.clear());

/** 화면 데이터. poll(ms)을 주면 그 간격으로 다시 받는다. post=true면 postOnce. */
export function useApi<T>(path: string | null, { poll = 0, post = false } = {}) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!path) return;
    let alive = true;
    const load = () =>
      (post ? postOnce<T>(path) : api<T>(path)).then(
        (d) => alive && (setData(d), setError("")),
        (e: Error) => alive && setError(e.message),
      );
    load();
    const t = poll ? setInterval(load, poll) : undefined;
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [path, poll, post]);
  return { data, error };
}

/** 마감까지 남은 초와 "m:ss" (1초마다 갱신). */
export function useLeft(until?: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = until ? Math.max(0, Math.round((Date.parse(until) - now) / 1000)) : 0;
  return { s, text: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` };
}

/** "11월 21일 오후 3:12" (time=false면 "11월 21일") */
export const when = (iso?: string, time = true) =>
  iso
    ? new Date(iso).toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        ...(time && { hour: "numeric", minute: "2-digit" }),
      })
    : "";

/** User-Agent → "Android · Chrome" */
const OS: [RegExp, string][] = [
  [/Android/, "Android"],
  [/iPhone|iPad/, "iPhone"],
  [/Windows/, "Windows"],
  [/Mac/, "Mac"],
];
// 순서 중요: 삼성·카카오톡·Chrome UA에도 "Safari"가 들어 있다
const BR: [RegExp, string][] = [
  [/SamsungBrowser/, "삼성 인터넷"],
  [/KAKAOTALK/, "카카오톡"],
  [/CriOS|Chrome/, "Chrome"],
  [/Firefox|FxiOS/, "Firefox"],
  [/Safari/, "Safari"],
];
const pick = (ua: string, list: [RegExp, string][], none: string) => list.find(([re]) => re.test(ua))?.[1] ?? none;
export const device = (ua = "") => `${pick(ua, OS, "기기")} · ${pick(ua, BR, "브라우저")}`;

/** QR로 들어온 주소 /a/{qrToken} (백엔드가 정한 형식) */
export const qrToken = location.pathname.match(/^\/a\/([\w-]+)/)?.[1];

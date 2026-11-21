import type { CSSProperties } from "react";

/** 프로토타입 아이콘 스프라이트. App에서 한 번 그린다 */
export const IconSprite = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <symbol id="i-back" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </symbol>
    <symbol id="i-next" viewBox="0 0 24 24">
      <path d="M9 6l6 6-6 6" />
    </symbol>
    <symbol id="i-down" viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" />
    </symbol>
    <symbol id="i-chat" viewBox="0 0 24 24">
      <path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z" />
    </symbol>
    <symbol id="i-check" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" />
    </symbol>
    <symbol id="i-x" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" />
    </symbol>
    <symbol id="i-alert" viewBox="0 0 24 24">
      <path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </symbol>
    <symbol id="i-cam" viewBox="0 0 24 24">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </symbol>
    <symbol id="i-mic" viewBox="0 0 24 24">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" />
    </symbol>
    <symbol id="i-phone" viewBox="0 0 24 24">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
    </symbol>
    <symbol id="i-pen" viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
    </symbol>
    <symbol id="i-shield" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </symbol>
    <symbol id="i-pill" viewBox="0 0 24 24">
      <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z" />
      <path d="M8.5 8.5l7 7" />
    </symbol>
    <symbol id="i-music" viewBox="0 0 24 24">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </symbol>
    <symbol id="i-user" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" />
    </symbol>
    <symbol id="i-clock" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </symbol>
    <symbol id="i-qr" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
    </symbol>
    <symbol id="i-lock" viewBox="0 0 24 24">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </symbol>
    <symbol id="i-bell" viewBox="0 0 24 24">
      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 01-3.4 0" />
    </symbol>
    <symbol id="i-info" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </symbol>
    <symbol id="i-hand" viewBox="0 0 24 24">
      <path d="M18 11V6a2 2 0 00-4 0v5M14 10V4a2 2 0 00-4 0v6M10 10.5V6a2 2 0 00-4 0v8a8 8 0 0016 0v-3a2 2 0 00-4 0" />
    </symbol>
    <symbol id="i-img" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </symbol>
    <symbol id="i-away" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </symbol>
    <symbol id="i-home" viewBox="0 0 24 24">
      <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" />
    </symbol>
    <symbol id="i-doc" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </symbol>
    <symbol id="i-set" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </symbol>
    <symbol id="i-sb" viewBox="0 0 66 12">
      <g fill="currentColor" stroke="none">
        <rect x="0" y="8" width="3" height="4" rx=".6" />
        <rect x="5" y="6" width="3" height="6" rx=".6" />
        <rect x="10" y="3" width="3" height="9" rx=".6" />
        <rect x="15" y="0" width="3" height="12" rx=".6" />
        <path d="M29 3.6a9 9 0 0112 0l-1.4 1.5a7 7 0 00-9.2 0zM31.6 6.4a5.3 5.3 0 016.8 0L37 7.9a3.3 3.3 0 00-4 0zM35 11.6l-1.9-2a2.6 2.6 0 013.8 0z" />
        <rect x="42" y="1" width="21" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="44" y="3" width="15" height="6" rx="1" />
        <rect x="64" y="4" width="1.6" height="4" rx=".8" />
      </g>
    </symbol>
    <symbol id="logo" viewBox="15 7 66 80">
      <g transform="translate(0 -2)">
        {" "}
        <circle cx="48" cy="24" r="14" fill="#005FC7" /> <circle cx="42.5" cy="21" r="2.4" fill="#FFFFFF" />{" "}
        <circle cx="53.5" cy="21" r="2.4" fill="#FFFFFF" />{" "}
        <path
          d="M41 27.5 C43.5 33.5 52.5 33.5 55 27.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(48 86) scale(.9) translate(-48 -86)">
        {" "}
        <path d="M45.5 39 C38 31 14 29 13 49 C12 63 28 74 45.5 86 Z" fill="#005FC7" />{" "}
        <path d="M50.5 39 C58 31 82 29 83 49 C84 63 68 74 50.5 86 Z" fill="#005FC7" />{" "}
        <rect x="19.3" y="42.3" width="9.4" height="9.4" rx="2.6" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />{" "}
        <circle cx="24" cy="47" r="1.9" fill="#FFFFFF" />{" "}
        <rect x="32" y="42" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="37" y="47" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="32" y="52" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="21.5" y="57" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="27" y="57" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="37" y="57" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="27" y="62.5" width="4" height="4" rx="1" fill="#FFFFFF" />
        <rect x="32" y="62.5" width="4" height="4" rx="1" fill="#FFFFFF" />
      </g>
    </symbol>
  </svg>
);

/** 장식 아이콘 (화면낭독기는 읽지 않음) */
export const Ic = ({ n, style }: { n: string; style?: CSSProperties }) => (
  <svg className="ic" style={style} aria-hidden="true" focusable="false">
    <use href={`#i-${n}`} />
  </svg>
);

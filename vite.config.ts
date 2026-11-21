import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    // ieum-be (Spring Boot). 로컬 백엔드가 없으면 .env.local에 API_TARGET=https://<railway 백엔드 도메인>
    proxy: {
      "/api": {
        target: loadEnv(mode, ".", "").API_TARGET || "http://localhost:8080",
        changeOrigin: true,
        // 같은 출처 프록시라 Origin이 필요 없다. 남기면 백엔드 CORS가 localhost를 403으로 막는다
        configure: (proxy) => proxy.on("proxyReq", (req) => req.removeHeader("origin")),
      },
    },
  },
}));

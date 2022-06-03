import { defineConfig } from "vite";
import ssr from 'vite-plugin-ssr/plugin'
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ ssr: true }), ssr()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    // configure vite for HMR with Gitpod
    hmr: process.env.GITPOD_WORKSPACE_URL
      ? {
        // removes the protocol and replaces it with the port we're connecting to
        host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
        protocol: 'wss',
        clientPort: 443,
      }
      : true,
    proxy: {
      '/api': {
        target: 'http://localhost:8885/.netlify/functions',
        changeOrigin: true,
        rewrite: (path: String) => path.replace(/^\/api/, ''),
      },
    },
  },
});

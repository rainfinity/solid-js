import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    resolve: {
        alias: {
          '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        solidPlugin(),
        AutoImport({
            resolvers: [
              IconsResolver({
                prefix: 'Icon',
                extension: 'jsx',
                alias: {
                    'hero': 'heroicons-solid'
                }
              })
            ],
        }),
        Icons({
            compiler: 'solid',
            defaultClass: 'w-7 h-7 inline-block'
        }),
    ],
    build: {
        target: 'esnext',
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


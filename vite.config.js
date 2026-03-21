import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5176,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'apple-touch-icon.png',
        'pwa-192.png',
        'pwa-512.png',
        'bg-sky.png',
        'icons.svg',
      ],
      manifest: {
        id: './',
        name: 'MOMOTETSU Card Manager',
        short_name: 'カード管理',
        description: '桃太郎電鉄のカード（周遊など）を管理するWebアプリ',
        theme_color: '#7DD3FC',
        background_color: '#7DD3FC',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        start_url: './',
        scope: './',
        lang: 'ja',
        dir: 'ltr',
        categories: ['games', 'utilities'],
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})

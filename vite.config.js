import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/** 本番の配置パス（末尾スラッシュ必須）。相対 base だと start_url が .../run のときアセットが 404 になり白画面になる */
const APP_BASE = '/momotetsu-mgr/run/'

export default defineConfig({
  base: APP_BASE,
  server: {
    host: true,
    port: 5176,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectManifest: {
        globPatterns: [],
        maximumFileSizeToCacheInBytes: 0,
      },
      // precache に含めない（起動時に古いキャッシュを掴まない）
      includeAssets: [],
      includeManifestIcons: false,
      // manifest をプラグインで持つと manifest.webmanifest が必ず precache されるため、
      // public/manifest.webmanifest を静的配信し、ここでは false
      manifest: false,
      devOptions: {
        enabled: false,
      },
    }),
  ],
})

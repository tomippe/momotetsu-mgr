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

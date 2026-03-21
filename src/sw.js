/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// キャッシュに保存せず常に fetch のみ（NetworkOnly と同等）
// ナビゲーションは cache: 'no-store' — 古い index.html が HTTP キャッシュから返り、
// ハッシュ付き JS が 404 になる（リロードで真っ白）のを防ぐ
registerRoute(
  ({ request, url }) =>
    request.method === 'GET' &&
    url.origin === self.location.origin &&
    url.pathname.startsWith('/momotetsu-mgr/run'),
  async ({ request }) => {
    const opts =
      request.mode === 'navigate' ? { cache: 'no-store' } : {}
    return fetch(request, opts)
  }
)

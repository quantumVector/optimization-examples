// Service Worker для эмуляции медленного TTFB
const SLOW_TTFB_DELAY = 2000 // 2 секунды задержка

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    // Задерживаем только навигационные запросы к /ttfb/bad
    if (event.request.mode === 'navigate' && url.pathname.includes('/ttfb/bad')) {
        event.respondWith(
            (async () => {
                // Задержка перед запросом
                await new Promise(resolve => setTimeout(resolve, SLOW_TTFB_DELAY))

                // Делаем реальный запрос
                return fetch(event.request)
            })()
        )
    }
})

self.addEventListener('install', () => {
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})
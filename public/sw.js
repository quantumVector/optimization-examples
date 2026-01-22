const SLOW_TTFB_DELAY = 2000

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    if (event.request.mode === 'navigate' && url.pathname.includes('/ttfb/bad')) {
        event.respondWith(
            (async () => {
                await new Promise(resolve => setTimeout(resolve, SLOW_TTFB_DELAY))

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
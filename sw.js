const CACHE_NAME = 'pwa-demo-v3';
const URLS_TO_CACHE = [
  '/',
  '/pwa-demo/index.html',
  '/pwa-demo/manifest.json',
  '/pwa-demo/sw.js',
  '/pwa-demo/icon-192.png',
  '/pwa-demo/icon-512.png'
];

// 安裝：快取必要資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// 啟用：清除舊快取後接管控制權
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 攔截：快取優先、離線支援
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

// sw.js
self.addEventListener('install', e => {
    // 立刻進入 activate
    self.skipWaiting();
  });
  self.addEventListener('activate', e => {
    // 取代掉舊的 SW
    e.waitUntil(self.clients.claim());
  });
  self.addEventListener('fetch', e => {
    // 簡單放行所有請求，保證它有 fetch handler
    e.respondWith(fetch(e.request));
  });
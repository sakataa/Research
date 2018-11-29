var cacheName = 'cache-v1';
var filesToCache = [
  '/images/IMG_4.JPG',
];

self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function (event) {
  console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.url.indexOf('/images/IMG_4') > -1) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response;
      })
    );
  }
});
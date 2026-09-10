// A simple Service Worker that intentionally caches nothing.

self.addEventListener('install', (event) => {
    // Forces this new service worker to take over immediately
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    // This hunts down and deletes your old 'lessons-cache-v1' 
    // so no devices are stuck on the old version.
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName); 
                })
            );
        })
    );
    self.clients.claim(); 
});

self.addEventListener('fetch', (event) => {
    // Always fetch directly from GitHub, ignoring the cache entirely.
    // Because we aren't caching, you never have to list new HTML files here.
    event.respondWith(fetch(event.request));
});

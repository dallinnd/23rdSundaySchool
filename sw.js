const CACHE_NAME = 'lessons-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './lesson.html',
    './reading.html',
    './styles.css',
    './app.js',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Deletes all existing caches
                    return caches.delete(cacheName); 
                })
            );
        })
    );
    // Forces the new service worker to take control immediately
    self.clients.claim(); 
});


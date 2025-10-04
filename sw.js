// Service Worker for AL Software PWA
const CACHE_NAME = 'al-software-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/masters.js',
    '/notifications.js',
    '/manifest.json',
    'https://i.postimg.cc/mrqz7KtQ/AL-Software.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Service Worker: Serving from cache:', event.request.url);
                    return response;
                }

                return fetch(event.request)
                    .then(fetchResponse => {
                        // Check if valid response
                        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                            return fetchResponse;
                        }

                        // Clone the response
                        const responseToCache = fetchResponse.clone();

                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return fetchResponse;
                    })
                    .catch(error => {
                        console.log('Service Worker: Fetch failed, returning offline page', error);
                        // Return a custom offline page if available
                        return caches.match('/index.html');
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => caches.delete(cache))
                );
            })
        );
    }
});

// Background Sync (for future use)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-masterpieces') {
        console.log('Service Worker: Background sync triggered');
        event.waitUntil(syncMasterpieces());
    }
});

// Function to sync masterpieces (placeholder for future enhancement)
async function syncMasterpieces() {
    try {
        console.log('Service Worker: Syncing masterpieces...');
        // Add sync logic here if needed
        return Promise.resolve();
    } catch (error) {
        console.error('Service Worker: Sync failed', error);
        return Promise.reject(error);
    }
}

// Push Notifications (for future use)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update from AL Software',
        icon: 'https://i.postimg.cc/mrqz7KtQ/AL-Software.png',
        badge: 'https://i.postimg.cc/mrqz7KtQ/AL-Software.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('AL Software', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked');
    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://alsoftware.vercel.app')
    );
});

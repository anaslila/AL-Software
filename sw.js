// Service Worker for AL Software Dashboard v2.0
const CACHE_NAME = 'al-software-dashboard-v2.0';
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
    console.log('[Service Worker] Installing v2.0...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching app shell and content');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating v2.0...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => {
            console.log('[Service Worker] Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch Event - Network First, Fall Back to Cache Strategy
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.includes('postimg.cc')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Check if valid response
                if (!response || response.status !== 200) {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Update cache with fresh content
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                console.log('[Service Worker] Fetched from network:', event.request.url);
                return response;
            })
            .catch(error => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('[Service Worker] Serving from cache:', event.request.url);
                            return cachedResponse;
                        }

                        // If HTML request fails and not in cache, return index
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }

                        console.error('[Service Worker] No cache available for:', event.request.url);
                        return new Response('Offline - Content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', event => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        console.log('[Service Worker] Clearing cache:', cache);
                        return caches.delete(cache);
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] All caches cleared');
                return self.clients.matchAll();
            })
            .then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'CACHE_CLEARED',
                        message: 'All caches have been cleared'
                    });
                });
            })
        );
    }

    if (event.data && event.data.type === 'REFRESH_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('[Service Worker] Refreshing cache');
                    return cache.addAll(urlsToCache);
                })
                .then(() => {
                    return self.clients.matchAll();
                })
                .then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'CACHE_REFRESHED',
                            message: 'Cache has been refreshed'
                        });
                    });
                })
        );
    }
});

// Background Sync for offline actions (for future use)
self.addEventListener('sync', event => {
    console.log('[Service Worker] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-dashboard-data') {
        event.waitUntil(syncDashboardData());
    }
});

// Sync Dashboard Data
async function syncDashboardData() {
    try {
        console.log('[Service Worker] Syncing dashboard data...');
        
        // Fetch latest masterpieces
        const response = await fetch('/masters.js');
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/masters.js', response);
            console.log('[Service Worker] Dashboard data synced successfully');
        }
        
        // Notify all clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'DATA_SYNCED',
                message: 'Dashboard data has been updated'
            });
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
        return Promise.reject(error);
    }
}

// Push Notifications (for future use)
self.addEventListener('push', event => {
    console.log('[Service Worker] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update from AL Software Dashboard',
        icon: 'https://i.postimg.cc/mrqz7KtQ/AL-Software.png',
        badge: 'https://i.postimg.cc/mrqz7KtQ/AL-Software.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: 'https://alsoftware.vercel.app'
        },
        actions: [
            {
                action: 'open',
                title: 'Open Dashboard'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('AL Software', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification clicked:', event.action);
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    // If dashboard is already open, focus it
                    for (let client of clientList) {
                        if (client.url === 'https://alsoftware.vercel.app/' && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Otherwise open new window
                    if (clients.openWindow) {
                        return clients.openWindow('https://alsoftware.vercel.app');
                    }
                })
        );
    }
});

// Notification Close Handler
self.addEventListener('notificationclose', event => {
    console.log('[Service Worker] Notification closed');
});

// Handle errors
self.addEventListener('error', event => {
    console.error('[Service Worker] Error occurred:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', event => {
    console.error('[Service Worker] Unhandled promise rejection:', event.reason);
});

// Log service worker lifecycle
console.log('[Service Worker] AL Software Dashboard v2.0 Service Worker loaded');

// Service Worker for AL Software Dashboard v2.1.0
const CACHE_NAME = 'al-software-dashboard-v2.1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/masters.js',
    '/notifications.js',
    '/manifest.json',
    'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker v2.1.0] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker v2.1.0] Caching app shell and content');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker v2.1.0] Installation complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker v2.1.0] Installation failed:', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker v2.1.0] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker v2.1.0] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => {
            console.log('[Service Worker v2.1.0] Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch Event - Network First, Fall Back to Cache Strategy
self.addEventListener('fetch', event => {
    // Skip cross-origin requests except for postimg.cc
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

                console.log('[Service Worker v2.1.0] Fetched from network:', event.request.url);
                return response;
            })
            .catch(error => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('[Service Worker v2.1.0] Serving from cache:', event.request.url);
                            return cachedResponse;
                        }

                        // If HTML request fails and not in cache, return index
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }

                        console.error('[Service Worker v2.1.0] No cache available for:', event.request.url);
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
    console.log('[Service Worker v2.1.0] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        console.log('[Service Worker v2.1.0] Clearing cache:', cache);
                        return caches.delete(cache);
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker v2.1.0] All caches cleared');
                return self.clients.matchAll();
            })
            .then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'CACHE_CLEARED',
                        message: 'All caches have been cleared',
                        version: 'v2.1.0'
                    });
                });
            })
        );
    }

    if (event.data && event.data.type === 'REFRESH_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('[Service Worker v2.1.0] Refreshing cache');
                    return cache.addAll(urlsToCache);
                })
                .then(() => {
                    return self.clients.matchAll();
                })
                .then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'CACHE_REFRESHED',
                            message: 'Cache has been refreshed',
                            version: 'v2.1.0'
                        });
                    });
                })
        );
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'VERSION_INFO',
                        version: 'v2.1.0',
                        cacheName: CACHE_NAME
                    });
                });
            })
        );
    }
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
    console.log('[Service Worker v2.1.0] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-dashboard-data') {
        event.waitUntil(syncDashboardData());
    }

    if (event.tag === 'sync-masterpieces') {
        event.waitUntil(syncMasterpieces());
    }
});

// Sync Dashboard Data
async function syncDashboardData() {
    try {
        console.log('[Service Worker v2.1.0] Syncing dashboard data...');
        
        // Fetch latest files
        const filesToSync = ['/masters.js', '/notifications.js'];
        const cache = await caches.open(CACHE_NAME);
        
        for (const file of filesToSync) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    await cache.put(file, response);
                    console.log('[Service Worker v2.1.0] Synced:', file);
                }
            } catch (err) {
                console.error('[Service Worker v2.1.0] Failed to sync:', file, err);
            }
        }
        
        // Notify all clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'DATA_SYNCED',
                message: 'Dashboard data has been updated',
                version: 'v2.1.0'
            });
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker v2.1.0] Sync failed:', error);
        return Promise.reject(error);
    }
}

// Sync Masterpieces
async function syncMasterpieces() {
    try {
        console.log('[Service Worker v2.1.0] Syncing masterpieces...');
        
        const response = await fetch('/masters.js');
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/masters.js', response);
            console.log('[Service Worker v2.1.0] Masterpieces synced successfully');
            
            // Notify clients
            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                client.postMessage({
                    type: 'MASTERPIECES_SYNCED',
                    message: 'Masterpieces updated',
                    version: 'v2.1.0'
                });
            });
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker v2.1.0] Masterpieces sync failed:', error);
        return Promise.reject(error);
    }
}

// Push Notifications
self.addEventListener('push', event => {
    console.log('[Service Worker v2.1.0] Push notification received');
    
    let notificationData = {
        title: 'AL Software Dashboard',
        body: 'New update available',
        icon: 'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png',
        badge: 'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png'
    };

    if (event.data) {
        try {
            notificationData = event.data.json();
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }

    const options = {
        body: notificationData.body || 'New update from AL Software Dashboard',
        icon: notificationData.icon || 'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png',
        badge: notificationData.badge || 'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: notificationData.url || 'https://alsoftware.vercel.app',
            version: 'v2.1.0'
        },
        actions: [
            {
                action: 'open',
                title: 'Open Dashboard',
                icon: 'https://i.postimg.cc/4NzMKhWS/Generated-Image-October-04-2025-1-26-PM-removebg-preview.png'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ],
        tag: 'al-software-notification',
        renotify: true,
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification(notificationData.title || 'AL Software', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker v2.1.0] Notification clicked:', event.action);
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    // If dashboard is already open, focus it
                    for (let client of clientList) {
                        if (client.url.includes('alsoftware.vercel.app') && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Otherwise open new window
                    if (clients.openWindow) {
                        return clients.openWindow(event.notification.data.url || 'https://alsoftware.vercel.app');
                    }
                })
        );
    }
});

// Notification Close Handler
self.addEventListener('notificationclose', event => {
    console.log('[Service Worker v2.1.0] Notification closed');
});

// Periodic Background Sync (for future use)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-masterpieces') {
        console.log('[Service Worker v2.1.0] Periodic sync: updating masterpieces');
        event.waitUntil(syncMasterpieces());
    }
});

// Handle errors
self.addEventListener('error', event => {
    console.error('[Service Worker v2.1.0] Error occurred:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', event => {
    console.error('[Service Worker v2.1.0] Unhandled promise rejection:', event.reason);
});

// Cache cleanup on activate
async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('al-software-dashboard-') && name !== CACHE_NAME
    );
    
    console.log('[Service Worker v2.1.0] Cleaning up', oldCaches.length, 'old caches');
    
    return Promise.all(
        oldCaches.map(cache => caches.delete(cache))
    );
}

// Log service worker lifecycle
console.log('%c Service Worker v2.1.0 Loaded ', 'background: #000; color: #0f0; padding: 5px 10px; font-weight: bold;');
console.log('[Service Worker v2.1.0] Cache Name:', CACHE_NAME);
console.log('[Service Worker v2.1.0] Files to Cache:', urlsToCache.length);
console.log('[Service Worker v2.1.0] Ready for installation');

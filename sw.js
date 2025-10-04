// Service Worker for AL Software Dashboard v2.7 Experia
const CACHE_NAME = 'al-software-dashboard-v2.7.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/masters.js',
    '/notifications.js',
    '/manifest.json',
    'https://i.postimg.cc/sQsQ0nH5/new-logo.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker v2.7 Experia] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker v2.7 Experia] Caching app shell and content');
                console.log('[Service Worker v2.7 Experia] Caching 15+ projects data');
                console.log('[Service Worker v2.7 Experia] About Us section with Director Anas Lila');
                console.log('[Service Worker v2.7 Experia] Font: Trebuchet MS | No Gaps Design');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker v2.7 Experia] Installation complete - Ready for 15 masterpieces!');
                console.log('[Service Worker v2.7 Experia] Projects-first priority layout cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker v2.7 Experia] Installation failed:', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker v2.7 Experia] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker v2.7 Experia] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => {
            console.log('[Service Worker v2.7 Experia] Activation complete - Dashboard ready!');
            console.log('[Service Worker v2.7 Experia] Director: Anas Lila | 15+ Projects Live');
            console.log('[Service Worker v2.7 Experia] Seamless Grid (No Gaps) | Trebuchet MS Font');
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

                console.log('[Service Worker v2.7 Experia] Fetched from network:', event.request.url);
                return response;
            })
            .catch(error => {
                // Network failed, try cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('[Service Worker v2.7 Experia] Serving from cache:', event.request.url);
                            return cachedResponse;
                        }

                        // If HTML request fails and not in cache, return index
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }

                        console.error('[Service Worker v2.7 Experia] No cache available for:', event.request.url);
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
    console.log('[Service Worker v2.7 Experia] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        console.log('[Service Worker v2.7 Experia] Clearing cache:', cache);
                        return caches.delete(cache);
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker v2.7 Experia] All caches cleared');
                return self.clients.matchAll();
            })
            .then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'CACHE_CLEARED',
                        message: 'All caches have been cleared',
                        version: 'v2.7 Experia',
                        projects: 15,
                        director: 'Anas Lila',
                        font: 'Trebuchet MS',
                        design: 'No Gaps Grid'
                    });
                });
            })
        );
    }

    if (event.data && event.data.type === 'REFRESH_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('[Service Worker v2.7 Experia] Refreshing cache for 15 projects');
                    return cache.addAll(urlsToCache);
                })
                .then(() => {
                    return self.clients.matchAll();
                })
                .then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'CACHE_REFRESHED',
                            message: 'Cache has been refreshed with latest data',
                            version: 'v2.7 Experia',
                            projects: 15,
                            director: 'Anas Lila',
                            font: 'Trebuchet MS',
                            design: 'Seamless Grid'
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
                        version: 'v2.7 Experia',
                        cacheName: CACHE_NAME,
                        totalProjects: 15,
                        director: 'Anas Lila',
                        font: 'Trebuchet MS',
                        features: [
                            '15+ Projects',
                            'About Us Tab',
                            'Director Profile',
                            'APK Install',
                            'Projects First',
                            'New Logo',
                            'Seamless Grid (No Gaps)',
                            'Trebuchet MS Font'
                        ]
                    });
                });
            })
        );
    }

    if (event.data && event.data.type === 'GET_STATS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.keys().then(keys => {
                    return self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'CACHE_STATS',
                                cachedFiles: keys.length,
                                cacheName: CACHE_NAME,
                                version: 'v2.7 Experia',
                                director: 'Anas Lila',
                                projects: 15,
                                font: 'Trebuchet MS',
                                design: 'No Gaps'
                            });
                        });
                    });
                });
            })
        );
    }
});

// Background Sync for offline actions
self.addEventListener('sync', event => {
    console.log('[Service Worker v2.7 Experia] Background sync triggered:', event.tag);
    
    if (event.tag === 'sync-dashboard-data') {
        event.waitUntil(syncDashboardData());
    }

    if (event.tag === 'sync-masterpieces') {
        event.waitUntil(syncMasterpieces());
    }

    if (event.tag === 'sync-all-projects') {
        event.waitUntil(syncAllProjects());
    }
});

// Sync Dashboard Data
async function syncDashboardData() {
    try {
        console.log('[Service Worker v2.7 Experia] Syncing dashboard data...');
        
        const filesToSync = ['/masters.js', '/notifications.js'];
        const cache = await caches.open(CACHE_NAME);
        
        for (const file of filesToSync) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    await cache.put(file, response);
                    console.log('[Service Worker v2.7 Experia] Synced:', file);
                }
            } catch (err) {
                console.error('[Service Worker v2.7 Experia] Failed to sync:', file, err);
            }
        }
        
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'DATA_SYNCED',
                message: 'Dashboard data updated - 15 projects refreshed',
                version: 'v2.7 Experia',
                director: 'Anas Lila'
            });
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker v2.7 Experia] Sync failed:', error);
        return Promise.reject(error);
    }
}

// Sync Masterpieces
async function syncMasterpieces() {
    try {
        console.log('[Service Worker v2.7 Experia] Syncing 15 masterpieces...');
        
        const response = await fetch('/masters.js');
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/masters.js', response);
            console.log('[Service Worker v2.7 Experia] 15 masterpieces synced successfully');
            
            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                client.postMessage({
                    type: 'MASTERPIECES_SYNCED',
                    message: 'All 15 projects updated',
                    version: 'v2.7 Experia',
                    count: 15,
                    director: 'Anas Lila'
                });
            });
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker v2.7 Experia] Masterpieces sync failed:', error);
        return Promise.reject(error);
    }
}

// Sync All Projects
async function syncAllProjects() {
    try {
        console.log('[Service Worker v2.7 Experia] Syncing all project resources...');
        
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch('/masters.js');
        
        if (response.ok) {
            await cache.put('/masters.js', response);
            console.log('[Service Worker v2.7 Experia] All project data synced');
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker v2.7 Experia] Project sync failed:', error);
        return Promise.reject(error);
    }
}

// Push Notifications
self.addEventListener('push', event => {
    console.log('[Service Worker v2.7 Experia] Push notification received');
    
    let notificationData = {
        title: 'AL Software Dashboard v2.7 Experia',
        body: 'Check out our 15+ professional projects - Director: Anas Lila',
        icon: 'https://i.postimg.cc/sQsQ0nH5/new-logo.png',
        badge: 'https://i.postimg.cc/sQsQ0nH5/new-logo.png'
    };

    if (event.data) {
        try {
            notificationData = event.data.json();
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }

    const options = {
        body: notificationData.body || 'Explore 15+ innovative applications and tools by AL Software',
        icon: notificationData.icon || 'https://i.postimg.cc/sQsQ0nH5/new-logo.png',
        badge: notificationData.badge || 'https://i.postimg.cc/sQsQ0nH5/new-logo.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            url: notificationData.url || 'https://alsoftware.vercel.app',
            version: 'v2.7 Experia',
            projects: 15,
            director: 'Anas Lila'
        },
        actions: [
            {
                action: 'open',
                title: 'View Projects',
                icon: 'https://i.postimg.cc/sQsQ0nH5/new-logo.png'
            },
            {
                action: 'about',
                title: 'About Us',
                icon: 'https://i.postimg.cc/sQsQ0nH5/new-logo.png'
            },
            {
                action: 'close',
                title: 'Dismiss'
            }
        ],
        tag: 'al-software-notification-v2.7',
        renotify: true,
        requireInteraction: false,
        silent: false
    };

    event.waitUntil(
        self.registration.showNotification(notificationData.title || 'AL Software Dashboard v2.7 Experia', options)
    );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker v2.7 Experia] Notification clicked:', event.action);
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    for (let client of clientList) {
                        if (client.url.includes('alsoftware.vercel.app') && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    if (clients.openWindow) {
                        return clients.openWindow(event.notification.data.url || 'https://alsoftware.vercel.app');
                    }
                })
        );
    }
    
    if (event.action === 'about') {
        event.waitUntil(
            clients.openWindow('https://alsoftware.vercel.app/?category=about')
        );
    }
});

// Notification Close Handler
self.addEventListener('notificationclose', event => {
    console.log('[Service Worker v2.7 Experia] Notification closed');
});

// Periodic Background Sync (for future use)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-masterpieces') {
        console.log('[Service Worker v2.7 Experia] Periodic sync: updating 15 masterpieces');
        event.waitUntil(syncMasterpieces());
    }
    
    if (event.tag === 'daily-sync') {
        console.log('[Service Worker v2.7 Experia] Daily sync: refreshing all data');
        event.waitUntil(syncDashboardData());
    }
});

// Handle errors
self.addEventListener('error', event => {
    console.error('[Service Worker v2.7 Experia] Error occurred:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', event => {
    console.error('[Service Worker v2.7 Experia] Unhandled promise rejection:', event.reason);
});

// Cache cleanup on activate
async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('al-software-dashboard-') && name !== CACHE_NAME
    );
    
    console.log('[Service Worker v2.7 Experia] Cleaning up', oldCaches.length, 'old cache(s)');
    
    return Promise.all(
        oldCaches.map(cache => caches.delete(cache))
    );
}

// Cache Statistics
async function getCacheStatistics() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        console.log('[Service Worker v2.7 Experia] Cache contains', keys.length, 'files');
        return keys.length;
    } catch (error) {
        console.error('[Service Worker v2.7 Experia] Failed to get cache stats:', error);
        return 0;
    }
}

// Log service worker lifecycle
console.log('%c Service Worker v2.7 Experia Loaded ', 'background: #000; color: #0f0; padding: 5px 10px; font-weight: bold; font-size: 14px;');
console.log('[Service Worker v2.7 Experia] Cache Name:', CACHE_NAME);
console.log('[Service Worker v2.7 Experia] Files to Cache:', urlsToCache.length);
console.log('[Service Worker v2.7 Experia] Supporting 15+ Professional Projects');
console.log('[Service Worker v2.7 Experia] Director: Anas Lila (MBA in Sales, Mumbai)');
console.log('[Service Worker v2.7 Experia] New Logo Integrated');
console.log('[Service Worker v2.7 Experia] About Us Tab with Director Profile');
console.log('[Service Worker v2.7 Experia] APK Install Support for Android');
console.log('[Service Worker v2.7 Experia] Projects-First Priority Layout');
console.log('[Service Worker v2.7 Experia] Font: Trebuchet MS');
console.log('[Service Worker v2.7 Experia] Design: Seamless Grid (No Gaps)');
console.log('[Service Worker v2.7 Experia] Ready for installation and offline access');

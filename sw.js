const CACHE_NAME = 'phonezone-v6';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Installs the service worker and caches all required libraries
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
});

// Intercepts network requests to serve from cache when offline
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firebasedatabase')) {
    // Let Firebase handle its own offline persistence
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    // Serve other assets from cache first
    e.respondWith(
      caches.match(e.request).then(res => res || fetch(e.request))
    );
  }
});

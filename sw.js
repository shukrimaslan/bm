// ── sw.js — BM Vocab Service Worker ─────────────────────────────
const CACHE_NAME = 'bmvocab-v1';

// Files to cache on install (app shell)
const APP_SHELL = [
  '/',
  '/index.html',
  '/home.html',
  '/study.html',
  '/quiz.html',
  '/progress.html',
  '/leaderboard.html',
  '/profile.html',
  '/friends.html',
  '/onboarding.html',
  '/js/firebase.js',
  '/js/streak.js',
  '/js/theme.js',
  '/js/i18n.js',
  '/js/cache.js',
  '/js/guest.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
];

// ── Install: cache app shell ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache what we can — ignore failures for external URLs
      return Promise.allSettled(
        APP_SHELL.map(url =>
          cache.add(url).catch(e => console.warn('Cache miss:', url, e))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ───────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first with cache fallback ─────────────────────
self.addEventListener('fetch', event => {
  // Skip non-GET and Firebase API requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('firestore.googleapis.com')) return;
  if (event.request.url.includes('firebase')) return;
  if (event.request.url.includes('gstatic.com/firebasejs')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        // Network failed — serve from cache
        caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback for HTML navigation requests
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/home.html');
          }
        })
      )
  );
});

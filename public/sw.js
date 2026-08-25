const CACHE_NAME = "toolzium-v2";
const STATIC_ASSETS = [
  "/",
  "/tools",
  "/manifest.json",
];

// Install: cache essential offline assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: purge all old caches immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", k);
            return caches.delete(k);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // API routes -> network only
  if (url.pathname.startsWith("/api/")) return;

  // For Next.js scripts and dynamic pages -> Network First, fall back to cache
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok && !url.pathname.startsWith("/api/")) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
        }
        return res;
      })
      .catch(() => caches.match(request))
  );
});

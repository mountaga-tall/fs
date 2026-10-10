const CACHE = "fs-bazar-v20261010-pwa3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/boutique.html",
  "/arrivages.html",
  "/a-propos.html",
  "/contact.html",
  "/styles.css",
  "/app.js",
  "/manifest.webmanifest",
  "/favicon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/logo.webp",
  "/banner.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Cache assets individually: one optional/missing URL must not cancel the whole install.
    await Promise.all(APP_SHELL.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok && response.type === "basic") await cache.put(url, response);
      } catch (_) {
        // Continue installing; a failed asset can be fetched on a later visit.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("fs-bazar-") && key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        const cached = await caches.match(request, { ignoreSearch: true });
        if (cached) return cached;
        const path = url.pathname.endsWith("/") ? "/index.html" : url.pathname;
        return (await caches.match(path)) || (await caches.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

  const isCode = /\.(?:css|js)$/i.test(url.pathname);
  if (isCode) {
    // Prefer fresh code online, but keep a cached copy for offline visits.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (_) {
        return (await cache.match(request, { ignoreSearch: true })) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});

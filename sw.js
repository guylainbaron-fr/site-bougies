const CACHE_NAME = 'jf-aniuta-v2'; // Changement de version pour forcer la mise à jour
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Force l'activation immédiate
});

// Activation et nettoyage
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Gestion des requêtes - CORRIGÉ
self.addEventListener('fetch', (event) => {
  // NE PAS intercepter les requêtes vers Brevo ou les API externes
  if (!event.request.url.startsWith(self.location.origin)) {
    return; 
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
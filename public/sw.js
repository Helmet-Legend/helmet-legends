const CACHE_NAME = "helmet-legends-v1";
const ASSETS_TO_CACHE = ["/", "/index.html", "/manifest.json", "/icon-512.png"];

// Installation : on met en cache les fichiers critiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("PWA : Fichiers mis en cache");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation : on nettoie les anciens caches si nécessaire
self.addEventListener("activate", (event) => {
  console.log("PWA : Service Worker activé");
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // On retourne le fichier du cache s'il existe, sinon on fait la requête réseau
      return response || fetch(event.request);
    })
  );
});

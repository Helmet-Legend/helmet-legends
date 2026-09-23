const CACHE_NAME = "helmet-legends-v2";
const ASSETS_TO_CACHE = ["/manifest.json", "/icon-512.png"];

// Installation : on met en cache les fichiers statiques non versionnés
// et on active immédiatement le nouveau Service Worker.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activation : on supprime les anciens caches et on prend le contrôle
// des onglets déjà ouverts, pour qu'un nouveau déploiement soit pris
// en compte sans que l'utilisateur ait à vider son cache manuellement.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Requêtes : réseau en priorité (pour toujours servir le dernier build),
// avec repli sur le cache uniquement si le réseau est indisponible.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Notifications push (nouveau message reçu).
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "Helmet Legends", body: event.data?.text() || "" };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Helmet Legends", {
      body: data.body || "",
      icon: "/icon-512.png",
      badge: "/icon-512.png",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) return client.focus();
        }
        if (self.clients.openWindow) return self.clients.openWindow(url);
      })
  );
});

// Version bumpée pour purger les entrées cross-origin (Supabase) mises en
// cache par erreur par les versions précédentes de ce fichier.
const CACHE_NAME = "helmet-legends-v3";
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
// Seules les requêtes same-origin sont mises en cache : les appels vers
// Supabase (API privée, jeton d'authentification dans l'en-tête) ou tout
// autre service tiers ne doivent jamais finir dans le Cache Storage local.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const isSameOrigin = new URL(event.request.url).origin === self.location.origin;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (isSameOrigin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => (isSameOrigin ? caches.match(event.request) : Promise.reject()))
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

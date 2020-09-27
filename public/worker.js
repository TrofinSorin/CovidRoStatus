var CACHE_STATIC_NAME = "static-v4";
var CACHE_DYNAMIC_NAME = "dynamic-v2";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(["/", "/index.html"]);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // eslint-disable-next-line no-restricted-globals
  return self.clients.claim();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (res) {
            if (!(event.request.url.indexOf("http") === 0)) {
              return;
            }

            return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function (err) {});
      }
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", function (e) {
  console.log("e:", e);
  console.log("e.data:", e.data);
  if (e.data === "skipWaiting") {
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
  }
});

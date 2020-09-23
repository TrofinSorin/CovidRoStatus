// var CACHE_NAME = "pwa-task-manager";
// var urlsToCache = ["/"];

// // Install a service worker
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("install", (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("message", (e) => {
//   console.log("e:", e);
//   console.log("e.data:", e.data);
//   if (e.data === "skipWaiting") {
//     // eslint-disable-next-line no-restricted-globals
//     self.skipWaiting();
//   }
// });

// // Cache and return requests
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames
//           .filter(function (cacheName) {
//             return cacheName.startsWith(CACHE_NAME) && cacheName !== CACHE_NAME;
//           })
//           .map(function (cacheName) {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });

var CACHE_STATIC_NAME = "static-v4";
var CACHE_DYNAMIC_NAME = "dynamic-v2";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(["/"]);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
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
            return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
              if (!/^https?:$/i.test(new URL(event.request.url).protocol)) {
                return;
              }

              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function (err) {});
      }
    })
  );
});

// Detects if device is on iOS
// const isIos = () => {
//   const userAgent = window.navigator.userAgent.toLowerCase();
//   return /iphone|ipad|ipod/.test(userAgent);
// };
// // Detects if device is in standalone mode
// const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

// // Checks if should display install popup notification:
// if (isIos() && !isInStandaloneMode()) {
//   this.setState({ showInstallMessage: true });
// }

// source: https://googlechrome.github.io/samples/service-worker/basic/
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
// const PRECACHE = 'precache-v1';
// const RUNTIME = 'runtime';

// // A list of local resources we always want to be cached.
// const PRECACHE_URLS = [
//   'index.html',
//   './', // Alias for index.html
//   'styles.css',
//   '../../styles/main.css',
//   'demo.js'
// ];

// // The install handler takes care of precaching the resources we always need.
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches
//       .open(PRECACHE)
//       .then(cache => cache.addAll(PRECACHE_URLS))
//       .then(
//         // eslint-disable-next-line no-restricted-globals
//         self.skipWaiting()
//       )
//   );
// });

// // The activate handler takes care of cleaning up old caches.
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('activate', event => {
//   const currentCaches = [PRECACHE, RUNTIME];
//   event.waitUntil(
//     caches
//       .keys()
//       .then(cacheNames => {
//         return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
//       })
//       .then(cachesToDelete => {
//         return Promise.all(
//           cachesToDelete.map(cacheToDelete => {
//             return caches.delete(cacheToDelete);
//           })
//         );
//       })
//       .then(() =>
//         // eslint-disable-next-line no-restricted-globals
//         self.clients.claim()
//       )
//   );
// });

// // The fetch handler serves responses for same-origin resources from a cache.
// // If no response is found, it populates the runtime cache with the response
// // from the network before returning it to the page.
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('fetch', event => {
//   // Skip cross-origin requests, like those for Google Analytics.
//   // eslint-disable-next-line no-restricted-globals
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME).then(cache => {
//           return fetch(event.request).then(response => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });

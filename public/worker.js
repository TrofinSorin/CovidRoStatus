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

// Set a name for the current cache
var cacheName = "v1";

// Default files to always cache
var cacheFiles = ["./", "./index.html"];

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Installed");

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function (cache) {
      // Add all the default files to the cache
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  ); // end e.waitUntil
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          // If a cached item is saved under a previous cacheName
          if (thisCacheName !== cacheName) {
            // Delete that cached file
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  ); // end e.waitUntil
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", function (e) {
  console.log("[ServiceWorker] Fetch", e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches
      .match(e.request)

      .then(function (response) {
        // If the request is in the cache
        if (response) {
          console.log(
            "[ServiceWorker] Found in Cache",
            e.request.url,
            response
          );
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        fetch(requestClone)
          .then(function (response) {
            if (!response) {
              console.log("[ServiceWorker] No response from fetch ");
              return response;
            }

            var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function (cache) {
              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log("[ServiceWorker] New Data Cached", e.request.url);

              // Return the response
              return response;
            }); // end caches.open
          })
          .catch(function (err) {
            console.log(
              "[ServiceWorker] Error Fetching & Caching New Data",
              err
            );
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
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

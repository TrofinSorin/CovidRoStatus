import { registerRoute } from "workbox-routing";

if (typeof importScripts === "function") {
  // eslint-disable-next-line
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    workbox.core.skipWaiting();

    // cache name
    workbox.core.setCacheNameDetails({
      prefix: "My-awesome-cache",
      precache: "precache",
      runtime: "runtime",
    });

    /* injection point for manifest files.  */
    // eslint-disable-next-line
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    registerRoute(
      new RegExp(
        "https://covid19.geo-spatial.org/api/dashboard/v2/getHealthCasesByCounty"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "getHealthCasesByCounty",
      })
    );

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: "PRODUCTION",
        })
      )
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

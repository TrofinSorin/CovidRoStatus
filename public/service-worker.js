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
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: "PRODUCTION",
        })
      )
    );

    workbox.routing.registerRoute(
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

    workbox.routing.registerRoute(
      new RegExp(
        "https://covid19.geo-spatial.org/api/dashboard/v2/getHealthCasesByCounty"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "getHealthCasesByCounty",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "googleapis",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "googleapis fonts",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        " https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "googlesyndication",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.0/d3.min.js"),
      new workbox.strategies.NetworkFirst({
        cacheName: "cloudflare",
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

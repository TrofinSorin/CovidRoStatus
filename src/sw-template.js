if (typeof importScripts === "function") {
  // eslint-disable-next-line
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    // eslint-disable-next-line
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
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
      new RegExp("https://www.googletagmanager.com/gtag/js?id=UA-161540769-1"),
      new workbox.strategies.NetworkFirst({
        cacheName: "googletagmanager",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://www.google-analytics.com/analytics.js"),
      new workbox.strategies.NetworkFirst({
        cacheName: "google-analytics",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://coronavirus-19-api.herokuapp.com/countries"),
      new workbox.strategies.NetworkFirst({
        cacheName: "herokuapp-countries",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://covid19.geo-spatial.org/api/dashboard/getGlobalStat"),
      new workbox.strategies.NetworkFirst({
        cacheName: "getGlobalStat",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Persoane_in_carantina%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "22Persoane_in_carantina",
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
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "googlesyndication",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://www.googletagmanager.com/gtag/js?id=UA-161540769-1"),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "googletagmanager",
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

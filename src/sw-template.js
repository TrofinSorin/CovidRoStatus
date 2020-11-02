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
      new workbox.strategies.CacheFirst({
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
      new workbox.strategies.CacheFirst({
        cacheName: "herokuapp-countries",
      })
    );

    workbox.routing.registerRoute(
      new RegExp("https://covid19.geo-spatial.org/api/dashboard/getGlobalStat"),
      new workbox.strategies.CacheFirst({
        cacheName: "getGlobalStat",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Judete asc&resultOffset=0&resultRecordCount=42&cacheHint=true"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "22Persoane_in_carantina",
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

    workbox.routing.registerRoute(
      new RegExp(
        "https://covid19.geo-spatial.org/api/dashboard/v2/getCasesByCounty"
      ),
      new workbox.strategies.CacheFirst({
        cacheName: "getCasesByCounty",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=[{'statisticType':'sum','onStatisticField':'Persoane_in_carantina','outStatisticFieldName':'value'}]&cacheHint=true"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "arcgis services7",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://services7.arcgis.com/I8e17MZtXFDX9vvT/arcgis/rest/services/Coronavirus_romania/FeatureServer/0/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=[{'statisticType':'sum','onStatisticField':'Persoane_izolate','outStatisticFieldName':'value'}]&cacheHint=true"
      ),
      new workbox.strategies.NetworkFirst({
        cacheName: "arcgis services8",
      })
    );

    workbox.routing.registerRoute(
      new RegExp(
        "https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap"
      ),
      new workbox.strategies.CacheFirst({
        cacheName: "googleapis Baloo",
      })
    );

    // js/css files
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "static-resources",
      })
    );

    // images
    workbox.routing.registerRoute(
      // Cache image files.
      /\.(?:png|jpg|jpeg|svg|gif)$/,
      // Use the cache if it's available.
      new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: "image-cache",
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

if (typeof importScripts === "function") {
  // eslint-disable-next-line
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    // eslint-disable-next-line
    workbox.precaching.precacheAndRoute([
      { revision: "a978eaa9d422420ada1b05249a472f0a", url: "index.html" },
      {
        revision: "aa93475d28f6fa687fe15c88c5d2f4a7",
        url: "precache-manifest.aa93475d28f6fa687fe15c88c5d2f4a7.js",
      },
      {
        revision: "71d7fb4a0add2ff8410533cf5808374b",
        url: "static/css/2.00a338ba.chunk.css",
      },
      {
        revision: "2374836cf82944726c90f3a4241ba789",
        url: "static/css/main.5cfff51a.chunk.css",
      },
      {
        revision: "413fd8dc426529fd09b1463f6f958f4e",
        url: "static/js/10.6bbb8e1b.chunk.js",
      },
      {
        revision: "a42aa3f94600389b8a8e449f82c5b8e4",
        url: "static/js/11.4346cbb9.chunk.js",
      },
      {
        revision: "1572720b5008e2c2427078bcb5353c1c",
        url: "static/js/12.fe46a65d.chunk.js",
      },
      {
        revision: "add3247d71f0c962d9594b3ba9be6f52",
        url: "static/js/13.b424a655.chunk.js",
      },
      {
        revision: "0f74122f404d99b4085c510bd5c9b5bf",
        url: "static/js/14.1abca933.chunk.js",
      },
      {
        revision: "3c5a5e030f5ed29de081800f0f5701b3",
        url: "static/js/15.c1791f00.chunk.js",
      },
      {
        revision: "35cdc573f72b0383a3ed9cc9bc808312",
        url: "static/js/16.fabf5b29.chunk.js",
      },
      {
        revision: "ff50a7a48ee4c91201dccbeba4ab9fa0",
        url: "static/js/17.1f2c530c.chunk.js",
      },
      {
        revision: "c74465f93480a74c5d1510ac467c4bc7",
        url: "static/js/18.21cc277a.chunk.js",
      },
      {
        revision: "8cff861782b18331fac0c808b72aacd4",
        url: "static/js/19.c4dbf70c.chunk.js",
      },
      {
        revision: "d3601e899e5b24174881d31d7d69ff8b",
        url: "static/js/2.ff570f60.chunk.js",
      },
      {
        revision: "d0aab7c51ba7bf95b9c31951f0d2ba1a",
        url: "static/js/20.820a651f.chunk.js",
      },
      {
        revision: "524c7b1715cb13b7c5af1d072839e5e4",
        url: "static/js/21.d3c88cb5.chunk.js",
      },
      {
        revision: "db437ea8d5779cba7f5919be08f8ee2c",
        url: "static/js/22.506f0663.chunk.js",
      },
      {
        revision: "ee6e31a084fd7e4fb1e5568c384e9a21",
        url: "static/js/23.52b688ce.chunk.js",
      },
      {
        revision: "b3cd91ce4aa667cf9e330174c68e3c49",
        url: "static/js/24.313a12c1.chunk.js",
      },
      {
        revision: "f91e81b3609c7be300369e2683a4a779",
        url: "static/js/25.86ea2094.chunk.js",
      },
      {
        revision: "f74d6f187845c4cfb8b1f6357d1da76a",
        url: "static/js/26.2e1901c2.chunk.js",
      },
      {
        revision: "2169fd28608a5e1e4b90242eb63fba26",
        url: "static/js/27.676c2f08.chunk.js",
      },
      {
        revision: "6d18c6fd0182e764d5eebb714e8e802a",
        url: "static/js/28.8e6b79a4.chunk.js",
      },
      {
        revision: "fb87f2f012f4508a2567b571b3404d45",
        url: "static/js/29.58fad8fc.chunk.js",
      },
      {
        revision: "4c80605ab829ae350a678eca0b8a29b0",
        url: "static/js/3.7ff89701.chunk.js",
      },
      {
        revision: "7d862c1551cd6f5c1d70818d5d1f2637",
        url: "static/js/30.aeed530c.chunk.js",
      },
      {
        revision: "a612657b0269e0216fb47b4cc0c0babc",
        url: "static/js/31.cc793f04.chunk.js",
      },
      {
        revision: "8a28a0e382b88aa920f5600e8e5b9bf1",
        url: "static/js/32.e80bffbf.chunk.js",
      },
      {
        revision: "e8cbde52a2e70561cd7fe0facb2dc764",
        url: "static/js/33.685b978f.chunk.js",
      },
      {
        revision: "c0c99311085619859589ebb838c17f97",
        url: "static/js/34.3758a899.chunk.js",
      },
      {
        revision: "1e20dbf43faeeadd654c35648e989bf2",
        url: "static/js/35.2aa5a769.chunk.js",
      },
      {
        revision: "aa34a6f5fd48742ee808aff248bedf61",
        url: "static/js/36.2a31e9b9.chunk.js",
      },
      {
        revision: "a65d6a8668f378c970076eb4bda18302",
        url: "static/js/37.7fa2b0cc.chunk.js",
      },
      {
        revision: "fa38ed496838f39d03b88c20a9d80fa9",
        url: "static/js/38.866a397a.chunk.js",
      },
      {
        revision: "7dce365bfa7e4e0a58bfa5918ab4248a",
        url: "static/js/39.8e56ce65.chunk.js",
      },
      {
        revision: "678668c83f69e7c43f3aeb28e485740d",
        url: "static/js/4.a270b0c4.chunk.js",
      },
      {
        revision: "78f72209481538ab14facdc012206f8e",
        url: "static/js/40.9d2d6630.chunk.js",
      },
      {
        revision: "39bbbed57ab99a498090b0fa2fb209ab",
        url: "static/js/41.8b353046.chunk.js",
      },
      {
        revision: "6ddd531a3bcd77c31544600d36d1e1c8",
        url: "static/js/42.9d78d592.chunk.js",
      },
      {
        revision: "b6c1be646f80305ed3766e31bc3a4508",
        url: "static/js/43.bc865a39.chunk.js",
      },
      {
        revision: "4acab5a637d6c693e719998389441e79",
        url: "static/js/44.f998168f.chunk.js",
      },
      {
        revision: "c6ae552734245ae71f393e2c66f59e4d",
        url: "static/js/5.1b9d4ab9.chunk.js",
      },
      {
        revision: "12ab5446475dc889d85410801b91c2e4",
        url: "static/js/6.a008ed25.chunk.js",
      },
      {
        revision: "00b9b451554483524f575f8615dfd14e",
        url: "static/js/7.7c140e26.chunk.js",
      },
      {
        revision: "ca8e8a18925499f7c19e8535a8b1820e",
        url: "static/js/8.b11a9972.chunk.js",
      },
      {
        revision: "438201fe2a60ab4c8d5534e08fa119c1",
        url: "static/js/9.54c12c00.chunk.js",
      },
      {
        revision: "9aeb6a71fe52a9fda7c13559430a2eee",
        url: "static/js/main.1062da18.chunk.js",
      },
      {
        revision: "a8a7183332676425ddfe914866f61ce1",
        url: "static/js/runtime-main.ac9aa29c.js",
      },
    ]);
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

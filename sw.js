/* ver. 1.0.2 30.03.2021 */

const cacheName = 'planweeia-cache-v1.2';
const resourcesToPrecache = [
  '/',
  '/index.php',
  '/plan-img.php',
  '/planweeia.js?v=1.5.0',
  '/planweeia.css?v=1.5.0',
  '/BeerSlider.js?v=1.0.0',
  '/BeerSlider.css?v=1.0.1',
  '/plan-1et-aim.png',
  '/plan-1et-aim_old.png',
  '/diff-plan-1et-aim.png',
  '/terminy.png',
  '/weeia_logo.png',
];

self.addEventListener('install', event => {
  console.log("Attempting to install service worker and cache assets");
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log("Resources added to cache", cacheName);
        return cache.addAll(resourcesToPrecache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log("Activating service worker and deleting old caches if exist");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
    .then(() => {
      return self.clients.claim();
    })
  );
});

/**
 * Modified 'cache falling back to network' strategy with 
 * deleting old and adding new fetched files to the cache.
 * Strategy: try cache -> try net and add to cache -> try cache with ignoreSearch.
 * If is a net, index.php is always loaded from the net.
 */

self.addEventListener('fetch', event => {
  console.log("Fetch", event.request.url);
  event.respondWith(async function() {
    const cache = await caches.open(cacheName);
    var response = await cache.match(event.request, {ignoreVary: true}); //from cache without ignoreSearch
    if (response && !/\/(index\..*)?$/.test(event.request.url)) {
      console.log("Load from cache:", event.request.url);
      return response;
    } else {
      try {  //from net
        response = await fetch(event.request);
        var responseToCache = response.clone();
        if (response && response.ok && (response.status == 200 || response.status == 304)) {
          console.log("Load from net:", event.request.url);
          console.log("Delete old and add new fetched file to cache");
          cache.delete(event.request, {ignoreVary: true, ignoreSearch: true});
          cache.put(event.request, response.clone());
        } else {
          throw Error("Response from net not ok");
        }
      } catch (err) {  //from cache with ignoreSearch
        console.log(err);
        console.log("Load from cache with ignored search:", event.request.url);
        response = await cache.match(event.request, {ignoreVary: true, ignoreSearch: true});
      }
      if (response) return response;
      else throw Error("No response at all");
    }
  }());
});
const cacheName = 'planair-cache-v1';
const resourcesToPrecache = [
  '/test/',
  '/test/index.php',
  '/test/planair.js',
  '/test/planair.css',
  '/test/BeerSlider.js',
  '/test/BeerSlider.css',
  '/test/plan-7air1.png',
  '/test/plan-7air1_old.png',
  '/test/diff-plan-7air1.png',
  '/test/terminy.png',
  '/test/weeia_logo.png',
];

self.addEventListener('install', event => {
  console.log("Attempting to install service worker and cache assets");
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log("Resources added to cache", cacheName);
        return cache.addAll(resourcesToPrecache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log("Activating service worker and deleting old caches if exist");
  //delete any other/old caches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!cacheName.includes(key))
          return caches.delete(key);
      })
    ))
  );
});

//'Network falling back to cache' strategy with adding fetched files to the cache
self.addEventListener('fetch', event => {
  console.log("Fetch", event.request.url);
  event.respondWith(async function() {
    try {
      console.log("Load", event.request.url, "from net");
      return await fetch(event.request)
        .then(response => {
          return caches.open(cacheName)
            .then(cache => {
              console.log("Adding new fetched file to cache");
              cache.add(event.request.url.replace(/\?v=.*$/g,'')); //add without ?v=
              return response;
            });
        });
    } catch (err) {
      console.log(err);
      console.log("Load", event.request.url, "from cache");
      return caches.match(event.request, {ignoreVary: true, ignoreSearch: true}); //match without ?v=
    }
  }());
});
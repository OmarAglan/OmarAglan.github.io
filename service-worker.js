const CACHE_NAME = 'omar-portfolio-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/styles.css',
  './assets/css/swiper-bundle.min.css',
  './assets/js/main.js',
  './assets/js/swiper-bundle.min.js',
  './assets/img/perfil.png',
  './assets/img/about.png',
  './assets/img/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          const fetchOptions = {
            credentials: 'same-origin',
            headers: {
              Accept: url.endsWith('.pdf') ? 'application/pdf' : '*/*',
              'Cache-Control': 'no-cache'
            }
          };
          return fetch(new Request(url), fetchOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              return cache.put(url, response);
            })
            .catch((error) => {
              console.warn(`Failed to cache ${url}: ${error.message}`);
              return Promise.resolve();
            });
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip caching for PDF files unless explicitly requested
  if (event.request.url.endsWith('.pdf')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone the response before caching
          const responseToCache = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            })
            .catch((error) => {
              console.warn(
                `Failed to cache ${event.request.url}: ${error.message}`
              );
            });

          return response;
        })
        .catch((error) => {
          console.error(`Fetch failed: ${error.message}`);
          return new Response('Network error occurred', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      })
      .catch((error) => {
        console.error(`Cache cleanup failed: ${error.message}`);
      })
  );
});

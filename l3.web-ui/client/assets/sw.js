const version = "1.1";
const cacheName = "jmc_cache" + version;
const cacheFiles = [
  "welcome.html",
  "markup.html",
  "manifest_markup.json",
  "manifest_cls.json",
  "cls.html",
  "css/reset.css",
  "images/icons/jmc512.png",
  "bundles/l2.infrastructure/src-page-mvc/markup/markup.js",
  "data/web_components.html",
  "images/icons/favicon.ico",
  "images/icons/jmc144.png",
  "images/me3.png",
  "html/es6-ts-this.html",
  "html/js-for-loops.html"
];
class ServiceWorker {
  constructor() {
    self.addEventListener("install", (e) => {
      this.install(e);
    });
    self.addEventListener("fetch", (e) => {
      this.fetch(e);
    });
    console.log(`sw version: ${version} handlers installed...`);
  }
  addToCache(response) {
    console.log("sw addToCache", response);
    caches.open(cacheName);
    (cache) => cache.put(response);
  }
  install(fe) {
    console.log("sw install event");
    fe.waitUntil(
      caches.open(cacheName).then((cache) => cache.addAll(cacheFiles)).then(() => self.skipWaiting())
    );
  }
  async generateResponse(event) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      console.log("sw cache", cachedResponse.url);
      return cachedResponse;
    }
    console.log("request not in cache, going to netwok and updating cache");
    const networkResponse = fetch(event.request);
    event.waitUntil(cache.put(event.request, networkResponse));
    return networkResponse;
  }
  fetch(fe) {
    if (fe.request.method !== "GET") return;
    fe.respondWith(this.generateResponse(fe));
  }
  push(event) {
    throw new Error("Method not implemented.");
  }
  sync(event) {
    throw new Error("Method not implemented.");
  }
  activate(event) {
    event.waitUntil(
      //   this.cache.keys().then()
    );
    console.log("activate not implemented.");
  }
  message(event) {
    throw new Error("Method not implemented.");
  }
  cache(event) {
    throw new Error("Method not implemented.");
  }
}
const sw = new ServiceWorker();
//# sourceMappingURL=sw.js.map

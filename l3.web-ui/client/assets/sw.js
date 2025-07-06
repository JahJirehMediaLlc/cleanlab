const version = "1.1";
const cacheName = "jmc_cache" + version;
const cacheFiles = [
  "welcome.html",
  "markup.html",
  "cls.html",
  "appshell.html",
  "data/web_components.html",
  "html/es6-ts-this.html",
  "html/js-for-loops.html",
  "manifest_welcome.json",
  "manifest_markup.json",
  "manifest_cls.json",
  "manifest.json",
  "css/reset.css",
  "images/icons/jmc512.png",
  "images/icons/favicon.ico",
  "images/icons/jmc144.png",
  "images/me3.png",
  "bundles/l2.infrastructure/src-page-mvc/markup/markup.js",
  "bundles/l2.infrastructure/src-page-mvc/welcome/welcome.js",
  "bundles/l2.infrastructure/src-page-mvc/cls/cls.js"
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
  install(fe) {
    console.log("sw install event");
    fe.waitUntil(
      caches.open(cacheName).then((cache) => cache.addAll(cacheFiles)).then(() => self.skipWaiting())
    );
  }
  pathName(request) {
    const url = new URL(request.url);
    return url.pathname;
  }
  addToCache(name, request) {
    if (this.pathName(request).length < 2) return;
    console.log(`sw cache:${name} update: `, request.url);
    caches.open(name).then((cache) => cache.add(request));
  }
  async generateResponse(event) {
    const cache = await caches.open(cacheName);
    const cache2 = await caches.open(cacheName + "aux");
    const cachedResponse = await cache.match(event.request);
    const cachedResponse2 = await cache2.match(event.request);
    if (cachedResponse) {
      const url = new URL(cachedResponse.url);
      console.log("sw cached response:", url.pathname);
      return cachedResponse;
    }
    if (cachedResponse2) {
      const url = new URL(cachedResponse2.url);
      console.log("sw cached2 response:", url.pathname);
      return cachedResponse2;
    }
    const networkResponse = fetch(event.request);
    if (!cachedResponse) {
      this.addToCache(cacheName + "aux", event.request);
    }
    return networkResponse;
  }
  fetch(fe) {
    if (fe.request.method !== "GET") return;
    console.log("GET pathname", this.pathName(fe.request));
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

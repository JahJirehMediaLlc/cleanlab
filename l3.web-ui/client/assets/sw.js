const cacheFiles = [
  "markup.html",
  "welcome.html",
  "cls.html",
  "html/es6-ts-this.html",
  "html/js-for-loops.html",
  "images/icons/jmc512.png",
  "images/jmc.png",
  "images/me.jpg",
  "bundles/l2.infrastructure/src-page-mvc/markup/markup.js"
];
class ServiceWorker {
  constructor() {
    self.addEventListener("install", (e) => this.install(e));
    self.addEventListener("fetch", (e) => this.fetch(e));
  }
  install(e) {
    const fe = e;
    fe.waitUntil(
      caches.open("staticCache").then((cache) => cache.addAll(cacheFiles)).then(() => self.skipWaiting())
    );
    console.log("install");
  }
  fetch(e) {
    console.log("fetch");
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
console.log("!!! service worker v0.0.2");
//# sourceMappingURL=sw.js.map

self.addEventListener("install", (e) => {
  console.log("SW is installed", e.toString());
  e.waitUntil(caches.open("staticCache").then(
    (cache) => {
      return cache.addAll([
        "/app_shell.html",
        "/css/common.css",
        "images/me2.png",
        "images/icons/icon48.png",
        "images/mvc_express.txt",
        "images/me.jpg"
      ]);
    }
  ));
});
self.addEventListener("fetch", (e) => {
  console.log("SW is Fetching", e.request.url);
});
console.log("!!! service worker v9");
//# sourceMappingURL=sw.js.map

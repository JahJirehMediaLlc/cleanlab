//
self.addEventListener('install', (e)=>{
    console.log("SW is installed", e.toString());

    (e as FetchEvent).waitUntil(caches.open('staticCache')
        .then(cache => {
            return cache.addAll([
                '/app_shell.html',
                '/css/common.css',
                'images/me2.png',
                "images/icons/icon48.png",
                "images/mvc_express.txt",
                "images/me.jpg"
            ])
        }
        ));
});
//
self.addEventListener('fetch', (e) => {

    console.log("SW is Fetching", (e as FetchEvent).request.url);

});
//
console.log("!!! service worker v9");

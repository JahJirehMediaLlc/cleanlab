//
import {IServiceWorker} from "./sw-lib.ts";

const cacheFiles = [
'markup.html',
'welcome.html',
'cls.html',
'html/es6-ts-this.html',
'html/js-for-loops.html', 
"images/icons/jmc512.png",
'images/jmc.png',
"images/me.jpg",
"bundles/l2.infrastructure/src-page-mvc/markup/markup.js"
];

class ServiceWorker implements IServiceWorker{

    constructor(){
        self.addEventListener('install', (e)=>this.install(e));
        self.addEventListener('fetch', (e) => this.fetch(e));
    }

    install(e:Event){
        const fe: FetchEvent = e;

        fe.waitUntil(
            caches.open('staticCache')
            .then(cache => cache.addAll( cacheFiles  ))
            .then( () => self.skipWaiting() )
        );

        console.log("install");
    }

    fetch(e:Event){
    console.log("fetch")
    }

    push(event: Event){
        throw new Error("Method not implemented.");
    }

    sync(event: Event) {
        throw new Error("Method not implemented.");
    }

    activate(event: Event) {

        // delete old chache is the name if different
        event.waitUntil(

         //   this.cache.keys().then()
        )

        console.log("activate not implemented.");
    }

    message(event: Event) {
        throw new Error("Method not implemented.");
    }

    cache(event: Event) {
        throw new Error("Method not implemented.");
    }

}

console.log("!!! service worker v0.0.2");
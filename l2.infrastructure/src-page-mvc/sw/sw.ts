//
import {IServiceWorker} from "./sw-lib.ts";

const version:string   = "1.1";
const cacheName = "jmc_cache"+version;
const cacheFiles = [
    'welcome.html',
    'markup.html',
    'cls.html',
    'data/web_components.html',
    'html/es6-ts-this.html',
    'html/js-for-loops.html',
    'manifest_welcome.json',
    'manifest_markup.json',
    'manifest_cls.json',
    'css/reset.css',
    'images/icons/jmc512.png',
    'images/icons/favicon.ico',
    'images/icons/jmc144.png',
    'images/me3.png',
    'bundles/l2.infrastructure/src-page-mvc/markup/markup.js',
    'bundles/l2.infrastructure/src-page-mvc/welcome/welcome.js',
    'bundles/l2.infrastructure/src-page-mvc/cls/cls.js'
];

class ServiceWorker implements IServiceWorker{

    constructor(){
        self.addEventListener('install', (e) => {this.install(e)} );
        self.addEventListener('fetch'  , (e) => {this.fetch(e)} );

        console.log(`sw version: ${version} handlers installed...`);
    }


    install(fe:FetchEvent){

        console.log("sw install event");

        fe.waitUntil(
            caches.open(cacheName)
            .then(cache => cache.addAll( cacheFiles  ))
            .then( () => self.skipWaiting() )
        );

    }

    pathName(request:Request):string{
        const url:URL = new URL(request.url);

        return url.pathname;
    }

    addToCache(name:string, request:Request){
        if(this.pathName(request).length < 2)return;

        console.log("sw cache update: ", request.url);

        caches.open(name).then( cache => cache.add(request) );
    }

    async generateResponse(event:FetchEvent):Promise<Response>{
        const cache = await caches.open(cacheName);
        const cache2 = await caches.open(cacheName+"aux");
        const cachedResponse = await cache.match(event.request);
        const cachedResponse2 = await cache2.match(event.request);

        // if not in cache fetch from network then add to cache
        if( cachedResponse ){
            const url =  new URL( cachedResponse!.url);

            console.log("sw cache response:", url.pathname);

            return cachedResponse;
        }
            
        if( cachedResponse2 ){
             const url =  new URL( cachedResponse2!.url);

            console.log("sw cache2 response:", url.pathname);

            return cachedResponse2;
        }
          
        const networkResponse = fetch(event.request);

       if( !cachedResponse ){
           this.addToCache(cacheName+"aux",event.request);     
       }

        return networkResponse;
     }

    fetch(fe:FetchEvent){

        console.log("pathname", this.pathName(fe.request));

        if(fe.request.method !== "GET")return;

        fe.respondWith( this.generateResponse(fe) );
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

const sw = new ServiceWorker();
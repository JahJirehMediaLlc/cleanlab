//
import {IServiceWorker} from "./sw-lib.ts";

const version:string   = "1.1";
const cacheName = "jmc_cache"+version;
const cacheFiles = [
    'welcome.html',
    'markup.html',
    'manifest_markup.json',
    'manifest_cls.json',
    'cls.html',
    'css/reset.css',
    'images/icons/jmc512.png',
    'bundles/l2.infrastructure/src-page-mvc/markup/markup.js',
    'data/web_components.html',
    'images/icons/favicon.ico',
    'images/icons/jmc144.png',
    'images/me3.png',
    'html/es6-ts-this.html',
    'html/js-for-loops.html'
];

class ServiceWorker implements IServiceWorker{

    constructor(){
        self.addEventListener('install', (e) => {this.install(e)} );
        self.addEventListener('fetch'  , (e) => {this.fetch(e)} );

        console.log(`sw version: ${version} handlers installed...`);
    }

    addToCache(request:Request, response:Response){

        console.log("sw cache update: ", response.url);

        caches.open(cacheName+"aux");

        cache => cache.put( request, response  );
    }

    install(fe:FetchEvent){

        console.log("sw install event");

        fe.waitUntil(
            caches.open(cacheName)
            .then(cache => cache.addAll( cacheFiles  ))
            .then( () => self.skipWaiting() )
        );

    }

    async generateResponse(event:FetchEvent):Promise<Response>{
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);

        // if not in cache fetch from network then add to cache
        if(cachedResponse){
            console.log("sw cache response:", cachedResponse.url);
            return cachedResponse;
        }
            
        const networkResponse = fetch(event.request);

        // do not return until cache is updated in background

        networkResponse.then( nr => this.addToCache(event.request, nr.clone()));     

        // event.waitUntil( async () => { 
        //     networkResponse.then( nr => this.addToCache(event.request, nr.clone()));         
        // } );
       
        return networkResponse;
     }

    fetch(fe:FetchEvent){

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
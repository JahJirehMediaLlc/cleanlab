export interface IServiceWorker{
    push(event:Event);
    sync(event:Event);
    activate(event:Event);
    push(event:Event);
    message(event:Event);
    cache(event:Event);
    fetch(event:Event);
}

export class ServiceWorkerClient{
    constructor(){
      this.init();
     // console.log("Service Worker initiated");
    }
    init(){
        if('serviceWorker' in navigator){

            navigator.serviceWorker.register('sw.js').
            then( registration => this.printStatus(registration)).
            catch(error=>console.log("Service worker not supported...", error.message));
        }
    }
    printStatus( registration: any){
        console.log("SW file.  registration completed. scope =", registration.scope);
        console.log("SW file.  registration.active!.state    =", registration.active!.state);
    }

}
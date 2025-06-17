export const version = "8.8";

export type Msg = {
    type:string,
    page:string,
    elementID:string[],
    timestamp:Date,
    payload: any
};

export type Registration = {
    readonly registration: Promise<ServiceWorkerRegistration[] | null>;
  }

export class SvcWorker{
    userCallback:Function = null!;
    pageName = "contact.html";
    workerName = "";
    registration:ServiceWorkerRegistration = null!;
    //
    async registerWorker(aWorker:string): Promise<ServiceWorkerRegistration | null>{

        if("serviceWorker" in navigator){

            try{
            this.registration = await navigator.serviceWorker.register(aWorker);
            } 
            catch(error){
                console.warn(`${this.pageName} ${version} failed with ${error}... `);
            }
    
        }
        else{
          console.warn(`${this.pageName} Service Worker not supported ....`);
        }

        return this.registration;
    }
    //
    async initWorker(aWorker:string){
        this.init(aWorker);
    }
    //
    async init(aWorker:string){
       
        this.workerName = aWorker;
        let versionMsg:Msg = {
            type: "sw-version",
            page: "",
            elementID: [""],
            timestamp: new Date(),
            payload: `${version}`
        }

        if("serviceWorker" in navigator){

            try{
                navigator.serviceWorker.getRegistration()
                .then(
                    (reg) => {
                        if (reg) {
                    this.registration = reg;
                console.warn(`${this.pageName} ${version} scope [${this.registration.scope}]  ... `);

                if( this.registration!.waiting    )console.warn(`${this.pageName} ${version} waiting   ... `);
                if( this.registration!.installing )console.warn(`${this.pageName} ${version} installing... `);
                if( this.registration!.active     )console.warn(`${this.pageName} ${version} active    ... `);

                if( navigator.onLine        )console.warn(`${this.pageName} ${version} is online ... `);

                navigator.serviceWorker.addEventListener("message", this.messageListner.bind(this));

            //      this.sendMessage(versionMsg, null);
                    }}
                )

            } 
            catch(error){
                console.warn(`${this.pageName} ${version} failed with ${error}... `);
            }

        }
        else{
            console.warn(`${this.pageName} Service Worker not supported ....`);
        }

    }
    //
    async getWorkerRegistration():Promise<ServiceWorkerRegistration | undefined>{
        let _registration:ServiceWorkerRegistration | undefined = null!;
        let _registrations:ServiceWorkerRegistration[] = null!;

        if("serviceWorker" in navigator){

            console.log("svcworker constructing service worker......");

            try{
               _registration = await navigator.serviceWorker.getRegistration();

                navigator.serviceWorker.getRegistrations().then((registrations) => {registrations});

                navigator.serviceWorker.getRegistration().then( registration => {_registration = this.registration!} )
            } 
            catch(error){
                console.warn(`${this.pageName} ${version} failed with ${error}... `);
            }
    
        }
        else{
          console.warn(`${this.pageName} Service Worker not supported ....`);
        }

        return _registration;
    }
    //
    async getWorkerRegistrations(): Promise<ServiceWorkerRegistration[] | undefined>{

     //   workerReg.registration = await navigator.serviceWorker.getRegistrations();

        return undefined;
    }
    //
    addCallback(ucb:Function){
        this.userCallback = ucb;
    }
    //
    relayMessage(msg:Msg){
        
        if(this.userCallback){
 //           console.log(`${this.pageName} relaying message text=${msg.type}`);
            this.userCallback(msg);
        }
        else
            console.log(`${this.pageName} no relay userCallback registered. payload=${msg.payload}`);

    }
    //
    sendMessage(obj:Msg, xfer: any){

        if(!this.registration)return;

        navigator.serviceWorker
        .ready
        .then(registration=> registration.active?.postMessage(obj,xfer))
        .catch(error => console.warn(`${this.pageName} Service Worker Failed ...`,error)) 
    }
    //
    messageListner(evt: any){
        let msg:Msg = evt.data;

        console.warn(`${this.pageName} message: type=[${msg.type}]`);
    
        this.relayMessage(msg);
    }
    //
    status(){
        console.warn(`App Shell ${version} scope [${this.registration.scope}]  ... `);
        console.warn(`App Shell ${version} online [${navigator.onLine }]  ... `);

        if( this.registration.waiting    )console.warn(`App Shell ${version} waiting   ... `);
        if( this.registration.installing )console.warn(`App Shell ${version} installing... `);
        if( this.registration.active     )console.warn(`App Shell ${version} active    ... `);
    }
}

//console.log("sw-utils loaded....");
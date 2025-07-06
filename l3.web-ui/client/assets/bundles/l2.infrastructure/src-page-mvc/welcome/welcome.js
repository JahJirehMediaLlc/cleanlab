(() => {
  // ../../../l2.infrastructure/src-page-mvc/sw/sw-lib.ts
  var ServiceWorkerClient = class {
    constructor() {
      this.init();
    }
    init() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then((registration) => this.printStatus(registration)).catch((error) => console.log("Service worker not supported...", error.message));
      }
    }
    printStatus(registration) {
      console.log("SW file.  registration completed. scope =", registration.scope);
      console.log("SW file.  registration.active!.state    =", registration.active.state);
    }
  };

  // ../../../l2.infrastructure/src-page-mvc/welcome/welcome.ts
  var Welcome = class {
  };
  var sw = new ServiceWorkerClient();
  console.log("welcome.ts module loaded...");
})();
//# sourceMappingURL=welcome.js.map

import {Dimensions, Animator, dim} from '../../src-dom/domutils.ts';
import {TemplatePlus} from "../../src-dom/domutils.ts";
import {ServiceWorkerClient,} from "../../src-page-mvc/sw/sw-lib.ts";

export * from '../../src-web-comps/web_components.ts';

class WelcomeModel{    
}
class WelcomeView{
    logo:HTMLElement;
    topPanel:HTMLElement;
    bottopPanel:HTMLElement;
    header:HTMLElement;
    main:HTMLElement;
    footer:HTMLElement;

    constructor(){
        this.logo = document.querySelector("ui-logo")!;
        this.header = document.getElementById("header")!;
        this.main = document.getElementById("main")!;
        this.footer = document.getElementById("footer")!;
    }
    Logo(toggle: "on"|"off"){
        this.logo.classList.toggle("hide");
    }
    Main(toggle: "on"|"off"){
        this.header.classList.toggle("hide");

    //    this.main.classList.toggle("hide");

    //    this.footer.classList.toggle("hide");
    }
}
class WelcomeController{
    view = new WelcomeView();
    sw   = new ServiceWorkerClient();

    constructor(){
        console.log("welcome.ts constructor ...");
    }
    Enter(){
        setTimeout(() => {
            controller.view.Logo("off");
            controller.view.Main("on");
        }, 400);
    }
}

 const controller = new WelcomeController();
 const logo = document.querySelector("ui-logo");

 logo!.addEventListener("click", controller.Enter.bind(controller));

 console.log("welcome.ts module loaded...");
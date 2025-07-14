import { TemplatePlus,_css, _html} from "../../src-dom/domutils.ts";
import {ServiceWorkerClient,} from "../../src-page-mvc/sw/sw-lib.ts";

export * from '../../src-web-comps/web_components.ts';

class ClsModel{}
class ClsView{
    
    constructor(){

    }
    setupTemplate(){

    }
    render(template:HTMLTemplateElement | DocumentFragment){
        const output = document.getElementById("output");

        output!.appendChild(template);
    }
}
class ClsController{
    view = new ClsView();
    model = new ClsModel();
    constructor() {
        addEventListener("DOMContentLoaded", this.domContentLoaded.bind(this));

        globalThis.onload = this.windowLoaded.bind(this);

        console.log("Cls controller handlers are ready.");
    }
    domContentLoaded(){
        console.log("DomContentLoaded...");
    }
    windowLoaded(){
        console.log("WindowLoaded...");
    }
    render(template:HTMLTemplateElement){
        this.view.render(template)
    }
}

// deno-lint-ignore no-unused-vars
const controller = new  ClsController();


const sw = new ServiceWorkerClient();
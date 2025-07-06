import { TemplatePlus,_css, _html} from "../../src-dom/domutils.ts";
import {ServiceWorkerClient,} from "../../src-page-mvc/sw/sw-lib.ts";

export * from '../../src-web-comps/web_components.ts';

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
class ClsModel{

}

// deno-lint-ignore no-unused-vars
const controller = new  ClsController();

const host = document.getElementById("log");

function test1(){
const log_template =  document.getElementById("log_template") as HTMLTemplateElement;
host!.attachShadow({mode:"open"});
host!.shadowRoot!.appendChild(log_template.content.cloneNode(true));
console.log("log_template",log_template);
}

function test2(){
const tplus = new TemplatePlus("tabs_template");
const _rawCss = `
    h1{
        color:teal;
    }
`;
const _rawHtml = `
<h1>hello peoples....</h1>
`;

//const template = tplus.createBlankTemplate();

//tplus.initTemplate(_rawCss,_rawHtml);

tplus.content().then( frag =>{
    console.log(frag);

    tplus.render( document.getElementById("output")! );
});

}

const sw = new ServiceWorkerClient();
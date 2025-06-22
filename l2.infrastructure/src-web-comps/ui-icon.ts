import {TemplatePlus} from "../src-dom/domutils.ts";

export class HTMLUiIcon extends HTMLElement{
        // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["width", "height", "url"];

    constructor(){
        super();

        console.log("ui-icon registered..");
    }
}

class HTMLUiIconController{}

class HTMLUiIconView{}

window.customElements.define("ui-icon", HTMLUiIcon);
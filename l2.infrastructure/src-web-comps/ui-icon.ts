import {TemplatePlus, WebComponentLifeCycle,} from "../src-dom/domutils.ts";


class HTMLUiIconController{}

class HTMLUiIconView{}
export class HTMLUiIcon extends HTMLElement implements WebComponentLifeCycle{
        // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["width", "height", "url"];

    constructor(){
        super();

        console.log("ui-icon registered..");
    }
    connectedCallback(): void {
        throw new Error("Method not implemented.");
    }
    disconnectedCallback(): void {
        throw new Error("Method not implemented.");
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        throw new Error("Method not implemented.");
    }
}



window.customElements.define("ui-icon", HTMLUiIcon);
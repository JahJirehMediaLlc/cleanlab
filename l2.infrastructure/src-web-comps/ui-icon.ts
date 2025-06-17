import {TemplatePlus} from "../src-dom/domutils.ts";

export class HTMLUiIcon extends HTMLElement{
    constructor(){
        super();

        console.log("ui-icon registered..");
    }
}

class HTMLUiIconController{}

class HTMLUiIconView{}

window.customElements.define("ui-icon", HTMLUiIcon);
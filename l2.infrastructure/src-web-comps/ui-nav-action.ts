import {TemplatePlus} from "../src-dom/domutils.ts";

class HTMLUiNavActionView{
    tplus:TemplatePlus;
    _shadowRoot: ShadowRoot;

    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.tplus = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
        this.setupTemplate();
    }
    setupTemplate(){
    this.tplus.content().then( frag => {

            // customize the doc fragment

            this.render(this.tplus.element);

        });
    }
     render(node: HTMLTemplateElement|DocumentFragment){
        if(node instanceof HTMLTemplateElement)
            this._shadowRoot.appendChild(node.content);
        else
            this._shadowRoot.appendChild(node);
     }
    processClickEvent(event: Event){
        const selectedElement = event.target as HTMLElement;
    }
    processSubmitForm(evt:SubmitEvent){}
}
class HTMLUiNavActionController {

}
export class HTMLUiNavAction extends HTMLElement{
    constructor(){
        super();

        console.log("ui-nav-action registered..");
    }
}

window.customElements.define("ui-nav-action", HTMLUiNavAction);
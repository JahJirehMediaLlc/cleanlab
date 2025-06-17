import {TemplatePlus} from "../src-dom/domutils.ts";

class HTMLUiTabView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;

    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.template = new TemplatePlus("ui_tab_template", new URL("http://localhost:3000/data/web_components.html"));

        this.setupTemplate();
    }
    setupTemplate(){

        this.template.content().then( frag => {

            // customize the doc fragment

            fetch("http://localhost:3000/data/data.json")
                .then(resp=> resp.json())
                .then(data=> {

                    const obj = data[0];

                    // customize the doc fragment with fetch data.

                    this.render(this.template.element);
                })

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

       alert(`processClickEventr ${"this.selectedElement.tagName"}}   ${"this.SelectedImageIndex"}`);
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);

        alert(`processSubmitFor ${<string>fdata.get("action")}   ${"this.SelectedImageIndex"}`);
    }
}
class HTMLUiTabController{}
export class HTMLUiTab extends HTMLElement{
    constructor(){
        super();

        console.log("ui-tab registered..");
    }
}

window.customElements.define("ui-tab", HTMLUiTab);
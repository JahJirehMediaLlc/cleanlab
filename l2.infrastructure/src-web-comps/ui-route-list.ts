import {TemplatePlus} from "../src-dom/domutils.ts";

class HTMLUiRouteListView{
    tplus:TemplatePlus;
    _shadowRoot: ShadowRoot;

    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.tplus = new TemplatePlus("ui_route_list_template", new URL("http://localhost:3000/data/web_components.html"));

        this.setupTemplate();
    }
    setupTemplate(){

        this.tplus.content().then( frag => {

            // customize the doc fragment

            fetch("http://localhost:3000/data/data.json")
                .then(resp=> resp.json())
                .then(data=> {

                    const obj = data[0];

                    // customize the doc fragment with fetch data.
                })

            this.render(this.tplus.element);

        });
    }
    render(frag:HTMLTemplateElement){

        if(frag.content)this._shadowRoot.appendChild(frag.content);

    
    
        
    }
    processClickEvent(event: Event){
        const selectedElement = event.target as HTMLElement;
    }
    processSubmitForm(evt:SubmitEvent){}
}
class HTMLUiRouteListController{}
export class HTMLUiRouteList extends HTMLElement{
    constructor(){
        super();

        console.log("ui-route-list registered..");
    }
}

window.customElements.define("ui-route-list", HTMLUiRouteList);
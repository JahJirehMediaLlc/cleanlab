import {TemplatePlus} from "../src-dom/domutils.ts";
import {HTMLUiGallery} from "./ui-gallery.ts";

class HTMLUiNavView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;

    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.template = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
        this.setupTemplate();
    }
    setupTemplate(){

        this.template.content().then( frag => {

            let form = frag.querySelectorAll("form")[0];

            // register event listners
            if(form)form.addEventListener("submit", this.processSubmitForm.bind(this));

            // customize the doc fragment

            fetch("http://localhost:3000/data/gallery.json")
                .then(resp=> resp.json())
                .then(data=> {

                    const obj = data[0];

                    // customize the doc fragment with fetch data.
                    console.log("rendering nav component.");

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
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);
        let req   = {
            action: <string>fdata.get("action"),
            lookup: <string>fdata.get("lookup"),
            template:<string>fdata.get("selected_template")
        } ;
        const custEvt = new CustomEvent("nav_event", { detail: req }  );

        globalThis.dispatchEvent( custEvt );
    }
}
class HTMLUiNavController {
    _view:HTMLUiNavView;
    _parent:HTMLUiNav;

    constructor(parent:HTMLUiNav){
    this._parent = parent;
    this._view = new HTMLUiNavView(this._parent._shadowRoot);
}
}
export class HTMLUiNav extends HTMLElement{
    _controller:HTMLUiNavController;
    _shadowRoot: ShadowRoot;
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiNavController(this);

        console.log("ui-nav registered..");
    }
}

window.customElements.define("ui-nav", HTMLUiNav);

import {_html, _css, WebComponentLifeCycle} from '../src-dom/domutils.ts';
import {TemplatePlus} from  '../src-dom/template-plus.ts';

export class HTMLUiTabView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;
    _id:string;
    _label:string;
    _slot:string;
    _topic:string;


    get id():string{return this._id}
    set id(value:string){this._id = value}

    get lable():string{return this._label}
    set lable(value:string){this._label = value}

    get slot():string{return this._slot}
    set slot(value:string){this._slot = value}

    get topic():string{return this._topic}
    set topic(value:string){this._topic = value}

    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;

    }
    setupTemplate(){
         const rawCss = _css`
            <style>

                :host{
                    display:block;
                    contain:paint;
                    color: black;
                    background-color: green;
                }

            ::slotted(h3){
                color: yellow;
                padding:0;
                margin:0;
            }
            </style>
        `;

        const rawHtml  = _html`
         <slot name="title"><p> Tab title </p></slot>
         `; 
        
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

        this.render(tplus.element);
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
class HTMLUiTabController{
    view:HTMLUiTabView;
    parent:HTMLUiTab;
    controller:HTMLUiTabController;

    constructor(parent:HTMLUiTab) {
        this.parent = parent;
        this.view = new HTMLUiTabView(this.parent._shadowRoot);
    }

}
export class HTMLUiTab extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiTabController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["id", "lable","slot","topic"];
    constructor(){
        super();

         this._shadowRoot = this.attachShadow({mode: 'open'});

        this.controller = new HTMLUiTabController(this);
    }
    connectedCallback(): void {
       this.controller.view.setupTemplate() ;
      
      console.log("ui-tab registered....");
    }
    disconnectedCallback(): void {
        throw new Error('Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}

window.customElements.define("ui-tab", HTMLUiTab);
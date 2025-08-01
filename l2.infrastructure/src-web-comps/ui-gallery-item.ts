import {_html, Html , _css, Css, WebComponentLifeCycle} from  '../src-dom/domutils.ts';
import {TemplatePlus} from  '../src-dom/template-plus.ts';

export class HTMLUiGalleryItemView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;
    _id:string;
    _src:string;
    _slot:string;
    _caption:string;

    get id():string{return this._id}
    set id(value:string){this._id = value}

    get slot():string{return this._slot}
    set slot(value:string){this._slot = value}

    get src():string{return this._src}
    set src(value:string){this._src= value}

    get caption():string{return this._caption}
    set caption(value:string){this._caption = value}

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
                    background-color: pink;
                }

            ::slotted(h3){
                color:green;
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
class HTMLUiGalleryItemController{
    view:HTMLUiGalleryItemView;
    parent:HTMLUiGalleryItem;
    controller:HTMLUiGalleryItemController;

    constructor(parent:HTMLUiGalleryItem) {
        this.parent = parent;
        this.view = new HTMLUiGalleryItemView(this.parent._shadowRoot);
    }

}
export class HTMLUiGalleryItem extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiGalleryItemController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["id", "caption","slot","src"];
    constructor(){
        super();

         this._shadowRoot = this.attachShadow({mode: 'open'});

        this.controller = new HTMLUiGalleryItemController(this);
    }
    connectedCallback(): void {
       this.controller.view.setupTemplate() ;
      
      console.log("ui-gallery-item registered....");
    }
    disconnectedCallback(): void {
      //  throw new Error('Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}

window.customElements.define("ui-gallery-item", HTMLUiGalleryItem);
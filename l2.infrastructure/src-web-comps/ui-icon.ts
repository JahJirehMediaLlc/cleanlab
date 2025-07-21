import {TemplatePlus, WebComponentLifeCycle,_css,_html} from "../src-dom/domutils.ts";

class HTMLUiIconView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiIconController;

    _font_size:string;
    _width:string;
    _height:string;
    _href:string;
    _items: string[];

    get items():string[]{return this._items};
    set items(value:string[]){this._items=value};
    get font_size():string{return this._font_size};
    set font_size(value:string){this._font_size=value};
    get width():string{return this._width};
    set width(value:string){this._width=value};
    get height():string{return this._height};
    set height(value:string){this._height=value};
    get href():string{return this._href};
    set href(value:string){this._href=value};

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }
    private initEventHandlers(){
        this._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
    setupTemplate() {
    const rawCss = _css`
        <style>
        *,
        *::after, 
        *::before  {
        box-sizing: border-box;
        margin: 0;
        padding:0;
        }

        :host{
        display:block;
        contain:paint;
        color: white;
        }

        :slotted(span){
         font_size: ${this.font_size};
        }

        </style>
        `;
    const rawHtml  = _html`
        <slot>
         <span>@</span>
        </slot>
        `;

        const tplus = new TemplatePlus("");
        
        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );

     //   this.initEventHandlers();
    }
    render(node: HTMLTemplateElement|DocumentFragment){
        if(node instanceof HTMLTemplateElement)
            this._shadowRoot.appendChild(node.content);
        else
            this._shadowRoot.appendChild(node);
    }
    processClickEvent(event: Event){
        const selectedElement = event.target as HTMLElement;
         alert(selectedElement.tagName);
    }
    processSubmitForm(event:SubmitEvent){
        event.preventDefault();

        const form = this._shadowRoot.querySelector("form")  as HTMLFormElement ;
        const fdata = new FormData(form, event.submitter);
        const form_input = fdata.get("action") as string;

        alert(form_input);
    }
    processSlotChange(event:Event){
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const items = slot.assignedElements().map(el => el.innerHTML );

        this[slot.name] = this.items;
    }
}

class HTMLUiIconController{
    view:HTMLUiIconView;
    parent:HTMLUiIcon;
    controller:HTMLUiIconController;

    constructor(parent:HTMLUiIcon) {
        this.parent = parent;
        this.view = new HTMLUiIconView(this.parent._shadowRoot);
    }
}

export class HTMLUiIcon extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiIconController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["font_size","width", "height", "href"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiIconController(this);
       
    }
    connectedCallback(): void {
      this.controller.view.setupTemplate();
       console.log("ui-icon registered....");
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
    
}


window.customElements.define("ui-icon", HTMLUiIcon);
import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

class HTMLUiMenuView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiMenuController;

     _id:string;

    _title:string[];
    _width:string;
    _height:string;
    _axis:string;
    _items: string[];

       get id():string{return this._id};
    set id(value:string){this._id=value};
    get items():string[]{return this._items};
    set items(value:string[]){this._items=value};
    get title():string[]{return this._title};
    set title(value:string[]){this._title=value};
    get width():string{return this._width};
    set width(value:string){this._width=value};
    get height():string{return this._height};
    set height(value:string){this._height=value};
    get axis():string{return this._axis};
    set axis(value:string){this._axis=value};

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        console.log("### menu constructor");
      //  this.setupTemplate();
    }
    private initEventHandlers(){
        this._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
    setupTemplate() {
      const tplus = new TemplatePlus("ui_menu");

      const rawCss = _css`
      <style>
      </style>`;
    
      const rawHtml  = _html`
     <nav class="flex_row space_between bg_blue"></nav>
     `;
    
     // tplus.initTemplate( rawCss, rawHtml );

    this.render( tplus.element );

   // this.initEventHandlers();

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
        this.items = slot.assignedElements().map(el => el.innerHTML );

        this[slot.name] = this.items;
    }
}

class HTMLUiMenuController{
    view:HTMLUiMenuView;
    parent:HTMLUiMenu;
    controller:HTMLUiMenuController;

    constructor(parent:HTMLUiMenu) {
        this.parent = parent;
        this.view = new HTMLUiMenuView(this.parent._shadowRoot);
    }
}

export class HTMLUiMenu extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiMenuController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["id","slot","width", "height", "axis"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiMenuController(this);
    }
    connectedCallback(): void {
       this.controller.view.setupTemplate();
      
       console.log("ui-menu registered....");
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
    
}

window.customElements.define("ui-menu", HTMLUiMenu);
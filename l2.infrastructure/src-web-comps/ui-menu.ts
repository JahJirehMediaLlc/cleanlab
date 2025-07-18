import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

class HTMLUiMenuView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiMenuController;

    _title:string[];
    _width:string;
    _height:string;
    _axis:string;
    _items: string[];

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

    .scroll_x {
    overflow-x: auto;
    }

    .scroll_y {
    overflow-y: auto;
    width: fit-content;
    }

    .menu_x{
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    color:white;
    }

    .menu_x > * {
    display: inline-block;
    flex-shrink: 1;
    margin: 0;
    padding: 0;
    }

    ::slotted(li){
    display: block;
    margin: 0;
    padding: 0;
    }

    .menu_y {
    display: flex;
    flex-direction: column;
    gap: 2;
    text-align: center;
    width: fit-content;
    }

    .menu_y > * {
    display: block;
    flex-shrink: 1;
    margin: 0;
    padding: 0;
    }

    .flex_row{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;
    }

    .flex_col{
    display:flex;
    flex-direction: column;
    gap: 1rem;
    }

    .flex_center{
    display:flex;
    align-items: center ;
    justify-content: center;
    }

    .basis_equal{
    flex-basis: 1;
    }

    .space_between{
    justify-content: space-between;
    }
    .space_around{
    justify-content: space-around;
    }

    .shrink_off{
    flex-shrink: 1;
    }

    .shrink_on{
    flex-shrink: 0;
    }

    .grow_on{
    flex-grow: 1;
    }
    .grow_off{
    flex-grow: 0;
    }

    .border{ border: 1px red dashed;}

    .bg_blue{background-color: blue;}
    .bg_yellow{background-color: yellow;}
    .bg_purple{background-color: purple;}
    .bg_pink{background-color: pink;}
    .bg_green{background-color: green;}
    </style>
    `;
    const rawHtml  = _html`
    <slot name="title">No Totle</slot>

    <nav class="flex_row space_between bg_blue">
    <section class="grow_off shrink_on bg_yellow border">
    <slot name="left_icon">
    <ui-icon>#</ui-icon>
    </slot>
    </section>

    <section class="grow_off shrink_on bg_green">
    <ul class="menu_x scroll_x">
    <slot name="item">
    <li>No Menu Item</li>
    </slot>
    </ul>
    </section>

    <section class="grow_off shrink_on border bg_yellow">
    <slot name="right_icon">
    <ui-icon>#</ui-icon>
    </slot>
    </section>
    </nav>
    `;

    const tplus = new TemplatePlus("ui_menu");

    console.log(`rendering template ui-menu: `, tplus.id);

    // tplus.initTemplate( rawCss, rawHtml );

    this.render( tplus.element );

    this.initEventHandlers();

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
    static observedAttributes = ["slot","width", "height", "axis"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiMenuController(this);
    }
    connectedCallback(): void {
      this.controller.view.setupTemplate();
      
       console.log("ui-Menu registered....");
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
    
}

window.customElements.define("ui-menu", HTMLUiMenu);
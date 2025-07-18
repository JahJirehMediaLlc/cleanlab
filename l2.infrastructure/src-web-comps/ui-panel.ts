import {_html, Html, _css, Css, WebComponentLifeCycle, insertElement, TemplatePlus} from '../src-dom/domutils.ts';


class HTMLUiPanelView{;
    _shadowRoot: ShadowRoot;
    controller:HTMLUiPanelController;
    _id:string;
    _template:string;
    height:string;
    scrollable:string;
    position:string;
    panel_div:Element;
    ui_panels:Element;
    light_dom:Element;
    shadow_dom:Element;
    styles:string[] = [];
     _items: string[];

    get items():string[]{return this._items};
    set items(value:string[]){this._items=value};
    get id():string{return this._id;}
    set id(value:string){this._id = value;}
    get template():string{return this._template;}
    set template(value:string){this._template = value;}

    constructor(shadowRoot: ShadowRoot){
        this._shadowRoot = shadowRoot;
    }
    setupTemplate() {

        const rawCss  = _css`
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


        img{
        display: block;
        max-width: 100%;
        height: auto;
        /* margin: 0px auto; */
        }

        .position_top{
        position: fixed;
        top: 0;
        width:100%;
        z-index: 1;
        }
        .position_bottom{
        position: fixed;
        bottom: 0;
        width:100%;
        z-index: 1;
        }
        .position_left{
        position: fixed;
        left: 0;
        width:100%;
        z-index: 1;
        }
        .position_right{
        position: fixed;
        right: 0;
        width:100%;
        z-index: 1;
        }

        .scroll_x {
        overflow-x: scroll;
        }

        .scroll_y {
        overflow-y: scroll;
        width: fit-content;
        }

        .flex_row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 1rem;
        }

        .flex_col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .bg_blue {
        background-color: cornflowerblue;
        }

        .bg_green {
        background-color: darkolivegreen;
        }

        .bg_grey {
        background-color: darkgray;
        }

        .hide {
        display: none;
        }

        .margins {
        margin: 1rem;
        }

        .paddings {
        padding: 1rem;
        }

        .inline{
        display: inline-block;
        }
        </style>
        `;

        const rawHtml  = _html`
        <div id="panel">
        <slot name="menu">
        <p>no slots provided</p>
        </slot>
        </div> 
        `;
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );

        console.log(`panel id : ${this.id} template id : ${this.template}`);
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
    processSlotChange(event:Event){
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const items = slot.assignedElements().map(el => el.innerHTML );
        
        this[slot.name] = this.items;
    }
}

class HTMLUiPanelController{
    view:HTMLUiPanelView;
    parent:HTMLUiPanel;
    

    constructor(parent:HTMLUiPanel) {
        this.parent = parent;
        this.view = new HTMLUiPanelView(this.parent._shadowRoot);
    }

    get styles():string[]{return this.view.styles};
    get id():string{return this.view.id};
    get Height():string{return this.view.height};
    get Scrollable():string{return this.view.scrollable};
    get Position():string{return this.view.position};

    set id(value:string){this.view.id=value};
    set Height(value:string){this.view.height=value};
    set Scrollable(value:string){this.view.height=value};
    set Position(value:string){this.view.height=value};
}

export class HTMLUiPanel extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    view: HTMLUiPanelView;
    controller: HTMLUiPanelController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  

    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["template","position", "height" , "overflow", "id", "top","left","bottom","right"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiPanelController(this);
    }

    connectedCallback(): void {
        this.controller.view.setupTemplate();
         console.log("ui-panel registered....");
    }
    disconnectedCallback(): void {
        console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
     
     // @ts-ignore
        this.controller.view[name] = newValue;

        if(name == "id" || name == "template"){
            this.controller.view[name] = newValue;
            return;
        }

        if(name == "left" || name == "right"){
            this.controller.styles.push(`display:inline-block`);
            this.controller.styles.push(`margin-bottom: 2rem`);
            this.controller.styles.push(`${name}: 0`);
            return;
        }

        this.controller.styles.push(`${name}:${newValue}`);
    }
}

window.customElements.define("ui-panel", HTMLUiPanel);
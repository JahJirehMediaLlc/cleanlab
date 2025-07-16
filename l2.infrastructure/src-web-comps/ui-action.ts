import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';


class HTMLUiActionView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiActionController;
    tplus:TemplatePlus;

    _slot:string;
    _dialog:string;
    _href:string;
    _action:string;

    get slot():string{return this._slot}
    set slot(value:string){this._slot=value}
    get dialog():string{return this._dialog}
    set dialog(value:string){this._dialog=value}
    get href():string{return this._href}
    set href(value:string){this._href=value}
    get action():string{return this._action}
    set action(value:string){this._action=value}

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;

       // this.setupTemplate();
    }
    private initEventHandlers(){
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
     //   this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
    setupTemplate(){
        const tplus = new TemplatePlus("");
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
        </style>
        `;

        const rawHtml  = _html`
        <form>
        <input name="slot" value="${this.slot}" type="text" hidden >
        <input name="href" value="${this.href}" type="text" hidden >
        <input name="dialog" value="${this.dialog}" type="text" hidden >
        <button id="nav_action" type="submit" name="action" value="${this.action}">
        <slot>no slots provided</slot>
        </button> 
        </form>
        `;

        tplus.initTemplate( rawCss, rawHtml );
    
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
        const action = fdata.get("action") as string;
        const dialog = fdata.get("dialog") as string;
        const slot = fdata.get("slot") as string;
        const href = fdata.get("href") as string;

        alert(`${action}   ${dialog}  ${slot}  ${href}`);
    }
}
class HTMLUiActionController {
    view:HTMLUiActionView;
    parent:HTMLUiAction;
    controller:HTMLUiActionController;

    constructor(parent:HTMLUiAction) {
        this.parent = parent;
        this.view = new HTMLUiActionView(this.parent._shadowRoot);
    }
}

export class HTMLUiAction extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiActionController;
    // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["slot", "dialog", "href", "action"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiActionController(this);
        console.log("ui-action registered..");
    }
    connectedCallback(): void {
        this.controller.view.setupTemplate();
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
     this.controller.view[name] = newValue;

    // console.log(`ui-action.attributeChanged()  ${name} : ${newValue}`);
    }

}

window.customElements.define("ui-action", HTMLUiAction);
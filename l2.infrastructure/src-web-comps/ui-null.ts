import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

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

</style>
`;
const rawHtml  = _html`
<slot>
<p>null component</p>
</slot>
`;

class HTMLUiNullView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiNullController;

    _slot:string;
    _width:string;
    _heightstring;
    _url:string;

    get slot():string{return this._slot};
    set slot(value:string){this._slot=value};
    get width():string{return this._width};
    set width(value:string){this._width=value};
    get height():string{return this._height};
    set height(value:string){this._height=value};
    get url():string{return this._url};
    set url(value:string){this._url=value};

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.setupTemplate();
    }
    private initEventHandlers(){
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
   setupTemplate() {
        const tplus = new TemplatePlus("tid");
        
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
        const form_input = fdata.get("action") as string;

        alert(form_input);
    }
}

class HTMLUiNullController{
    view:HTMLUiNullView;
    parent:HTMLUiNull;
    controller:HTMLUiNullController;

    constructor(parent:HTMLUiNull) {
        this.parent = parent;
        this.view = new HTMLUiNullView(this.parent._shadowRoot);
    }
}

export class HTMLUiNull extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    view: HTMLUiNullView;
    controller:HTMLUiNullController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["slot","width", "height", "url"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiNullController(this);

        console.log("ui-null registered....");
    }
    connectedCallback(): void {
      //  console.log('connectedCallback Method not implemented.');
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
    
}

window.customElements.define("ui-null", HTMLUiNull);
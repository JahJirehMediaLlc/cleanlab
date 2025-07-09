// @ts-ignore
import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

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
<button id="nav_action">
<slot>no slots provided</slot>
</button> 
`;

class HTMLUiActionView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiActionController;
    tplus:TemplatePlus;

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.tplus = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
        this.setupTemplate();
    }
    private initEventHandlers(){
this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
    setupTemplate(){
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
    }
    processSubmitForm(evt:SubmitEvent){}
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
    view: HTMLUiActionView;
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
      //  console.log('connectedCallback Method not implemented.');
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
     //  console.log('attributeChangedCallback Method not implemented.');
    }

}

window.customElements.define("ui-action", HTMLUiAction);
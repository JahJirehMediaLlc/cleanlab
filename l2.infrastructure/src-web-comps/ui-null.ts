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

            img{
                display: block;
                max-width: 100%;
                height: auto;
                /* margin: 0px auto; */
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

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.setupTemplate();
    }
   setupTemplate() {
        const tplus = new TemplatePlus("tid");
        
        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );
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
   static observedAttributes = ["width", "height", "url"];

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
        console.log('attributeChangedCallback Method not implemented.');
    }
    
}

window.customElements.define("ui-null", HTMLUiNull);
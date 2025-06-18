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
<p>ui-view component</p>
</slot>
`;

class HTMLUiViewView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiViewController;

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

class HTMLUiViewController{
    view:HTMLUiViewView;
    parent:HTMLUiView;
    controller:HTMLUiViewController;

    constructor(parent:HTMLUiView) {
        this.parent = parent;
        this.view = new HTMLUiViewView(this.parent._shadowRoot);
    }
}

export class HTMLUiView extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    view: HTMLUiViewView;
    controller:HTMLUiViewController;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiViewController(this);

        console.log("ui-view registered....");
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
    get observedAttributes(): string[] {
          return ["width","height","url"];
    }
}

window.customElements.define("ui-view", HTMLUiView);
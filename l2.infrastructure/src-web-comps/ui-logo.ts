import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

class HTMLUiLogoView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiLogoController;
    _id:string;
    _src:string;
    _href:string;
    _bg_color:string;

    get bg_color():string{ return this._bg_color}
    set bg_color(value:string){this._bg_color = value}
    get id():string{ return this._id}
    set id(value:string){this._id = value}
    get src():string{ return this._src}
    set src(value:string){this._src = value}
    get href():string{ return this._href}
    set href(value:string){this._href = value}

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.bg_color = "black";
    }
    private initEventHandlers(){
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
     //   this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
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
                
                img{
                    width: 3rem;
                    height: 3rem;
                }

                .hide{
                    display:none;
                }

                .bg_image_cover{
                    background-image: url("${this.src}");
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    background-size: 100% 100%;
                    background-position: 0% 0%;
                }

                .bg_image_contain{
                    background-image: url("${this.src}");
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center center;
                    background-size: 100% 100%;
                    background-position: 0% 0%;
                }

                .bg_image{
                    background-image: url("${this.src}");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    background-position: 0% 0%;
                    background-color: ${this.bg_color};
                }

                .full_screen{
                    height:99vh;
                    width: 99vw;
                }

            </style>
        `;
        const rawHtml  = _html`
        <button id="logo" title="${this.src}" class="bg_image full_screen">
        </button>
        `;
        const tplus = new TemplatePlus("");
        
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

class HTMLUiLogoController{
    view:HTMLUiLogoView;
    parent:HTMLUiLogo;
    controller:HTMLUiLogoController;

    constructor(parent:HTMLUiLogo) {
        this.parent = parent;
        this.view = new HTMLUiLogoView(this.parent._shadowRoot);
    }
}

export class HTMLUiLogo extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiLogoController;
    // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["id", "src", "bg_color"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiLogoController(this);

        console.log("ui-logo registered....");
    }

    connectedCallback(): void {
      this.controller.view.setupTemplate();
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }

}

window.customElements.define("ui-logo", HTMLUiLogo);
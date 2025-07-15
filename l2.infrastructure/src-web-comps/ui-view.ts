import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

class HTMLUiViewView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiViewController;
    _url = new URL("http://localhost:3000/");
    pathName:string;

    get url(): URL{return this._url}
    set url(pathName:string){this._url.pathname = pathName;this.setupTemplate();}
    get width():string{return this.width}
    set width(value:string){this.width = value}
    get height():string{return this.height}
    set height(value:string){this.height = value}

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }
    setupTemplate() {
        const ui_view = document.querySelector("ui-view");
        const tplus = new TemplatePlus("");
        
        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );

        const outputEl = this._shadowRoot.querySelector(`[id="output"]`);

        this.fetchHtml(this._url.pathname, outputEl as HTMLElement);
    }
    parseRawHtml(rawhtml:string):string{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");

    //console.log(dom);

    return `<style>${style!.innerHTML}</style> ${body!.innerHTML}`;
    }

    fetchHtml(path:string, output:HTMLElement){
           const url = new  URL( `http://localhost:3000/${path}` );
            fetch(url)
            .then( response => response.text() )
            .then( rawHtml => output.innerHTML = this.parseRawHtml(rawHtml) )
            .catch( e => console.log(e) )
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
    processSubmitForm(evt:SubmitEvent){
        
    }
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
    controller:HTMLUiViewController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["width", "height", "url"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiViewController(this);

        console.log("ui-view registered....");
    }
    connectedCallback(): void {
      this.controller.view.setupTemplate() ;
     
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}

window.customElements.define("ui-view", HTMLUiView);
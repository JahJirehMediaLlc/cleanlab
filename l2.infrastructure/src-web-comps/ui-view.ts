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

border: 2px red dashed;
color: white;
background-color: orange;
}
</style>
`;

const rawHtml  = _html`
<slot>
<p>ui-view component</p>
</slot>
<div id="output">
place your content here 
(html id is "output")
</div>
`;

class HTMLUiViewView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiViewController;
    _url = new URL("http://localhost:3000/");

    get url(): URL{
        return this._url;
    }
    set url(value:string){
    this._url = value;

    this.setupTemplate();
    }
    get width():string{
    return "";
    }
    set width(value:string){
    //     console.log("set height", value);
    }
    get height():string{
        return "";
    }
    set height(value:string){
    //    console.log("set height", value);
    }
    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }
    setupTemplate() {
        const ui_view = document.querySelector("ui-view");
        const tplus = new TemplatePlus("tid");
        
        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );

        const outputEl = this._shadowRoot.querySelector(`[id="output"]`);

        this.fetchHtml(this._url, outputEl);
    }
    parseRawHtml(rawhtml:string):string{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");

    console.log(dom);

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
     // this.controller.view.setupTemplate() ;
      //  console.log('connectedCallback Method not implemented.');
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}

window.customElements.define("ui-view", HTMLUiView);
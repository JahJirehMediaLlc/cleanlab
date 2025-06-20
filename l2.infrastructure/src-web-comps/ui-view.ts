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
<div id="output">
output
</div>
`;

class HTMLUiViewView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiViewController;

    get url(): URL{
        return new URL("http://localhost:3000/html/es6-ts-this.html");
    }
    set url(value:string){
    //     console.log("set url", value);
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
        this.setupTemplate();
    }
    setupTemplate() {
        const tplus = new TemplatePlus("tid");
        
        tplus.initTemplate( rawCss, rawHtml );

      //  console.log(`height=${this.height}   width=${this.width}  url=${this.url} `);

        this.render( tplus.element );
    }
    parseRawHtml(rawhtml:string):string{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");

    console.log(dom);

    return `<style>${style!.innerHTML}</style> ${body!.innerHTML}`;
    }
    fetchArticleUrl(article:HTMLElement){
        const article_url =  article!.getAttribute("url");

        if(!article_url)return;

            console.log(`article url: ${article_url}`);

            const url = new  URL( `http://localhost:3000/${article_url}` );

            fetch(url)
            .then( response => response.text() )
            .then( rawHtml => article!.innerHTML = this.parseRawHtml(rawHtml) )
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
    view: HTMLUiViewView;
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
      //  console.log('connectedCallback Method not implemented.');
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

        this.controller.view[name] = newValue;

     //   console.log('attributeChangedCallback Method not implemented.');
    }
}

window.customElements.define("ui-view", HTMLUiView);
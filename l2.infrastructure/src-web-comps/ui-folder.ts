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

:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color:purple;
}

::slotted(label){
color: yellow;
flex-shrink: 0;
}

::slotted(label:hover){
color: red;
}

::slotted(.focus){
background-color:grey;
}

::slotted(article){
height: 25rem;;
overflow:auto;
}

.focus{
border: 2px yellow solid;
background-color:green;
}

.scroll_x{
overflow-x: scroll;
}
.scroll_y{
overflow-y: scroll;
width: fit-content;
}

.menu_x{
display: flex;
list-style: none;
gap: 2rem;
overflow-x: auto;
}
.menu_x > *{
flex-shrink: 0;
}
.menu_y{
display: flex;
flex-direction:column;
gap: .51rem;
text-align: center;
list-style: none;
width: fit-content;;
border: 2px red solid;
}
.menu_y > *{
margin:0;
padding:0;
}

.flex_row{
display:flex;
flex-direction: row;
flex-wrap: nowrap;
gap: 1rem;
}
.flex_col{
display:flex;
flex-direction: column;
gap: 1rem;
}
.center_text{
text-align: center;
}

.space_between{
justify-content: space-between;
}
.space_around{
justify-content: space-around;
}

.wrap{
display:flex;
flex-wrap: wrap;
gap: 1rem;
}
.hide{
display:none;
}

.border{
border:1px green solid;
}
.border2{
border: 2px green solid;
}

.shrink_off{
flex-shrink: 1;
}
.shrink_on{
flex-shrink: 0;
}

.grow_on{
flex-grow: 1;
}
.grow_off{
flex-grow: 0;
}



</style>
`;

const rawHtml  = _html`
<form>
<nav id="nav" class="flex_row menu_x">
    <slot name="tab">
      <p>no labels provided...</p>
    </slot>
</nav>
</form>

<h3Article</h3>
<slot name="details">
<p>no details provided...</p>
</slot>
`;

class HTMLUiFolderView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiFolderController;
    currentTab:string = "tab1";

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.setupTemplate();
        this.showDetails(this.currentTab);
    }
    setupTemplate(){
    const tplus = new TemplatePlus("");

    tplus.initTemplate(rawCss,rawHtml);

    this.render(tplus.element);

    this.initEventHandlers();

    // un select visible slots

    const slots = this._shadowRoot.querySelectorAll("slot");
    const slot_attrs = document.querySelectorAll("[slot=details]");

    slot_attrs.forEach( sa => sa.setAttribute("slot","1"));

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
private initEventHandlers(){
    this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
    this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
}

    render(node: HTMLTemplateElement|DocumentFragment){
        if(node instanceof HTMLTemplateElement)
            this._shadowRoot.appendChild(node.content);
        else
            this._shadowRoot.appendChild(node);
    }
            
    processClickEvent(event: Event){
        const clickedElement = event.target as HTMLElement;

    if(clickedElement.tagName === "LABEL"){
        this.showDetails(clickedElement.getAttribute("for")!);
    }

    }

    processSubmitForm(event:SubmitEvent){

    event.preventDefault();

    const form = document.getElementById("some_form")  as HTMLFormElement ;

    const fdata = new FormData(form, event.submitter);
    const form_input = fdata.get("some form input element") as string;
  //  fdata.forEach( (key,value) => console.log(`name: ${value}  value: ${key} `)) ;
    }

    showDetails(tabId:string){
   
        try{
            // set slot attribute to hide the currentTab article
            document.getElementById(this.currentTab)!.setAttribute("slot","1");
            this.setFocus(this.currentTab , false);

            this.currentTab = tabId;
            const article = document.getElementById(this.currentTab);
       
            // fetch url content and assign to article innerHTML
            this.fetchArticleUrl(article!);

            // set slot attribute to show article
            article!.setAttribute("slot","details");
            this.setFocus(this.currentTab , true);
        }
        catch(error){
            console.log(`no article found. ${error.message}`);
            console.log(`showdetails new tab:${tabId}    old tab: ${this.currentTab}`);
        }

    }

    setFocus(tabId:string, on:boolean){
        const el = document.querySelector(`[for=${tabId}]`);

        if(on)
            el!.classList.add("focus");
        else
           el!.classList.remove("focus");
   
    }
}

class HTMLUiFolderController{
    view:HTMLUiFolderView;
    parent:HTMLUiFolder;
    controller:HTMLUiFolderController;

    constructor(parent:HTMLUiFolder) {
        this.parent = parent;
        this.view = new HTMLUiFolderView(this.parent._shadowRoot);
    }
}
export class HTMLUiFolder extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    view: HTMLUiFolderView;
    controller:HTMLUiFolderController;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiFolderController(this);

        console.log("<ui-folder> element registered....");
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
        console.log('observedAttributes Method not implemented.');

        return ["name","value"];
    }
}

window.customElements.define("ui-folder", HTMLUiFolder);
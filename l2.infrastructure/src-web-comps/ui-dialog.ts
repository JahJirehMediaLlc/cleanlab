import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';
import {Fetch} from  '../src-dom/fetchmgr.ts';

class HTMLUIDialogView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUIDialogController;
    _url = new URL("http://localhost:3000/");
    _templates:string;
    _tid:string;
    _width:string;
     _id:string;
    _height:string;
    pathName:string;

    get url(): URL{return this._url}
    set url(pathName:string){this._url.pathname = pathName;this.setupTemplate();}
    get id():string{return this._id}
    set id(value:string){this._id = value}
    get width():string{return this._width}
    set width(value:string){this._width = value}
    get height():string{return this._height}
    set height(value:string){this._height = value}
    get templates():string{return this._templates}
    set templates(value:string){this._templates = value}
    get tid():string{return this._tid}
    set tid(value:string){this._tid = value}

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }

    private initEventHandlers(){
        this._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }

    updateDialogTemplate(tid:string){
        const myFetch = new Fetch("html");

        myFetch.getTemplate(tid).then( t => {
            const outputEl = this._shadowRoot.querySelector(`[id="output"]`);

            outputEl!.appendChild(t.content);
        });
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
                    color: black;
                    background-color: cyan;
                }

                ::slotted(h1){
                   display:inline-block;
                   color: red;
                }

                .border3{
                    border: 3px red solid;
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

                .flex_center{
                    display:flex;
                    align-items: center ;
                    justify-content: center;
                }

                .space_between{
                    justify-content: space-between;
                }

                .space_around{
                    justify-content: space-around;
                }

                .hide{display:none;}

            </style>`;

        const rawHtml  = _html`
            <form class="border3">

                <header class="flex_row space_between">

                    <div>
                        <slot name="title"> </slot> : <span>${this.tid}</span>
                    </div>
                    
                    <button type="submit" name="action" value="close">
                         <slot name="close"> </slot>
                    </button>
                </header>

                <div id="output" class="border1">
                <slot></slot>
                </div>

                <button type="submit" name="action" value="prev">Prev</button>

                <button type="submit" name="action" value="next">Next</button>

                <select name="tid">
                    <option value="" >template...</option>
                </select>

                <button type="submit" name="action" value="show">Show</button>

            </form>`; 

        // show dialog
        
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );
        this.render( tplus.element );
        
        this.initEventHandlers();

        // update template in dialog
        const myFetch = new Fetch("html");

        this.updateDialogTemplate(this.tid);

        myFetch.fetchHtml("template").then( alist => {
            const select = this._shadowRoot.querySelector(`select`);

            const opts = alist.map(item => `<option value="${item.id}">${item.id}</option>`);

            select!.replaceChildren(); 

            select!.insertAdjacentHTML("afterbegin", opts.join(" "));
        });
     
    }

    fetchHtml(path:string, output:HTMLElement[]){
           const url = new  URL( `http://localhost:3000/${path}` );
            fetch(url)
            .then( response => response.text() )
            .then( rawHtml => this.parseRawHtml(rawHtml) )
            .catch( e => console.log(e) )
    }

    parseRawHtml(rawhtml:string):HTMLElement[]{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");
    const templates =  dom.querySelectorAll(`template`);

    return templates as unknown as HTMLElement[];
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

    processSubmitForm(event:SubmitEvent){
        event.preventDefault();

        const form = this._shadowRoot.querySelector("form")  as HTMLFormElement;
        const fdata = new FormData(form, event.submitter);
        const action = fdata.get("action") as string;
        const tid = fdata.get("tid") as string;

        alert(`${action}   ${tid}  ${this.id}`);

        if( action == "close"){
            this.show("off");
        }

        if( action == "show"){
            this.show("on");
        }

    }

    processSlotChange(event:Event){
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const items = slot.assignedElements().map(el => el.innerHTML );
        
     //   this[slot.name] = this.items;
    }

    show(state:"on" | "off" = "off"){
        const ui_dialog = document.getElementById(this.id);
        const div = this._shadowRoot.querySelector("div")  as HTMLDivElement;

        if(state == "off"){
            div?.classList.add("hide");
            ui_dialog?.classList.remove("full_screen");

            return;
        }

        div?.classList.remove("hide");
        ui_dialog?.classList.add("full_screen");
    }
}

class HTMLUIDialogController{
    view:HTMLUIDialogView;
    parent:HTMLUIDialog;
    controller:HTMLUIDialogController;

    constructor(parent:HTMLUIDialog) {
        this.parent = parent;
        this.view = new HTMLUIDialogView(this.parent._shadowRoot);
    }
}

export class HTMLUIDialog extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUIDialogController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["id", "width", "height", "url", "templates" , "tid"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUIDialogController(this);
    }
    connectedCallback(): void {
      this.controller.view.setupTemplate() ;
      
      console.log("ui-dialog registered....");
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}

window.customElements.define("ui-dialog", HTMLUIDialog);
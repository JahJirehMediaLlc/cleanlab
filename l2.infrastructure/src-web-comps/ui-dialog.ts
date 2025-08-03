import {_html, Html , _css, Css, WebComponentLifeCycle} from  '../src-dom/domutils.ts';
import {sdom} from  '../src-dom/sdom.ts';
import {Fetch} from  '../src-dom/fetchmgr.ts';
import {TemplatePlus} from  '../src-dom/template-plus.ts';

class HTMLUiDialogView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiDialogController;

    _url = new URL("http://localhost:3000/");
    _templates:string;
    _tid:string;
    _width:string;
    _id:string;
    _height:string;
    pathName:string;

    selectedTemplateId:sdom;
    output:sdom;

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

    initSdom(){
        this.selectedTemplateId = new sdom("selected_template_id", this._shadowRoot);
        this.output = new sdom("output", this._shadowRoot);

        console.log(this.selectedTemplateId, this.output);
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

                .border1{
                    border: 3px blue solid;
                }

                .height75{
                    height: 75vh;
                }

                .height90{
                    height: 90vh;
                }

                .scroll_y{
                  overflow-y: auto;
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

            </style>
            `;

        const rawHtml  = _html`
               <form >
                    <header class="flex_row space_between">

                        <div>
                            <slot name="title"> </slot> : <span>${this.tid}</span>
                        </div>

                        <button type="submit" name="action" value="close">
                            <slot name="close"> </slot>
                        </button>
                    </header>

                    <div>
                        <button type="submit" name="action" value="prev">Prev</button>

                        <button type="submit" name="action" value="next">Next</button>

                        <select id="selected_template_id" name="tid">
                            <option value="" >template...</option>
                        </select>
                    </div>

                    <div id="output" class="height90 scroll_y border1">
                        <slot></slot>
                    </div>
                </form>
        `; 

        // show dialog
        
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );

        this.initSdom();

        // update template in dialog
        const myFetch = new Fetch("html");

        this.updateDialogTemplate(this.tid);

        myFetch.fetchHtml("template").then( alist => {
            const select = this._shadowRoot.querySelector(`select`);
            // const select = this._shadowRoot.querySelector(`select`);

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

    show(state:"on" | "off" = "off"){
        const ui_dialog = document.getElementById(this.id);
        // const div = this._shadowRoot.querySelector("div")  as HTMLDivElement;
         const div = this.output;

        if(state == "off"){
            div.element?.classList.add("hide");
            ui_dialog?.classList.remove("full_screen");

            return;
        }

        div.element?.classList.remove("hide");
        ui_dialog?.classList.add("full_screen");
    }

    updateDialogTemplate(tid:string){
        const myFetch = new Fetch("html");

        myFetch.getTemplate(tid).then( t => {
            const outputEl = this.output.element;

            outputEl!.replaceChildren();

            outputEl!.appendChild(t.content);
        });
    }
}

class HTMLUiDialogController{
    view:HTMLUiDialogView;
    parent:HTMLUiDialog;
    controller:HTMLUiDialogController;

    constructor(parent:HTMLUiDialog) {
        this.parent = parent;
        this.view = new HTMLUiDialogView(this.parent._shadowRoot);

        this.initEventHandlers();
    }

    private initEventHandlers(){
        this.view._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this.view._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this.view._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
        this.view._shadowRoot.addEventListener("change",this.processItemChange.bind(this));

        console.log("dialog handlers initialized..")
    }

    processClickEvent(event: Event){
        const selectedElement = event.target as HTMLElement;
    }

    processItemChange(event: Event){
        const selectElement = event.target as HTMLSelectElement;

        this.view.updateDialogTemplate(selectElement.value);

        this.view.show("on");
    }

    processSubmitForm(event:SubmitEvent){
        event.preventDefault();

        const form = this.view._shadowRoot.querySelector("form")  as HTMLFormElement;
        const fdata = new FormData(form, event.submitter);
        const action = fdata.get("action") as string;
        const tid = fdata.get("tid") as string;

        if( action == "close"){
            this.view.show("off");
        }

        if( action == "show"){
            this.view.updateDialogTemplate(tid);
            this.view.show("on");
        }

    }

    processSlotChange(event:Event){
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const items = slot.assignedNodes().map(el => el );
    }
}

export class HTMLUiDialog extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiDialogController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["id", "width", "height", "url", "templates" , "tid"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        
        this.controller = new HTMLUiDialogController(this);
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

window.customElements.define("ui-dialog", HTMLUiDialog);
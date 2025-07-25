import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';


class HTMLUiContactView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;
    controller:HTMLUiContactController;

        _slot:string;
    _width:string;
    _height:string;
    _url:string;

    get slot():string{return this._slot};
    set slot(value:string){this._slot=value};
    get width():string{return this._width};
    set width(value:string){this._width=value};
    get height():string{return this._height};
    set height(value:string){this._height=value};
    get url():string{return this._url};
    set url(value:string){this._url=value};

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;

        this.setupTemplate();
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

border: 2px red dashed;
color: white;
background-color:purple;
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
background-color: grey;
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

::hover:label{
border: 2px red solid;
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


        <slot name="first_name">
        <p>no first_name provided</p>
        <label for="first_name">first_name</label>
        <input id="first_name" name="first_name" type="text" autocomplete="true">
        </slot>


        <slot name="last_name">
        <p>no last_name provided</p>
        <label for="last_name">last_name</label>
        <input id="last_name" name="last_name" type="text" autocomplete="true">
        </slot>


        <slot name="age">
        <p>no age provided</p>
        <label for="age">age</label>
        <input id="age" name="age" type="number" autocomplete="true">
        </slot>


        <slot name="email">
        <p>no email provided</p>
        <label for="email">"email</label>
        <input id="email" name="email" type="text" autocomplete="true">
        </slot>

        <slot name="phone">
        <p>no phone provided</p>
        <label for="phone">"phone</label>
        <input id="phone" name="phone" type="phone" autocomplete="true">
        </slot>

        <button type="submit">Done</button> 
        </form>
        <slot></slot>
        `;

        const tplus = new TemplatePlus("");
    
        tplus.initTemplate(rawCss,rawHtml);
    
        this.render(tplus.element);
    }
    //
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
    //
}

class HTMLUiContactController{
    view:HTMLUiContactView;
    _parent:HTMLUiContact;
    _shadowRoot: ShadowRoot;

    constructor(parent:HTMLUiContact) {
        this._parent = parent;

        this.view = new HTMLUiContactView(this._parent._shadowRoot);
    }
}

export class HTMLUiContact extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiContactController;
    template:TemplatePlus;
    thead:HTMLElement;
    tbody:HTMLElement;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["slot","width", "height", "url"];
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiContactController(this);

        console.log("<ui-contact> registered....");
    }

    connectedCallback(): void {
      this.controller.view.setupTemplate();
    }
    disconnectedCallback(): void {
        console.log("disconnectedCallback Method not implemented.");
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define("ui-contact", HTMLUiContact);

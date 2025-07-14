// @ts-ignore
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
color: white;
}

::slotted(.icon){
    font-size: large;
    pading: 0 4reem;
    margin: 0 3rem;
}

.icon_btn{
    background-color: yellow;
}
</style>
`;

const rawHtml  = _html`
<form>
    <button type="submit" class="icon_btn">
        <slot name="icon">
        <span class="icon" slot="icon">&</span>
        </slot>
    </button>
</form>
`;

class HTMLUiSwitchView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiSwitchController;
    tplus:TemplatePlus;
    _forLable:string;

    get forLable():string{return this._forLable};
    set forLable(value:string){this._forLable=value};

constructor(shadowRoot: ShadowRoot) {
this._shadowRoot = shadowRoot;
this.tplus = new TemplatePlus("");
this.setupTemplate();
}

private initEventHandlers(){
const btn = this._shadowRoot.querySelector("button");

 this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));

// btn!.addEventListener("click",this.processClickEvent.bind(this));
}

setupTemplate(){

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
const ui_switch = selectedElement.parentElement;
const for_attr = ui_switch!.getAttribute("for");

// console.log("parent",selectedElement.parentElement);

if(ui_switch  && for_attr){
    const aside = document.getElementById(for_attr);
    aside?.classList.toggle("hide");
}

}

processSubmitForm(event:SubmitEvent){
    event.preventDefault();

    const form = this._shadowRoot.querySelector("form")  as HTMLFormElement ;
    const fdata = new FormData(form, event.submitter);
    const form_input = fdata.get("action") as string;

    //console.log(this.forLable,event.submitter);

    const aside = document.getElementById(this.forLable);
    aside?.classList.toggle("hide");

}

}

class HTMLUiSwitchController{
    view:HTMLUiSwitchView;
    parent:HTMLUiSwitch;
    controller:HTMLUiSwitchController;

    constructor(parent:HTMLUiSwitch) {
        this.parent = parent;
        this.view = new HTMLUiSwitchView(this.parent._shadowRoot);
    }
}

export class HTMLUiSwitch extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    view: HTMLUiSwitchView;
    controller:HTMLUiSwitchController;
    // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["for"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiSwitchController(this);

        console.log("ui-switch registered...");
    }
    connectedCallback(): void {
      //  console.log('connectedCallback Method not implemented.');
    }
    disconnectedCallback(): void {
     //   console.log('disconnectedCallback Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

        if(name == "for")this.controller.view.forLable = newValue;
    }

}

window.customElements.define("ui-switch", HTMLUiSwitch);
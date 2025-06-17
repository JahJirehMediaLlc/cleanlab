import {createElement, wrapElement, TemplatePlus} from "../src-dom/domutils.ts";
import {FormInput, Dimensions} from '../src-dom/domutils';

interface WebComponentLifeCycle{
    connectedCallback():void;
    disconnectedCallback():void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string):void;
    get observedAttributes():string[];
}

type tab_attr = {
    slot:string,
    name:string,
    value:string,
    topic:string,
    article_id:string
}
//
class HTMLUiTabsView{
    private _shadowRoot: ShadowRoot;
    private controller:HTMLUiTabsController;
    private tplus:TemplatePlus;
    public currentElement: DocumentFragment;
    public currentTab: string;

    tabs_menu_form:HTMLElement;
    tabs_menu_ul:HTMLElement;
    tabs_output:HTMLElement;
    //
    constructor(shadowRoot: ShadowRoot,_controller:HTMLUiTabsController) {

        this._shadowRoot = shadowRoot;
        this.tplus = new TemplatePlus("ui_tabs_template", new URL("http://localhost:3000/data/web_components.html"));
        this.controller = _controller;

        this.setupTemplate();
    }
    //
    setupTemplate() {


        this.tplus.content().then( frag => {

        this.tabs_menu_form = frag.getElementById("tabs_menu_form");
        this.tabs_menu_ul = frag.getElementById("tabs_menu_ul");
        this.tabs_output = frag.getElementById("tabs_output");

        // add event listner's for click and form submit
        if (this.tabs_output && this.tabs_menu_form) {
            this.tabs_output.addEventListener("click", evt => this.processClickEvent(evt));
            this.tabs_menu_form.addEventListener("submit", evt => this.processSubmitForm(evt));

            console.log("event handlers initialized");
        }
        else{
            console.log("event handlers mot initialized");
        } 
        
        // initialize tabs_menu_ul with buttons from shadow host
        let _frag = this.initFormButtons();

        this.tabs_menu_ul.replaceChildren(_frag);

         // display the desired template
        
        this.render(this.tplus.element); 
       });

    }
    initFormButtons():DocumentFragment{
        let ui_tab_items = document.getElementsByTagName("ui-tab");
        let _frag = new DocumentFragment();

        // build custom buttons wrapped in list element

        for(let item of ui_tab_items)
        {
            let _topic = item.getAttribute("topic");
            let _name = item.getAttribute("name");
            let _value = item.getAttribute("value");
            let _btn    = createElement("button",{name:_name,value:_value,class:"tabs_item"},_topic);
            let _li = wrapElement("li",{},_btn);

            _frag.appendChild(_li);
        }

return _frag;
    }
    render(node: HTMLTemplateElement|DocumentFragment){
        if(node instanceof HTMLTemplateElement)
            this._shadowRoot.appendChild(node.content);
        else
            this._shadowRoot.appendChild(node);
     }
    showTab(tabid:string){
        
        const currenttab =  document.querySelectorAll(`ui-tab[slot=active]`);
        const newtab =  document.querySelectorAll(`ui-tab[value=${tabid}]`);

        if(!newtab.length){
            console.log(`tabid ${tabid} does not exist in in lightdom`);
            return;
        }

        currenttab[0].setAttribute("slot", "");
        newtab[0].setAttribute("slot", "active");

        this.currentTab = tabid;
    }
    processClickEvent(evt:Event){
        const articleName = (evt.target as HTMLElement).getAttribute("name");
        const articleTopic = (evt.target as HTMLElement).getAttribute("topic");

    //    console.log(`processClickEvent ${articleName} ${articleTopic}`);

    //    this.controller.processRequest(articleName);
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

    //    console.log("processSubmitForm evt.target ",evt.target);

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);

        if( <string>fdata.get("action") )
            this.showTab( <string>fdata.get("action") );
        else
            console.log("no frmdata provided...");
    }
 }
//
class HTMLUiTabsController{
    _view:HTMLUiTabsView;
    _parent:HTMLUiTabs;
    tabs:tab_attr[] = [];
    version = "1.0.0";
    fi:FormInput = new FormInput(null);
    get currentTab():string{return this._view.currentTab};
    set currentTab(value){this._view.showTab(value)};
    //
    constructor(parent:HTMLUiTabs) {
        this._parent = parent;
        this._view = new HTMLUiTabsView(this._parent._shadowRoot, this);
        this.version = "1.0.0";
    }
    initTabsAttributes(){

    for(let h of this._parent.children){

            let ta:tab_attr = {
                name: h.getAttribute("name"),
                value: h.getAttribute("value"),
                slot: h.getAttribute("slot"),
                topic: h.getAttribute("topic"),
                article_id: h.getAttribute("article_id"),
                };

            this.tabs.push(ta);
    }

    }
    processRequest(articleID:string){
        console.log("Controller.processRequest()",articleID);
    }
    saveFormData(){

        const tplate_Form = this._view.currentElement.querySelector<HTMLFormElement>("form");
        const tab_output_Form = this._view.tabs_output.querySelector<HTMLFormElement>("form");

        if(!tab_output_Form  && !tplate_Form)return;

        const tab_output_fdata = new FormData(tab_output_Form);

        // attach to template tab_item form
        this.fi.attachForm(tplate_Form);

        // transfer values from tabs_output tab_item from to template tab_item form
        for(let [key,value] of tab_output_fdata){
            this.fi.attach(`${key}`);
            this.fi.setValue(`${value}`);
        }
    }
}
//
export class HTMLUiTabs extends HTMLElement {
    _controller:HTMLUiTabsController;
    _shadowRoot: ShadowRoot = this.attachShadow({mode: 'open'});

    constructor(){
        super();

        this._controller = new HTMLUiTabsController(this);

        console.log("...ui-tabs registered..");
    }
}
//
window.customElements.define("ui-tabs", HTMLUiTabs);
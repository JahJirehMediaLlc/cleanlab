import {_html, _css, WebComponentLifeCycle, createElement, wrapElement, FormInput } from '../src-dom/domutils.ts';
import {TemplatePlus} from  '../src-dom/template-plus.ts';
import { HTMLUiTab } from  '../../l2.infrastructure/src-web-comps/web_components.ts';


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
    public currentElement: DocumentFragment;
    public currentTab: string;

    private tabs:Node[];
    tabs_menu_form:HTMLElement;
    tabs_menu_ul:HTMLElement;
    tabs_output:HTMLElement;
    //
    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }

  private initEventHandlers(){
        this._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
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

            img{
                display: block;
                max-width: 100%;
                height: auto;
                /* margin: 0px auto; */
            }

            :host{
                display:block;
                contain:paint;
                color: black;
                background-color:burlywood;
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

            .flex_col > *{
                background-color: #605d8a;
            }
         
            .text_wrap{
                hyphens: auto;
                overflow-wrap: break-word;
                /* text-wrap: balance; */
                width: 100%;
                /* max-width: 67ch;   */
            }
            
            .tabs_menu{
                display:flex;
                list-style: none;
                padding: 0;
                margin: 0;
                text-align: center;
                overflow-x: auto;
            }

            .tabs_output{
                background-color: burlywood;           
             }

            @media (min-width: 650px){
                .tabs_menu{
                    flex-direction: row;
                }
                .tabs_menu li{
                    color:black;
                    background-color: rgb(95, 110, 110);
                }
            }

            .tabs_menu > li{
                /* 1=allow breaking of elementontent, 0=no breaking of element content */
                flex-shrink: 0;
                /* 1=allow elements to grow , 0=no growing of elements  */
                flex-grow: 1;
            }
            .tabs_menu > *{
                /* 1=allow breaking of elementontent, 0=no breaking of element content */
                flex-shrink: 0;
                /* 1=allow elements to grow , 0=no growing of elements  */
                flex-grow: 1;
            }

            .tab_item{
                color: black;
                margin: .3rem;
            }

            .transition_width{
                width: 100%;
                transition: width 1000ms ease-in;
            }
            .transition_bg{
                background-color: red;
                transition: background-color 1000ms ease-in;
            }
            .transition_opacity{
                opacity: 1;
                transition: opacity 1000ms ease-in;
            }
            .transition_up{
                transform: translateY(-105%);
                transition: transform 1000ms ease-in;
            }
            .transition_down{
                transform: translateY(1%);
                transition: transform 1000ms ease-in;
            }

            li{
                text-align: center;
            }

            button{
                height: 100%;
                color:white;
                background-color:brown;
            }
            
            form{
              background-color:burlywood;
            }

            .scroll_x {
            overflow-x: auto;
            }

            .scroll_y {
            overflow-y: auto;
            width: fit-content;
            }

            .menu_x {
                display: flex;
                gap: 2rem;
                color:white;
                overflow-x: auto;
                list-style: none;
                margin: 0px;
                padding: 0px;
        }

        .menu_x > li {
            flex-shrink: 0;
            flex-grow: 1;
            height: auto;
        }

        .menu_y {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style: none;
            overflow-y: auto;
            padding: 0;
        }
        .menu_y > li {
            flex-shrink: 0;
            flex-grow: 1;
            height: 3rem;
        }

        </style>
        `;

        const rawHtml  = _html`
             <div >
                <form id="tabs_menu_form">
                    <input type="text" name="search" value="hello world" >
                    <button name="action" value="search">search</button>
                </form>

                <ul id="tabs_menu_ul" class="tabs_menu1 menu_x" width100>
                    <slot name="active"></slot>
                </ul>

                <div id="tabs_output"  class="tabs_output">
                </div>

        </div>
        `; 
       
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

         this.render(tplus.element); 

         this.initEventHandlers();
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
            let _btn    =createElement ("button",{name:_name,value:_value,class:"tabs_item"},_topic!)!;
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
    getTab(tabid:string):HTMLUiTab{
        let aTab:HTMLUiTab = new HTMLUiTab();

             this.tabs.forEach( node  => {

             const tab:HTMLUiTab = node as unknown as HTMLUiTab;

             if(tabid == tab.id) aTab = tab;
        }); 

        return aTab;
    }
    showTab(tabid:string){
     const  h3 =  this.getTab(tabid).querySelector("h3");
       const article =  this.getTab(tabid).querySelector("article");

        // console.log("showing tabid:",tabid , this.getTab(tabid), article);

        this.currentTab = tabid;

        if(h3 && article){
            this.tabs_output?.replaceChildren(h3.cloneNode(true));
            this.tabs_output?.appendChild(article.cloneNode(true));
        }
    }
    processClickEvent(evt:Event){
        const articleName = (evt.target as HTMLElement).getAttribute("name");
        const articleTopic = (evt.target as HTMLElement).getAttribute("topic");

    //    console.log(`processClickEvent ${articleName} ${articleTopic}`);

    //    this.controller.processRequest(articleName);
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);

        this.showTab( <string>fdata.get("id") );
  
    }
    processSlotChange(event:Event){
        
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const tab_items_dom = slot.assignedNodes().map(el => el );  

        //console.log("tab_items_dom ",tab_items_dom);
    
        const tab_items:string[] = [];

        tab_items_dom.forEach( node  => {

             const tab:HTMLUiTab = node as unknown as HTMLUiTab;
            
            let tab_items_sdom = `
                <li>
                  <form>
                    <button type="submit" name="action" value="tab_selected">
                     <p> ${tab.controller.view.topic} </p>
                    </button>
                    <input type="text" name="id" value="${tab.controller.view.id}" hidden>
                    <input type="text" name="lable" value="${tab.controller.view.lable}" hidden>
                    <input type="text" name="slot" value="${tab.controller.view.slot}" hidden>
                    <input type="text" name="topic" value="${tab.controller.view.topic}" hidden>
                  </form>
                </li>
            `;

            tab_items!.push(tab_items_sdom);

     //       console.log(tab_items_sdom);
     //       console.log(tab_items_sdom.replaceAll(" ",""));
           
        }); 

        this.tabs = tab_items_dom;

        const tabs_form  = this._shadowRoot.querySelector("[id=tabs_menu_form]");

        this.tabs_menu_ul = this._shadowRoot.querySelector("[id=tabs_menu_ul]")!;
        this.tabs_output = this._shadowRoot.querySelector("[id=tabs_output]")!;

        this.tabs_menu_ul?.replaceChildren();
        this.tabs_menu_ul?.insertAdjacentHTML("afterbegin", tab_items.join(" "));
    }
 }
//
class HTMLUiTabsController{
    view:HTMLUiTabsView;
    parent:HTMLUiTabs;
    tabs:tab_attr[] = [];
    version = "1.0.0";
    fi:FormInput = new FormInput(null as unknown as HTMLFormElement);
    get currentTab():string{return this.view.currentTab};
    set currentTab(value){this.view.showTab(value)};
    //
    constructor(parent:HTMLUiTabs) {
        this.parent = parent;
        this.view = new HTMLUiTabsView(this.parent._shadowRoot);
        this.version = "1.0.0";
    }
    initTabsAttributes(){

    for(let h of this.parent.children){

            let ta:tab_attr = {
                name: h.getAttribute("name")!,
                value: h.getAttribute("value")!,
                slot: h.getAttribute("slot")!,
                topic: h.getAttribute("topic")!,
                article_id: h.getAttribute("article_id")!,
                };

            this.tabs.push(ta);
    }

    }
    processRequest(articleID:string){
        console.log("Controller.processRequest()",articleID);
    }
    saveFormData(){

        const tplate_Form = this.view.currentElement.querySelector<HTMLFormElement>("form");
        const tab_output_Form = this.view.tabs_output.querySelector<HTMLFormElement>("form");

        if(!tab_output_Form  && !tplate_Form)return;

        const tab_output_fdata = new FormData(tab_output_Form!);

        // attach to template tab_item form
        this.fi.attachForm(tplate_Form!);

        // transfer values from tabs_output tab_item from to template tab_item form
        for(let [key,value] of tab_output_fdata){
            this.fi.attach(`${key}`);
            this.fi.setValue(`${value}`);
        }
    }
}
//
export class HTMLUiTabs extends HTMLElement implements WebComponentLifeCycle{
    controller:HTMLUiTabsController;
    _shadowRoot: ShadowRoot;
        // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  
    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["position", "height" , "scrollable", "id", "top","left","bottom","right"];

    constructor(){
        super();
        
        this._shadowRoot = this.attachShadow({mode: 'open'});

        this.controller = new HTMLUiTabsController(this);
    }
    connectedCallback(): void {
        this.controller.view.setupTemplate();
        console.log("...ui-tabs registered..");
    }
    disconnectedCallback(): void {
       // throw new Error('Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this.controller.view[name] = newValue;
    }
}
//
window.customElements.define("ui-tabs", HTMLUiTabs);
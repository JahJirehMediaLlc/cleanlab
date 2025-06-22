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
        background-color:purple;
        }

        .bg_blue{
          background-color: blue;
        }

        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
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
            overflow: auto;
            margin: 0px;
            padding: 0px;
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

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
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
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

        .ul_inline{
            display:inline-block;
            margin:0px;
            padding:0px;
        }
        .ul_inline li{
            display:inline-block;
        }

    </style>
`;

const rawHtml  = _html`
<h3>title</h3>
<slot name="title">
no title
</slot>

<h3>ui-nav actions</h3>

<slot name="items">
no items
</slot>

  <nav class="bg_blue flex_row">

        <select class=""> 
            <option>Action 1</option>
            <option>Action 2</option>
        </select>
        
        <ul class="menu_x">
            <li>Action 1</li>
            <li>Action 2</li>
        </ul>
     
     </nav>
`;
 
class HTMLUiNavView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;
    // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["width", "height", "url"];

    
    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.template = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
        this.setupTemplate();
    }
    setupTemplate(){
        const tplus = new TemplatePlus("");
    
        tplus.initTemplate(rawCss,rawHtml);

        console.log("slot=", tplus.element.slot || "..");
    
        this.render(tplus.element);

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
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);
        let req   = {
            action: <string>fdata.get("action"),
            lookup: <string>fdata.get("lookup"),
            template:<string>fdata.get("selected_template")
        } ;
        const custEvt = new CustomEvent("nav_event", { detail: req }  );

        globalThis.dispatchEvent( custEvt );
    }
}
class HTMLUiNavController {
    _view:HTMLUiNavView;
    _parent:HTMLUiNav;

    constructor(parent:HTMLUiNav){
    this._parent = parent;
    this._view = new HTMLUiNavView(this._parent._shadowRoot);
}
}
export class HTMLUiNav extends HTMLElement{
    _controller:HTMLUiNavController;
    _shadowRoot: ShadowRoot;
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiNavController(this);

        console.log("ui-nav registered..");
    }
}
window.customElements.define("ui-nav", HTMLUiNav);

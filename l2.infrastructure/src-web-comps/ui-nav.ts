import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus, Form} from  '../src-dom/domutils.ts';

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
  <nav class="bg_blue flex_row">
    <form id="nav_form"  action="">
            <select> 
                <option>Action 1</option>
                <option>Action 2</option>
            </select>
            
            <input id="1" type="radio" name="menu" value="1">
            <label for="1">Menu 1</label>

            <input id="2" type="radio" name="menu" value="2">
            <label for="2">Menu 2</label>

            <input type="text" value="search">

            <ul class="menu_x">
                <li>Action 1</li>
                <li>Action 2</li>
            </ul>
    </form>
  </nav>
`;
 
class HTMLUiNavView{
    template:TemplatePlus;
    _shadowRoot: ShadowRoot;    
    constructor(shadowRoot: ShadowRoot) {

        this._shadowRoot = shadowRoot;
        this.template = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
        this.setupTemplate();
    }
    setupTemplate(){
        const tplus = new TemplatePlus("");
        const slots = document.querySelectorAll(`[slot="nav-action"]`);
        const template = tplus.initTemplate(rawCss,rawHtml);
        const ul = template.content.querySelector(`ul`);
        const select = template.content.querySelector(`select`);
        let li = "";
        let option = "";

        ul!.replaceChildren();
        select!.replaceChildren();
   
        slots.forEach(el =>{

            li += `<li>${el.textContent}</li>`;
            option += `<option>${el.textContent}</option>`;
        });
        
        ul!.insertAdjacentHTML("afterbegin",li);
        select!.insertAdjacentHTML("afterbegin",option);

        this.render(tplus.element);

        this.initEventHandlers();
    }
    private initEventHandlers(){
    this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
    this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));

     console.log("initEventHandlers...");
    }
    render(node: HTMLTemplateElement|DocumentFragment){
        if(node instanceof HTMLTemplateElement)
            this._shadowRoot.appendChild(node.content);
        else
            this._shadowRoot.appendChild(node);
     }
    
    processClickEvent(event: Event){
        const clickedElement = event.target as HTMLElement;
        const form = this._shadowRoot.querySelector("form") as HTMLFormElement;
        const formjson = new Form(form);

        console.log(clickedElement.tagName);

       console.log(formjson.getJsonData());

    }

    processSubmitForm(event:SubmitEvent){

    event.preventDefault();

    const form = document.getElementById("some_form")  as HTMLFormElement;

    console.log("processSubmitForm",form);

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
        // satisfies webcomponentlifecycle interface
    observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiNavController(this);

        console.log("ui-nav registered..");
    }
}

window.customElements.define("ui-nav", HTMLUiNav);

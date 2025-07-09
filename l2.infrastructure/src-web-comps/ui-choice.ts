import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';

const rawCss = _css`
    <style>
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
            overflow-x: scroll;
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

    </style>
`;
const rawHtml  = _html`
<slot name="title">no title</slot>
<select class="bg_grey">
<slot name="item">
<option>no ui-select slot items provided</option>
</slot>
</select>
`;

class HTMLUiSwitchView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiSwitchController;

    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.setupTemplate();
    }
   setupTemplate() {

    const tplus = new TemplatePlus("tid");
    
    tplus.initTemplate( rawCss, rawHtml );

        this.render( tplus.element );
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
    processSubmitForm(evt:SubmitEvent){}
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

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiSwitchController(this);

        console.log("ui-Switch registered....");
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

window.customElements.define("ui-switch", HTMLUiSwitch);
import {TemplatePlus} from "../src-dom/domutils.ts";

function createRow(text:string[]):string{
return   "<tr>" + text.map(h=>`<td>${h}</td>`).join("") +"<tr>";
}
//
class HTMLUiTableView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiTableController;
    template:TemplatePlus;
    thead:HTMLElement;
    tbody:HTMLElement;
    //
    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
        this.template = new TemplatePlus("ui_table_template", new URL("http://localhost:3000/data/web_components.html"));
      //  this.setupTemplate();
    }
    setupTemplate(){

        this.template.content().then( frag => {

            this.thead = frag.querySelectorAll("table thead")[0] as HTMLElement;
            this.tbody = frag.querySelectorAll("table tbody")[0] as HTMLElement;

            fetch("http://localhost:3000/data/persons.json")
                .then(resp=> resp.json())
                .then(data=> {

                    const obj = data[0];
                    const rows = [];

                    this.thead.innerHTML = createRow( Object.keys(obj) );

                    data.forEach( o => {
                        let row = createRow( Object.values(o) );

                  // @ts-ignore
                        rows.push( row  );
                    
                    } );

                    this.tbody.innerHTML = rows.join('');

                    //         console.log(this.thead, this.tbody, frag);

                    this.render(frag);
                })

        });

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
}
//
class HTMLUiTableController{
    _view:HTMLUiTableView;
    _parent:HTMLUiTable;
 //
    constructor(parent:HTMLUiTable) {
        this._parent = parent;
        this._view = new HTMLUiTableView(this._parent._shadowRoot);
        this._view.setupTemplate();
    }
}
//
export class HTMLUiTable extends HTMLElement{
    _controller:HTMLUiTableController;
    _shadowRoot: ShadowRoot;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiTableController(this);

        console.log("ui-table registered....");
    }
}
//
window.customElements.define("ui-table", HTMLUiTable);
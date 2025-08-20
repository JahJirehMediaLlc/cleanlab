import {_html, _css, WebComponentLifeCycle} from '../src-dom/domutils.ts';
import {TemplatePlus, Template} from  '../src-dom/template-plus.ts';
import {sdom} from  '../src-dom/sdom.ts';
import {Fetch} from  '../src-dom/fetchmgr.ts';

function createRow(text:string[]):string{
return   "<tr>" + text.map(h=>`<td>${h}</td>`).join("") +"<tr>";
}
//
class HTMLUiTableView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiTableController;
   

    thead:sdom;
    tbody:sdom;
    //
    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }
    initSdom(){
        this.thead = new sdom("table_thead", this._shadowRoot);
        this.tbody = new sdom("table_tbody", this._shadowRoot);

        console.log(this.thead);
        console.log(this.tbody);
    }
    
    setupTemplate(){
        const rawCss = _css`
            <style>
            </style>
        `;

        const rawHtml  = _html`
            <div></div>
        `; 

        const template = new Template(rawCss, rawHtml);
        const tableTemplate = template.load("ui_table_template");

         this.render( template.asElement() ); 

         this.initSdom();

         this.updateTable2();
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


    
    updateTable(){
      console.log("updating table...")

      const tplus = new TemplatePlus("ui_table_template");

      tplus.content().then( frag => {

            this.thead.element = frag.querySelectorAll("table thead")[0] as HTMLElement;
            this.tbody.element = frag.querySelectorAll("table tbody")[0] as HTMLElement;

            fetch("http://localhost:3000/data/persons.json")
                .then(resp=> resp.json())
                .then(data => {

                    const obj = data[0];
                    const rows = [];

                    this.thead.element.innerHTML = createRow( Object.keys(obj) );

                    data.forEach( o => {
                        let row = createRow( Object.values(o) );

                  // @ts-ignore
                        rows.push( row  );
                    
                    } );

                    this.tbody.element.innerHTML = rows.join('');

                    //         console.log(this.thead, this.tbody, frag);

                    this.render(frag);
                })

        });

    }



    updateTable2(){
        
        const tplus = new TemplatePlus("ui_table_template");
        const template = new Template();
        const myFetch = new Fetch("json");
        
        console.log("updateTable2()...");

       myFetch.getJson("34").then(  p => console.log(p) );
 

    }



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
        // satisfies webcomponentlifecycle interface
    observedAttributes: string[];  

    // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["position", "height" , "scrollable", "id", "top","left","bottom","right"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiTableController(this);

        console.log("ui-table registered....");
    }
}
//
window.customElements.define("ui-table", HTMLUiTable);
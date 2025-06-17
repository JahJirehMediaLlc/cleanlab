type el_attr = {
    id:string;
    name:string;
    value:string;
    innerText:string;
}

/**
 * An class that creates DocumentFragment containing multiple HTML
 * elements. This is an Excellent way to populate the  shadow DOM.
 * 
 */
export class Template {
    _template: HTMLTemplateElement | null;
    _templatesMap: Map<string,HTMLTemplateElement> = new Map<string,HTMLTemplateElement>();
/**
* Loads a template using a specified element id.  
* @param {string } templateId - An id of the Template element in the document.
 * @param {URL } url - An id of the Template element in the document.
*/
    constructor(templateId: string , url:URL = new URL("http://localhost:3000/data/screens.html")) {
        this._template = null;

    ( async ()=>{
        const tm = await this.loadTemplates(templateId,url);
        console.log("loadtemplate results",tm)
    })()

    }
/**
* Use the fetch api to load a document that contains the template with specified id.  
* @param {string} url - URL of the file containing template element.
 * @param {string} elementID - ID of the innerElement.
* @return {Template} - a Template object.
*/

/**
* Returns the template as an element..
* @return {HTMLTemplateElement} - an HTMLElement representing the Template.
*/
    toElement():HTMLTemplateElement {
      return this._template!;
    }
/**
* Returns a node that represents the clone of the Template..
* @return {HTMLTemplateElement} - an Nodel representing the clone Template.
*/
    toClone():Node {
      return this._template!.content.cloneNode(true);
    }
/**
* Renders the Template into an element.  The existing content of the element is erased.
* @return {void} - void.
*/
    render(output: string):void {
      try{
        document.getElementById(output)!.replaceChildren(this.toClone());
      }
      catch(error){
        console.log(`Error writing to elementID[${output}]...${(error as Error).message}`);
      }
      //document.getElementById(templateId)!.appendChild(this.toClone());
    }
/**
* Renders a cloned copy of the Template into a Node.  The existing content of the element is preserved.
* @return {void} - void.
*/
    renderNode(parent:Node):void {
      parent!.appendChild(this.toClone());
    }
    innerHtml():HTMLElement{
        const inner = document.createElement("div");

        inner.setAttribute("class","hide");

        inner.append(this._template!.content.cloneNode(true));

        return inner as HTMLElement;
    }
    content():DocumentFragment{

        return this._template!.content;
    }
    clone():DocumentFragment{
        return <DocumentFragment>this._template!.content.cloneNode(true);
    }

    async loadTemplates(tempid:string,url:URL):Promise<Map<string,HTMLTemplateElement>>{

       const resp = await fetch(url);
       const text = await resp.text();
       const templates = this.parserDom(text,tempid);

       console.log("templates =",templates);

        return this._templatesMap;
    }
    parserDom(domText:string, query:string = "template"):HTMLElement[]{
        const domNodes = new DOMParser();

       const doc = domNodes.parseFromString(domText,"text/html");

        const templateElements = doc.querySelectorAll(query);

        templateElements.forEach(el => this._templatesMap.set(el.id,el as HTMLTemplateElement));

        console.log(this._templatesMap);

        return Array.from(this._templatesMap) as unknown as HTMLElement[];
    }
    init(tempid:string,screensUrl:URL = new URL("http://localhost:3000/data/screens.html")){

            this._template = document.createElement("template");
            this._template.innerHTML = "<p>new template</p>"

            const _url = new URL(screensUrl);




    }

    static createElement(tagName:string, attrs:el_attr):HTMLElement | DocumentFragment{
        let _attrs = "";

        for(const a in attrs){
           console.log(a);
        }

        const obj = attrs;

  //      for(const o in obj) console.log( obj[o] );

        return  Template.toDocumentFragment(`<${tagName} ${_attrs}'>${attrs.innerText}</${tagName}>`);
    }
    static fetchTemplate(url:URL,elementID:string): Template{
        let result = `"<span>${elementID}</span>`;

        //fetch the fragment from the url

        // html = new Fecch(url);

        // result = html.getElementByID(id);

        return new Template(result);
    }
    /**
     * Create a document fragment that contains the element(s) ot a webcomponent.
     * @param {string} value - string containg html.
     * @return {DocumentFragment} - a Template object.
     */
    static toDocumentFragment(value: string): DocumentFragment {
        let temp = document.createElement("template");

        temp.innerHTML = value;

        return temp.content;
    }
  }

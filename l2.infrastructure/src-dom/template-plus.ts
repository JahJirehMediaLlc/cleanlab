import {_html, Html , _css, createElement} from  '../src-dom/domutils.ts';

export class TemplatePlus{
  private _url: URL;
  private templateId: string = "";
  private template: HTMLTemplateElement | null;
  private _templatesMap: Map<string,HTMLTemplateElement>;
  private _remoteTemplates:HTMLTemplateElement[] = [];
  // acessors
  get id():string{return this.templateId};
  get map(): Map<string,HTMLTemplateElement>{return this._templatesMap};
  get element():HTMLTemplateElement{return this.template!}

  constructor(templateId: string , url:URL = new URL("http://localhost:3000/html/sdom_templates.html")) {
    this.templateId = templateId;
    this.template = this.createTemplate();
    this._url = url;
    this._templatesMap = new Map<string,HTMLTemplateElement>();

     this.template = this.localTemplate(templateId);
  }
  // creation logic
  public remoteTemplate(id:string):HTMLTemplateElement{
    let temp = this.getTemplateElement(id);
    let rct:HTMLTemplateElement; 
    
    if(id.trim()){

      temp.then( t => {
        console.log("remoteTemplate() rct = ", t);

        // rct = t.cloneNode(true) as HTMLTemplateElement;

        rct = t;

        this.templateId = id;

        return rct!;
      })
      
    }
 
    return this.createBlankTemplate();
  }
  public localTemplate(id:string):HTMLTemplateElement{
    let temp = document.getElementById(id) as HTMLTemplateElement;

    if(temp && id.trim()){
      this.template = temp.cloneNode(true)  as HTMLTemplateElement;
      this.templateId = id;
    }
    else
    {
     // console.log(`templateid ${id} not found creating blank one.`);

      this.template = this.createBlankTemplate();
    }

    return this.template;
  }
  public createTemplate():HTMLTemplateElement{
    const template = document.createElement("template");
    const cssMarkup = document.createElement("style");
    const htmlMarkup = document.createElement("div");
    const jsMarkup = document.createElement("script");
    const fragment = new DocumentFragment();

    htmlMarkup.setAttribute("class",`${this.id}_container`);

    fragment.append(cssMarkup, htmlMarkup, jsMarkup);

    template.content.append(fragment);

  return template;
  }
  public createBlankTemplate():HTMLTemplateElement{

  const rawCss  = _css`
  <style>

      h1{
        color:yellow;
      }
      .scroll_x {
          overflow-x: scroll;
      }

      .scroll_y {
          overflow-y: scroll;
          width: fit-content;
      }

      .flex_row {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 1rem;
      }

      .flex_col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
      }

      .bg_blue {
          background-color: cornflowerblue;
      }

      .bg_green {
          background-color: darkolivegreen;
      }

      .bg_grey {
          background-color: darkgray;
      }

      .hide {
          display: none;
      }

      .margins {
          margin: 1rem;
      }
  </style>
  `;
  const rawHtml  = _html`
  <h1>blank template</h1>
  `;

  return this.initTemplate(rawCss,rawHtml);
  }
  public initTemplate(rawCss:string, rawHtml:string):HTMLTemplateElement{

    this.insertAdjacentHtml(rawCss,rawHtml);

    return this.template!;
  }
  private insertAdjacentHtml(rawCss:string, rawHtml:string, rawJS:string = ""):HTMLTemplateElement{

    const style = this.template!.content.querySelector("style");
    style!.replaceChildren();
    style!.insertAdjacentHTML("afterbegin",rawCss);

    const div = this.template!.content.querySelector("div");
    div!.replaceChildren();
    div!.insertAdjacentHTML("afterbegin",rawHtml);

    const script = this.template!.content.querySelector("script");
    script!.replaceChildren();
    script!.insertAdjacentHTML("afterbegin",rawJS);

  return this.template!;
  }
  // asyns fetching logic
  private async fetchTemplates(templateId:string,url?:URL):Promise<Map<string,HTMLElement>>{

    this._url = url!;

  // load templates from template db
    const resp = await fetch(this._url);
    const text = await resp.text();

 // extract template elements from template db
    this.extractElement<HTMLTemplateElement>(text,templateId);

    return this._templatesMap;
  }
  async getTemplateElement(id:string = this.templateId):Promise<HTMLTemplateElement> {
    const templateList = await this.fetchTemplates(id,this._url);
    
    if(templateList.has(this.templateId)){
        this.template = <HTMLTemplateElement>templateList.get(this.templateId);
    }
    else{
        this.template = createElement<HTMLTemplateElement>("template", {});

        Html.insertElements(this.template ,"<h1>blank template</h1>");
    }

    return this.template;
  }
  async getDocumentFragment():Promise<DocumentFragment> {
    return (await this.getTemplateElement()).content;
  }
  async content():Promise<DocumentFragment> {
    return (await this.getTemplateElement()).content;
  }
  private extractElement<T>(domText:string, tempid:string):T[]{
    const doc = ( new DOMParser()).parseFromString(domText,"text/html");

    const templateElements = doc.querySelectorAll(`template`);

    templateElements.forEach(el =>{
      this._templatesMap.set(el.id,el as HTMLTemplateElement);
      this._remoteTemplates.push(el.cloneNode(true) as HTMLTemplateElement);
    });

    this.template = this._templatesMap.get(tempid)!;

    if(!this.template)this.template = createElement("template",{},"") as HTMLTemplateElement;

    return Array.from(this._templatesMap) as unknown as T[];
  }
  // rendering logic
  render(output:HTMLElement){
    if(this.template!.content){
      output.appendChild(this.template!.content.cloneNode(true));
    }
    else
    output.append(`${this.templateId} the template content not defined !!!!`);
  }

}

export class Template{
    rawcss:string;
    rawhtml:string;
    url:URL;
    _element:HTMLTemplateElement;

    get rawCss():string{return this.rawcss}
    set rawCss(value:string){ this.rawcss = value}
    get element():HTMLTemplateElement{return this._element}
    set element(value:HTMLTemplateElement){ this._element = value}
    get rawHtml():string{return this.rawhtml}
    set rawHtml(value:string){ this.rawhtml = value}

    constructor(rawcss:string="<style></style>", rawhtml:string="<div></div>"){
        this.rawcss = rawcss;
        this.rawhtml = rawhtml;

        this.element = new TemplatePlus("").initTemplate(rawcss,rawhtml);

    }

    fromHtmlTemplate(template:HTMLTemplateElement):Template{
        console.log("fromHtmlTemplate")
        return this;
    }

    fromUrl(url:URL):Template{
        console.log("fromURL")
        return this;
    }

    load(tid:string):Template{
        console.log("load", tid)
        
        return this;
    }
    asElement():HTMLTemplateElement{
      return this.element;
    }
}
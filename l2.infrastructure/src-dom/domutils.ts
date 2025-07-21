export type el_attr = { id:string; name:string; value:string; innerText:string;}
export type dim = {width:number, height:number}
export type pos = {x:number, y:number}
export type rect = {x:number, y:number, width:number, height:number}
export type trans = {  property:string,  duration:string,  timing:string}

// comment line to test my git setup

export class Html{
  static insertElements(element:HTMLElement, htmlText:string) :HTMLElement{
    //  console.log(`insertElements ${element.id} and erasing children`);

      element.replaceChildren();

      element.insertAdjacentHTML("afterbegin",htmlText);

      return element;
  }
  static wrapElement(tagName:string, attrs:object, element: HTMLElement) :HTMLElement {
    return wrapElement(tagName, attrs, element);
  }
  static getElementIndex(element:HTMLElement) : number{
    return getElementIndex(element);
  }
  static createElement(tagName:string, attrs:object, innerText:string = "") :HTMLElement{
    return createElement(tagName,attrs,innerText);
  }
}
export function addClass(element:HTMLElement,className:string){
  element.classList.add(className);
}
export function removeClass(element:HTMLElement,className:string){
  if( element.classList.contains(className) )element.classList.remove(className);
}
export function _html(strings: TemplateStringsArray, ...expressions: any[]){
  return expressions.reduce( (acc,exp,indx) => { return acc + exp + strings[indx + 1]; }, strings[0]);
}
export function _css(strings: TemplateStringsArray, ...expressions: any[]){
  return expressions.reduce( (acc,exp,indx) => { return acc + exp + strings[indx + 1]; }, strings[0]);
}

export interface WebComponentLifeCycle{
  connectedCallback():void;
  disconnectedCallback():void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string):void;
  observedAttributes:string[];
}

export class Css{
  static hide(element:HTMLElement,state:boolean): Css{

  if(state)
    addClass(element,"hide");
  else
    removeClass(element,"hide");

  return this;
  }
  static flex(element:HTMLElement,state:boolean) : Css{

  if(state)
    addClass(element,"flex_row");
  else
    addClass(element,"flex_column");

  return this;
  }
  static wrap(element:HTMLElement,state:boolean): Css{
  if(state)
    addClass(element,"wrap");
  else
    removeClass(element,"wrap");

      return this;
  }
  static border(element:HTMLElement,state:boolean) : Css{
   if(state)
     addClass(element,"border");
   else
     removeClass(element,"border");

      return this;
  }

}
export class FormInput{
element: HTMLInputElement;
form: HTMLFormElement;
elementID:string;
/**
* creates a FormInput object
* @param {HTMLFormElement} aForm - id of an input element(HTMLInputElement).
*/
constructor(aForm:HTMLFormElement){
  this.attachForm(aForm);
}
attachForm(form:HTMLFormElement){
  this.form = form;
}
/**
* attaches an element for manipulation.
* @param {string} attr_name - id of an input element(HTMLInputElement) to attach..
* @return {void} - void
*/
attach(attr_name:string):void{

  this.elementID = attr_name;

  this.element = this.form.querySelector<HTMLInputElement>(`[name=${attr_name}]`)!;

   if(!this.element)console.log(`!!! element attribute [${attr_name}] is invalid`);

}

/**
* adds a css class to the element
* @param {string} className - the name of a css class from a style sheet.
* @return {void} - void
*/
public addCssClass(className:string){
this.element.classList.add(className);
}
/**
* removes a css class from the element
* @param {string} className - the name of a css class from a style sheet.
* @return {void} - void
*/
public removeCssClass(className:string):void{
  this.element.classList.remove(className);
}
/**
* set the value attribute on the element
* @param {string} value - the value to be assigned.
* @return {void} - void
*/
public setValue(value:string){
  if(this.element)
  this.element.value = value;
else
console.log("element is invalid");
}
/**
* gets the selectedIndex for a select element(HTMLSelectElement).
* @return {number} - the selectIndex of the select element
*/
public getSelectedIndex():number{
  return (this.element as unknown as HTMLSelectElement).selectedIndex;
}
/**
* gets the selectedValue for a select element(HTMLSelectElement).
* @return {number} - the value on the select element
*/
public getSelectedValue():string{
const select = (this.element as unknown as HTMLSelectElement);

return select.options[this.getSelectedIndex()].value;
}
/**
* sets the selectedIndex for a select element(HTMLSelectElement).
* @param {number} value - the selectIndex of the select element
* @return {void} - void
*/
public setSelectedIndex(value:number):void{
  const select = (this.element as unknown as HTMLSelectElement);

  select.selectedIndex = value;
}
/**
* sets the Value for a select element(HTMLSelectElement).
* @param {string} value - the value to be assigned
* @return {void} - void
*/
public setSelectedValue(value:string):void{
  const select = (this.element as unknown as HTMLSelectElement);

  select.value = value.toString();
}
/**
* adds one or more child elements to the attached element.
* The attached element is cleared out.
* @param {string} tagName - the tagName of the child element
* @param {el_attr[]} attrs - innerText of the child elements
* @return {void} - void
*/
public addChild(tagName:string, attrs:el_attr[]):void{

// erase exixting child elements
this.element.innerText = "";

// add new child elements
attrs.forEach( (attr)=>{
  this.element.appendChild( createElement(tagName,attr) );
});

}
/**
* inserts one or more child elements to the attached element.
* The attached element is not cleared out.
* @param {string} tagName - the tagName of the child element
 * @param {el_attr[]} attrs - innerText of the child elements
 * @return {void} - void
*/
public insertChild(tagName:string, attrs:el_attr[]){
  attrs.forEach( (text)=>{
    this.element.appendChild( createElement(tagName,text) );
  });
}
/**
* returns the index of the select element option with the
* specified value.
*
* 0 is returned if no option has the value.
* @param {string} value - the value of the option being sought
* @return {number} - the index of the option, 0 if no options was found.
*/
public optionIndex(value:string):number{
const select = this.element as unknown as HTMLSelectElement;
let index = 0;

Array.from(select.options).forEach(element => {
  if(element.value == value)index = element.index;
});

return index;
}

}
export class Form{
  public element:HTMLFormElement;
  private formData:FormData;
  public name:string;
  public method:string;
  public http_verb:string;
  public path_action:string;

  /**
   * Creates a form object using and element or its id.
   * @param el
   */
  constructor(el: HTMLFormElement | string){
  if( typeof el === "string")
    this.element = document.getElementById(el) as HTMLFormElement
  else
    this.element = el;

    this.formData = new FormData(this.element)

    this.name = this.element.name;
    this.method = this.element.method;
    this.http_verb = this.element.method;
    this.path_action = this.element.action;
  }
  /**
   *
   * @returns a FormData object containg the values of the form.
   */
  getData():FormData{
    return this.formData;
  }
  /**
   * Get the form input as key/value pairs.
   * @returns an object containh the key and value for the form input element.
   */
  getJsonData():{}{
    let jsonData = {}
// @ts-ignore
    for(const [key,value] of this.formData)jsonData[key] = value;

    return jsonData;
  }
  /**
   * Adds key/value to Form.  used for manual form building.
   * @param key
   * @param value
   */
  append(key:string, value:string){
  this.formData.append(key,value);
  }
  /**
   * Check if an element is in the form.
   * @param {HTMLFormElement} form - a Form Element to check
   * @param {HTMLElement} control - an input element to look for.
   * @returns
   */
  static isPresent(form:HTMLFormElement, control:HTMLElement){
  let rc = false;

    for(let i =0; i != form.elements.length; i++)
    {
      if(form.elements[i].id === control.id){
        rc = true;
        break;
      }
    }

    return rc;
  }
  /**
   * Gets the form that contains the specified element.
   * @param {HTMLElement} control - an input element to look for.
   * @returns
   */
  static getForm(control:HTMLElement):Form{
  const forms = document.querySelectorAll("form");
  let form:Form = null as unknown  as Form;

  /* Cycle through  form element and look for the control
      if found return element as Form object.
  */ 
  forms.forEach( (_form)=>{
                  if(this.isPresent(_form,control))form = new Form(_form);
                });

  return form;
  }

  isValid(cb:()=>void):boolean{
    return true;
  }

  print(){
    console.log(`### [method:${this.method}] [path_action:${this.path_action}] [http_verb:${this.http_verb}] ###`);

    for(const [key,value] of this.formData){
      console.log(`${key}: ${value}`);
    }
  }

  static printFormData(formData:FormData){

    for(const [key,value] of formData){
      console.log(`${key}: ${value}`);
    }
  }
}
export class Dimensions{
  _el: HTMLElement;
  //
  constructor(el:string | HTMLElement){
    (typeof el === "string") ? this._el = document.getElementById(el)!: this._el = el

  }
  //
  windowInner():dim{
    return {width:window.innerWidth,height:window.innerHeight};
  }
  //
  client():dim{
    return {width:this._el.clientWidth,height:this._el.clientHeight};
  }
  // layout values
  offset():dim{
    return {width:this._el.offsetWidth,height:this._el.offsetHeight};
  }
  // render values after transformation
  boundingRect() :rect{
    return {x: 0, y: 0, width:this._el.getBoundingClientRect().width, height:this._el.getBoundingClientRect().height}
  }
  //
  computedStyles() :dim{
    const compStyle = getComputedStyle(this._el);

    return {width: parseInt(compStyle.width),height: parseInt(compStyle.height)};
  }
  //
  viewPortRect():rect{
    return {x: parseInt(this._el.style.top), y: parseInt(this._el.style.right), height: parseInt(this._el.style.height),  width: parseInt(this._el.style.width)}
  }
//
}
export class Animator{
  _el: HTMLElement;
  opts:trans = {
    duration: "3s",
    property: "transform",
    timing: "ease-in"

  };
  stops:string[] =[];
  //
  constructor(el:string | HTMLElement , options?:trans) {

    (typeof el === "string") ? this._el = document.getElementById(el)! : this._el = el;

    if(options)this.opts = options;

    this.transition(true);

  }
  //
  transition(value: boolean):Animator{

    if(value){
      this._el.style.transitionProperty = this.opts.property;
      this._el.style.transitionDuration = this.opts.duration;
      this._el.style.transitionTimingFunction = this.opts.timing;
    }
    else{
      this._el.style.transition = "none";
    }
     
   return this;
  }
  //
  execute(){
    console.log( "animating :",this._el.id, this.stops.join(" "));

    window.requestAnimationFrame( ()=> this._el.style.transform  = `${this.stops.join(" ")}`);

    return this;
  }
  //
  right(pixels:number):Animator{

    this.stops.push(`translateX(${pixels}px)`);

    return this;
  }
  //
  left(pixels:number):Animator{

    this.stops.push(`translateX(${-pixels}px)` );

    this._el.style.transform  =`translateX(${-pixels}px)`;

    return this;
  }
  //
  up(pixels:number):Animator{
    this.stops.push( `translateY(${-pixels}px) rotateZ(${pixels}deg)` );

    return this;
  }
  //
  down(pixels:number):Animator{
    this.stops.push( `translateY(${pixels}px)` );

    return this;
  }
  //
  move(x:number,y:number):Animator{
    this.stops.push(`translate(${x}px,${y}px)` );

    return this;
  }
  //
  opacity(value:number):Animator{
    this.stops.push( `????/(${value}deg)` );

    this._el.style.opacity  = `${value}`;

    return this;
  }
  //
  rotate(value:number):Animator{

    this.stops.push( `rotateZ(${value}deg)` );

    return this;
    }
  //
  fullScreen(vpu:number = 100){
      this._el.style.height = `${vpu}vh`;
  }
}

export function wrapElement(tagName:string, attrs:object, element: HTMLElement) : HTMLElement{
  let attributes = "";

  Object.entries(attrs).forEach( ([key,value]) => {
    attributes += `${key}=${value} `;
  } )

  const  results =  new DOMParser().parseFromString(`<${tagName} ${attributes}>${element.outerHTML}</${tagName}>`, "text/html");

  return results.querySelectorAll(tagName)[0] as unknown as HTMLElement;
}
export function createElement<T = HTMLElement>(tagName:string, attrs:object, innerText:string = "") :T{
let attributes = "";

// @ts-ignore
for( let key in attrs)attributes += `${key}="${attrs[key]}" `;

let newTag = `<${tagName} ${attributes}>${innerText}</${tagName}>`;

const  results =  new DOMParser().parseFromString( newTag, "text/html");

return results.querySelectorAll(tagName)[0] as unknown as T;
}
export function getElementIndex(element:HTMLElement): number{

  console.log("the siblings are:",element.parentNode!.children);

  return Array.from(element.parentNode!.children).indexOf(element);
}
export function insertElement<T = HTMLElement>(element:HTMLElement , htmlText:string) :T{
   element.insertAdjacentHTML("afterbegin", htmlText);
   return element as T;
}
export class TemplatePlus{
  private _url: URL;
  private templateId: string = "";
  private template: HTMLTemplateElement | null;
  private _templatesMap: Map<string,HTMLTemplateElement>;
  // acessors
  get id():string{return this.templateId};
  get map(): Map<string,HTMLTemplateElement>{return this._templatesMap};
  get element():HTMLTemplateElement{return this.template!}

  constructor(templateId: string , url:URL = new URL("http://localhost:3000/data/screens.html")) {
    this.templateId = templateId;
    this.template = this.createTemplate();
    this._url = url;
    this._templatesMap = new Map<string,HTMLTemplateElement>();

     this.template = this.localTemplate(templateId);
   
  }
  // creation logic
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

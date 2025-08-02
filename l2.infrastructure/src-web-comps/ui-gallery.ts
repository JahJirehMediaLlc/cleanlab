import {_html, _css, Css, WebComponentLifeCycle} from  '../src-dom/domutils.ts';
import {TemplatePlus} from  '../src-dom/template-plus.ts';
import {Fetch} from  '../src-dom/fetchmgr.ts';

class HTMLUiGalleryView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiGalleryController;
    template:TemplatePlus;
    galleryImagesList:HTMLElement | null = null;
    li_items:string[] | null = null;
    currentImage:HTMLImageElement | null = null;
    selectedElement:HTMLElement| null = null;
    galleryBtnForm:HTMLElement | null = null;
    selectedImageIndex:number = 0;
    gallerySize:number = 0;

    _imageid:string;
    _width:string;
    _id:string;
    _height:string;
    _path:string;

    get id():string{return this._id}
    set id(value:string){this._id = value}
    get path():string{return this._path}
    set path(value:string){this._path = value}
    get width():string{return this._width}
    set width(value:string){this._width = value}
    get height():string{return this._height}
    set height(value:string){this._height = value}

    set SelectedImageIndex(index:number) {

        if(index < 0)index = this.gallerySize-1;
        if(index >= this.gallerySize)index = 0;

        this.selectedImageIndex = index;

        this.setFocus(index);
    }
    get SelectedImageIndex() {
        return this.selectedImageIndex;
    }
    //
    constructor(shadowRoot: ShadowRoot) {
        this._shadowRoot = shadowRoot;
    }

    setupTemplate(){
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
                    color: black;
                    background-color: grey;
                }

                ::slotted(li){
                    color: blue;
                    list-style: none;
                    margin: 0 2rem;
                    width: fit-content;
                }

                img{
                    display: inline-block;
                    max-width: 100%;
                    height: auto;
                    /* margin: 0px auto; */
                }

                .menu_x {
                    display: flex;
                    gap: 2rem;
                    overflow-x: auto;
                    color:white;
                }

                .menu_x > * {
                    flex-shrink: 0;
                }

                .menu_y {
                    display: flex;
                    flex-direction: column;
                    gap: .31rem;
                    list-style: none;
                    overflow-y: auto;
                    padding: 0;
                    margin: 0;
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

                .flex_center{
                    display:flex;
                    align-items: center ;
                    justify-content: center;
                }

                .text_center{
                    text-align:center;
                    margin: 0 auto;
                }

                .space_between{justify-content: space-between;}

                .space_around{justify-content: space-around;}

                .shrink_off{flex-shrink: 1;}
                .shrink_on{ flex-shrink: 0;}

                .grow_on{flex-grow: 1;}
                .grow_off{flex-grow: 0;}

                .hide{display:none;}

                .border{border: 5px red solid;}
                .border2{border: 2px green solid;}
                .border3{border: 3px blue solid;}

                figcaption0{display:none;}
                
                .height15{height:15rem;}
                .height20{height:20rem;}
                .height23{height:23rem;}

                 .width{width:fit-content;}
                 .width25{width:25%;}
                 .width50{width:50%;}
                 .width75{width:75%;}
                 .width100{width:100%;}
               

               .img_current{
                  border: 4px black dashed;
               }

               .bg_image{
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    background-position: 0% 0%;
                    background-color: red};
                }

            .reset{
                    box-sizing: border-box;
                    margin: 0;
                    padding:0;
                }
            </style>`;

        const rawHtml  = _html`
            <section>
                     <!--   Gallery Form Controls and Buttons -->

                    <div  class="gallery_btns_container">
                        <form id="gallery_btn_form"  action="">
                            <button name="action" value="prev">prev.</button>
                            <button name="action" value="next">next.</button>

                            <label for="slide_show">AutoScroll</label>
                            <input id="slide_show"  name="auto_scroll" type="checkbox">

                            <label for="slider">Hide Slider</label>
                            <input id="slider" name="slider" type="checkbox">
                        </form>
                    </div>

                    <!-- Thumbnails and current image container-->

                    <div id="flex_container" class="flex_row">

                     <!--  Thumbnails List-->

                        <div class="text_center height20 grow_off width25" >
                            <ul id="gallery_images_list" class="menu_y scroll_y height20">
                              <slot name="image"></slot>
                            </ul>
                        </div>

                        <!--  Current Image -->

                        <div id="current_image" class="bg_blue height20 width100 bg_image" style="background-image: url(images/a-task-event-function-call.png);">
                        </div>

                    </div>
                    <br>

             </section>`; 
  
        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

        this.render(tplus.element);
    }

    render(node:DocumentFragment | HTMLTemplateElement){

        if(node  instanceof DocumentFragment) 
            this._shadowRoot.appendChild(node);
        else
            this._shadowRoot.appendChild(node.content);
      
    }

    setFocus(index:number){

        return; 

        let newSelectedImage = this.galleryImagesList!.getElementsByTagName("img")[index];
        let oldSelectedImage = this.galleryImagesList!.getElementsByClassName("border")[0] as HTMLElement;

        let image = this.galleryImagesList!.getElementsByTagName("img")[index];
     
        this.currentImage!.setAttribute("src", image.getAttribute("src")!);

        if( oldSelectedImage)Css.border(oldSelectedImage,false);

        Css.border(newSelectedImage,true);
    } 
    //
    startSlide(){

    }
    showCurrentImage(src:string, title:string){

        const currentImmage = this._shadowRoot.getElementById("current_image");
        const bg_style = `background-image: url(${src});`
        
        currentImmage?.setAttribute("style",  `${bg_style}`);
        currentImmage?.setAttribute("title",  `${title}`);
    }

}
//
class HTMLUiGalleryController{
    view:HTMLUiGalleryView;
    parent:HTMLUiGallery;
    //
    constructor(parent:HTMLUiGallery) {
        this.parent = parent;
        this.view = new HTMLUiGalleryView(this.parent._shadowRoot);
        this.initEventHandlers();
    }
    private initEventHandlers(){
        this.view._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this.view._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
     //   this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }
    setupTemplate(){
        this.view.setupTemplate();
    }
    processClickEvent(event: Event){
        this.view.selectedElement = event.target as HTMLElement;

         alert(`processSubmitFor ${this.view.selectedElement.tagName}}   ${this.view.SelectedImageIndex}`);

        return;

        if (this.view.selectedElement!.tagName.toUpperCase() !== "IMG")return;

        let images = this.view.galleryImagesList!.getElementsByTagName("img");

        this.view.SelectedImageIndex = Array.from(images).indexOf(this.view.selectedElement as HTMLImageElement);

       //this.setFocus(this.SelectedImageIndex);
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);

     //for(const [key,value] of fdata)console.log(`${key} : ${value}`);

        switch( <string>fdata.get("action") ){
            case "prev":
                this.view.SelectedImageIndex -= 1;
                break;
            case "next":
                this.view.SelectedImageIndex += 1;
                break;
             case "image_selected":
                this.view.showCurrentImage(<string>fdata.get("src"), <string>fdata.get("title"))
                break;
        }

    }
    //
    processSlotChange(event:Event){
        
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const li_items_dom = slot.assignedNodes().map(el => el );  
    
        this.view.li_items = [];

        li_items_dom.forEach(li => {
            
            const image = (li as HTMLElement).querySelector("img");
            const fcaption = (li as HTMLElement).querySelector("figcaption");
            
            let li_items_sdom = `
                <li>
                  <form>
                    <button type="submit" name="action" value="image_selected">
                      <img src="${image!.src}" title="${fcaption!.innerText}"
                    </button>
                    <input type="text" name="src" value="${image!.src}" hidden>
                    <input type="text" name="title" value="${fcaption!.innerText}" hidden>
                  </form>
                </li>
            `;

            this.view.li_items!.push(li_items_sdom);
            this.view.gallerySize = this.view.li_items!.length;
        }); 

        const ul = this.view._shadowRoot.querySelector("[id=gallery_images_list]");

        ul?.replaceChildren();
        ul?.insertAdjacentHTML("afterbegin",this.view.li_items.join(" "));
    }
}
//
export class HTMLUiGallery extends HTMLElement implements WebComponentLifeCycle{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiGalleryController;
    // satisfies webcomponentlifecycle interface
   observedAttributes: string[]; 
   // this property must be static inorder to receive attributechangedcallback allsbe 
   static observedAttributes = ["width", "height", "path", "imageid"];

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.controller = new HTMLUiGalleryController(this);

        console.log("ui-gallery registered....");
    }
    connectedCallback(): void {
         this.controller.view.setupTemplate();
    
    }
    disconnectedCallback(): void {
    //    throw new Error('Method not implemented.');
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.controller.view[name] = newValue;
    }
}
//
window.customElements.define("ui-gallery", HTMLUiGallery);
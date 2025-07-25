import {_html, Html , _css, Css, WebComponentLifeCycle, TemplatePlus} from  '../src-dom/domutils.ts';
import {Fetch} from  '../src-dom/fetchmgr.ts';

class HTMLUiGalleryView{
    _shadowRoot: ShadowRoot;
    controller:HTMLUiGalleryController;
    template:TemplatePlus;
    galleryImagesList:HTMLElement | null = null;
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
        this.initEventHandlers();
    }

    private initEventHandlers(){
        this._shadowRoot.addEventListener("slotchange",this.processSlotChange.bind(this));
        this._shadowRoot.addEventListener("submit",this.processSubmitForm.bind(this));
        this._shadowRoot.addEventListener("click",this.processClickEvent.bind(this));
    }

    //
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
                    background-color: cyan;
                }

                ::slotted(li){
                   color: red;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    border: 1px red solid;
                    align-items: center ;
                    justify-content: center;
                }

                 ::slotted(.fig){
                   color: red;
                    margin: 0;
                    padding: 0;
                }

                .menu_x {
                    display: flex;
                    list-style: none;
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
                    gap: 0.51rem;
                    text-align: center;
                    list-style: none;
                    width: fit-content;
                }

                .menu_y > * {
                    margin: 0;
                    padding: 0;
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

                .space_between{justify-content: space-between;}

                .space_around{justify-content: space-around;}

                .shrink_off{flex-shrink: 1;}
                .shrink_on{ flex-shrink: 0;}

                .grow_on{flex-grow: 1;}
                .grow_off{flex-grow: 0;}

                .hide{display:none;}

                .border{border: 1px red solid;}
                .border2{border: 2px green solid;}
                .border3{border: 3px blue solid;}

                figcaption0{
                display:none;
                }

            </style>`;

        const rawHtml  = _html`
            <section>
                    <!-- Thumbnails and Current Image -->
                    <div class="flex_row space_around">
                    <!--  Thumbnails -->
                        <div class="border grow_off shrink_off scroll_y">
                                <ul id="gallery_images_list" class="menu_y">
                                    <slot class="image" name="image"></slot>
                                </ul>
                        </div>
                        <!--  Current Image -->
                        <div class="border grow_on1 shrink_on1 bg_blue width75">
                                <figure>
                                    <img id="current_image" class="img_current" src="images/ArchitecuralDiagrams.jpg" alt="Hello Alt">
                                    <figcaption>current figure.</figcaption>
                                </figure>
                        </div>
                    </div>
                    <br>
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
             </section>`; 

        const tplus = new TemplatePlus("");

        tplus.initTemplate( rawCss, rawHtml );

        this.render(tplus.element);

       const myFetch = new Fetch("html","/html/web_components.html");
       const myFetch2 = new Fetch("html","/html/screens.html");

        myFetch2.getTemplate("gallery_template").then( t => console.log(t));

        myFetch.getTemplate("ui_gallery_template").then( frag => {

           // init user controls
           this.currentImage = frag.content.getElementById("current_image") as HTMLImageElement;
           this.galleryImagesList = frag.content.getElementById("gallery_images_list") as HTMLUListElement;
           this.galleryBtnForm = frag.content.getElementById("gallery_btn_form") as HTMLFormElement;
           
           let ui_gallery = document.getElementById("gallery1") as HTMLElement;

           console.log("gallery ",ui_gallery);
           console.log(this.currentImage);
           console.log(this.galleryImagesList);
           console.log(this.galleryBtnForm);

           console.log("Gallery size",this.gallerySize );

        });

    }
 
    //
    render(node:DocumentFragment | HTMLTemplateElement){

        if(node  instanceof DocumentFragment) 
            this._shadowRoot.appendChild(node);
        else
            this._shadowRoot.appendChild(node.content);
       
    }
    processClickEvent(event: Event){
        this.selectedElement = event.target as HTMLElement;

        if (this.selectedElement.tagName.toUpperCase() !== "IMG")return;

        let images = this.galleryImagesList!.getElementsByTagName("img");

        this.SelectedImageIndex = Array.from(images).indexOf(this.selectedElement as HTMLImageElement);

      //   alert(`processSubmitFor ${this.selectedElement.tagName}}   ${this.SelectedImageIndex}`);

       //this.setFocus(this.SelectedImageIndex);
    }
    processSubmitForm(evt:SubmitEvent){
        evt.preventDefault();

        const fdata = new FormData(evt.target as HTMLFormElement, evt.submitter);

        //   for(const [key,value] of fdata)console.log(`${key} : ${value}`);

        switch( <string>fdata.get("action") ){
            case "prev":
                this.SelectedImageIndex -= 1;
                break;
            case "next":
                this.SelectedImageIndex += 1;
                break;
        }

    //    alert(`processSubmitFor ${<string>fdata.get("action")}   ${this.SelectedImageIndex}`);
    }
    processSlotChange(event:Event){
        let slot = event.target as HTMLSlotElement;
        // list of elements with slot name
        const items = slot.assignedElements().map(el => el );
        const items2 = slot.assignedNodes().map(el => el );

        console.log(`slot :`, slot);
        console.log(`slot name: ${this[slot.name]}`);
        console.log(`items :`, items[0].children[0].children[0]);
        console.log(`items2 :`, items2);
        console.log(`items count : ${items.length}`);
    }

    //
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

}
//
class HTMLUiGalleryController{
    view:HTMLUiGalleryView;
    parent:HTMLUiGallery;
    //
    constructor(parent:HTMLUiGallery) {
        this.parent = parent;
        this.view = new HTMLUiGalleryView(this.parent._shadowRoot);
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
import {TemplatePlus, wrapElement} from "../src-dom/domutils.ts";
import {addClass,createElement,Css,getElementIndex} from "../src-dom/domutils.ts";

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
        this.template = new TemplatePlus("ui_gallery_template", new URL("http://localhost:3000/data/web_components.html"));

        this.setupTemplate();;
    }
    //
    setupTemplate(){
        this.template.content().then( frag => {

            // init user controls
            this.currentImage = frag.getElementById("current_image") as HTMLImageElement;
            this.galleryImagesList = frag.getElementById("gallery_images_list") as HTMLUListElement;
            this.galleryBtnForm = frag.getElementById("gallery_btn_form") as HTMLFormElement;

           let images_li = document.querySelectorAll("ui-gallery li");
       
            this.gallerySize = images_li.length;

         //   console.log("Gallery size",this.gallerySize );

            const tn_img = document.createElement("li");
            tn_img.insertAdjacentHTML("afterbegin",`<img class="img_thumbnai" src="images/icons/icon72.png">`);
           
            // add a thumbnail for each gallery image
            //add user specified thumb nails into ul

            this.galleryImagesList.replaceChildren();

            images_li.forEach( li => this.galleryImagesList!.appendChild(li) );

            // register event listners
            if(this.galleryImagesList && this.galleryBtnForm){
                this.galleryImagesList.addEventListener("click", this.processClickEvent.bind(this));
                this.galleryBtnForm.addEventListener("submit", this.processSubmitForm.bind(this));

                console.log("event handlers sucessfully registered..");
            }
            else{
                console.log("event handlers not registered..");
            }

            // feych data to be used in template
            fetch("http://localhost:3000/data/gallery.json")
                .then(resp=> resp.json())
                .then(data=>{
                    // process image list for shadow dom display
                   // console.log("gallry data fetched...",data);
                })

            this.SelectedImageIndex = 2;

            this.render(frag);

            this.setFocus(this.SelectedImageIndex);

        });
    }
       render(node:DocumentFragment | HTMLTemplateElement){

     if(!node){
        console.log("node is null");
        return;
    }

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
    //
 
    setFocus(index:number){
        let newSelectedImage = this.galleryImagesList!.getElementsByTagName("img")[index];
        let oldSelectedImage = this.galleryImagesList!.getElementsByClassName("border")[0] as HTMLElement;

        let image = this.galleryImagesList!.getElementsByTagName("img")[index];
     
        this.currentImage!.setAttribute("src", image.getAttribute("src")!);

        if( oldSelectedImage)Css.border(oldSelectedImage,false);

        Css.border(newSelectedImage,true);
    } 
    startSlide(){}
}
//
class HTMLUiGalleryController{
    _view:HTMLUiGalleryView;
    _parent:HTMLUiGallery;
    //
    constructor(parent:HTMLUiGallery) {
        this._parent = parent;
        this._view = new HTMLUiGalleryView(this._parent._shadowRoot);
    }
}
//
export class HTMLUiGallery extends HTMLElement{
    _controller:HTMLUiGalleryController;
    _shadowRoot: ShadowRoot;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._controller = new HTMLUiGalleryController(this);

        console.log("ui-gallery registered....");
    }
}
//
window.customElements.define("ui-gallery", HTMLUiGallery);
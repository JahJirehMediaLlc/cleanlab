import {TemplatePlus} from "../../src-dom/domutils.ts";

export * from '../../src-web-comps/web_components.ts';

type panel_type = "left" | "right" | "top" | "bottom" | "center";

const rawCss = `
<style>
    h1{
        color:red;
    }
</style>
`;
const rawHtml = `
<h1>....Hello ....</h1>
`;

class AppShellView{
    topPanel:HTMLElement;
    bottomPanel:HTMLElement;
    centerPanel:HTMLElement | null;
    leftPanel:HTMLElement;
    rightPanel:HTMLElement;

    panels = new Map<panel_type,HTMLElement>;

    constructor() {
        this.topPanel = document.getElementById("top_panel")!;
        this.panels.set("top", this.topPanel);

        this.bottomPanel = document.getElementById("bottom_panel")!;
        this.panels.set("bottom", this.bottomPanel);

        this.centerPanel = document.getElementById("center_panel")!;
        this.panels.set("center", this.centerPanel);

        this.leftPanel = document.getElementById("left_panel")!;
        this.panels.set("left", this.leftPanel);

        this.rightPanel = document.getElementById("right_panel")!;
        this.panels.set("right", this.rightPanel);

        this.setupTemplate();
    }
    setupTemplate(){
        const tplus = new TemplatePlus("");
        
         tplus.initTemplate( rawCss, rawHtml);

        this.render(tplus.element);
    }

    render(node:HTMLTemplateElement | DocumentFragment, panel:panel_type = "center"){

        if(!node){
            console.log("node is null");

            return;
        }

        const outPanel = this.panels.get(panel!) || this.centerPanel;

       if(node instanceof DocumentFragment) 
             outPanel!.replaceChildren(node);
        else
            outPanel!.replaceChildren(node.content);

       
    }

    print(innerContent:string, format: "paragraph" | "text" = "text"){
        try{
            if(format === "paragraph")
                this.centerPanel!.innerHTML += `<p>${innerContent}</p>`;
            else
                this.centerPanel!.innerHTML += `<text>${innerContent}</text>`;
        }
        catch(error){
            console.log((error as Error).message);
        }

    }

    addClass(element:HTMLElement,className:string){
        this.listClass(element);

        if(element.classList)element.classList.add(className);
    }
    deleteClass(element:HTMLElement,className:string){
        this.listClass(element);

        if(element.classList)element.classList.remove(className);
    }
    listClass(element:HTMLElement) : string[]{
        const results:string[] = [];

        if(element.classList)element.classList.forEach(cl => {results.push(cl)});

        return results;
    }

    show(panel:HTMLElement | null){
      if(panel!.classList.contains("hide"))this.deleteClass(panel!,"hide");
    }
    hide(panel:HTMLElement | null){
        this.addClass(panel!,"hide");
    }

    center(flag:boolean){
        if(flag)
            this.centerPanel!.classList.add("center");
        else
            this.centerPanel!.classList.remove("center");
    }
    clear(){
       if(this.centerPanel) this.centerPanel.replaceChildren();
    }

    showPanel(panel: panel_type){
        if( panel == "left" )this.show(this.leftPanel);
        if(panel == "right")this.show(this.rightPanel);
        if(panel == "top") this.show(this.topPanel);
        if(panel == "bottom")this.show(this.bottomPanel);
    }

    hidePanel(panel: panel_type){
        if( panel == "left" )this.hide(this.leftPanel);
        if(panel == "right")this.hide(this.rightPanel);
        if(panel == "top") this.hide(this.topPanel);
        if(panel == "bottom")this.hide(this.bottomPanel);
    }

}
class AppShellModel{
}

class AppShellController{
_view:AppShellView = new AppShellView();
_model: AppShellModel = new AppShellModel();

constructor() {
    this.initHandlers();
}
// register domContentLoaded and winLoad and nav_event
initHandlers(){
    globalThis.onload = this.windowLoaded.bind(this);

    document.addEventListener("DOMContentLoaded", this.domLoaded.bind(this));

    globalThis.addEventListener("nav_event", this.navEventHandler.bind(this));
}
// DocumentContentLoaded Handler
domLoaded(){
    const tp = document.getElementById("top_panel");

    tp!.addEventListener("submit", (e)=>alert("yadda..." + e.target) );

    console.log("DOM ready");
}
// WinLoad Handler
windowLoaded(){
    const tplus = new TemplatePlus("nav_template");

    controller.showPanel("top", tplus);

    console.log("all resources are loaded");
}
navEventHandler(event:Event){
    console.log("nav_event received", (event as CustomEvent).detail)
    _showComponent( (event as CustomEvent).detail.template)
}
print(text:string){
    this._view.print(text, "text");
}
printLn(text:string){
    this._view.print(text, "paragraph");
}
showPanel(_panelName: panel_type, tplus: TemplatePlus){
    tplus.getTemplateElement().then( telement => this.render(telement,"top"));

}
hide(panelName: panel_type){
    this._view.hidePanel(panelName);
}
centerView(){
    this._view.center(true);
}
resetView(){
    this.clearView();
    this._view.center(false);
}
clearView(){
    this._view.clear()
}
render(node:HTMLTemplateElement | DocumentFragment, panel:panel_type = "center"){
    this._view.render(node, panel);
}
}

function _showLogo(){
    controller.resetView();
    controller.centerView();
    controller.printLn("<h1>LOGO</h1>")
}
function _showComponent(templateId:string){

    const tplus = new TemplatePlus(templateId);

    console.log("showing component ",templateId);

    tplus.getTemplateElement().then( te => {
        controller.resetView();
        controller.render(te, "center");
    })

}

const controller = new AppShellController();
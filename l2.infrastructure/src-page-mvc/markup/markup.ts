import {TemplatePlus, _css, _html} from "../../src-dom/domutils.ts";

export * from '../../src-web-comps/web_components.ts';

function getTemplateList():string[]{
const rc:string[] = [];
const templates = document.querySelectorAll("template");

Array.from(templates).forEach( template => rc.push(template.id) );

return rc;
}
function initSelectList():HTMLElement | null{
    const templateList = document.getElementById("templateList");

    const options:string = getTemplateList().map( item => `<option value="${item}">${item}</option>`).join(" ");

    templateList?.insertAdjacentHTML("afterbegin",options);

return templateList;
}
function initHandler(){
addEventListener("submit", eventHandler);

console.log("Markup EventHandler initialized...");
}
function eventHandler(event:SubmitEvent){
    event.preventDefault();

    const form = document.getElementById("template_select_form")  as HTMLFormElement ;

    const fdata = new FormData(form, event.submitter);

  //  fdata.forEach( (key,value) => console.log(`name: ${value}  value: ${key} `)) ;

      showTemplate( fdata.get("selectedTemplate") as string );
}
function showTemplate(id:string){
const tplus = new TemplatePlus("");
const output = document.getElementById("output");

tplus.localTemplate(id);

output?.replaceChildren();

tplus.render(output!);

console.log("showing template:", id);
}

initSelectList();

initHandler();
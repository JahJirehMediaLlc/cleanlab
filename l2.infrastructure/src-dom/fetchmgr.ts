export class Fetch{
    private baseUrl: string =  "http://localhost:3000";
    private pathName:string;
    private url:URL;

    constructor(context:"json" | "html", pathName:string = "/data/screens.html" ){
    this.pathName = pathName;
    this.url = new URL(this.baseUrl+this.pathName);
    }

    async getJson(id:string):Promise<object>{

    return {};
    }

    async getTemplate(tid:string):Promise<HTMLTemplateElement>{
        
       const tlist =  await this.fetchHtml("template");

        return tlist.find(e => e.id == tid) as HTMLTemplateElement;
    }

    async fetchHtml(etype:string):Promise<HTMLElement[]>{
        const url = new  URL( `http://localhost:3000/${this.pathName}` );
        
       const response = await fetch(url);
       const rawHtml = await response.text();
       const htmlList = this.parseRawHtml(rawHtml,etype);
       
       return htmlList;
    }

    parseRawHtml(rawhtml:string, elementName:string = "template"):HTMLElement[]{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");
    const elements = dom.querySelectorAll(`${elementName}`);

    const aElements = Array.from(elements);

    // console.log(`element type = ${elementName} :`, elements);
    // console.log(`element type = ${elementName} :`, aElements);

    return aElements as HTMLElement[];
    }

    async fetchJson(id:string):Promise<object[]>{
       const url = new  URL( `http://localhost:3000/${this.pathName}` );
       const response = await fetch(url);
       const rawJson = JSON.parse(await response.json());
       const jsonString = this.parseRawJson(rawJson);
       
       return rawJson;
    }

    parseRawJson(rawjson:object):string{
        return JSON.stringify(rawjson);
    }

}
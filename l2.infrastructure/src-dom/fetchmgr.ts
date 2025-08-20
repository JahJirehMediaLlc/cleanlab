export class Fetch{
    private baseUrl: string =  "http://localhost:3000";
    private pathName:string;
    private url:URL;

    get path():string{return this.pathName};
    set path(value:string){ this.pathName = value};

    constructor(context:"json" | "html", resoName:string = "/dom_templates.html" ){

        resoName = resoName.replace("/","");

        this.pathName  = `/html/${resoName}`;

        if(context == "json")this.pathName = `/data/persons.json`;

        if(context == "json" && resoName.endsWith(".json"))
            this.pathName = `/data/${resoName}`;
        
        this.url = new URL(`${this.baseUrl}${this.pathName }`);

      //  console.log(this.url, context,  this.pathName);

    }

    async getJson(id:string):Promise<object>{

        const persons = await this.fetchJson(id);

       //  console.log("getJson", id, persons);

        return persons[0];

    }

    async fetchJson(id:string):Promise<object[]>{

        const response = await fetch(this.url);
        const rawJson = await response.json();
        const jsonString = this.parseRawJson(rawJson);
        
       // console.log("fetchjson url", this.url);
      //  console.log(rawJson,jsonString);

       return rawJson;
    }

    async getTemplate(tid:string):Promise<HTMLTemplateElement>{
        
       const tlist =  await this.fetchHtml("template");

        const rc = tlist.find(e => e.id == tid) as HTMLTemplateElement;

      //  console.log(this.url,tid, tlist);

       return rc;
    }

    async fetchHtml(etype:string):Promise<HTMLElement[]>{

       const response = await fetch(this.url);
       const rawHtml = await response.text();
       const htmlList = this.parseRawHtml(rawHtml,etype);
       
       return htmlList;
    }

    parseRawHtml(rawhtml:string, elementName:string = "template"):HTMLElement[]{
        const dom = new DOMParser().parseFromString(rawhtml,"text/html");
        const style = dom.querySelector("style");
        const body = dom.querySelector("body");
        const elements = dom.querySelectorAll(`${elementName}` );

        const aElements = Array.from(elements);

        // console.log(`element type = ${elementName} :`, elements);
        //  console.log(`element type = ${elementName} :`, aElements);

        return aElements as HTMLElement[];
    }

    parseRawJson(rawjson:object):string{
        return JSON.stringify(rawjson);
    }

}
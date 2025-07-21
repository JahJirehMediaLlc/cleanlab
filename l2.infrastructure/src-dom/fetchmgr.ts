export class Fetch{
    private baseUrl: string =  "http://localhost:3000";
    private pathName:string;
    private url:URL;

    constructor(context:"json" | "html", pathName:string = "/data/screens.html" ){
    this.pathName = pathName;
    this.url = new URL(this.baseUrl+this.pathName);

    console.log("fetchgr....");
    }

    getJson():object[]{
    return [];
    }

    getHtml():string[]{
        let rc;

        this.fetchHtml(this.pathName, rc);

        return rc;
    }

    fetchHtml(path:string, output:string[]){
    const url = new  URL( `http://localhost:3000/${path}` );
        fetch(url)
        .then( response => response.text() )
        .then( rawHtml => this.parseRawHtml(rawHtml)  )
        .catch( e => console.log(e) )
    }

    parseRawHtml(rawhtml:string, elementName:string = "template"):HTMLElement[]{
    const dom = new DOMParser().parseFromString(rawhtml,"text/html");
    const style = dom.querySelector("style");
    const body = dom.querySelector("body");
    const elements = dom.querySelectorAll(`${elementName}`);

    console.log(`element type = ${elementName} :`,elements);

    return elements as unknown as HTMLElement[];
    }

    fetchJson(path:string, output:HTMLElement){
        const url = new  URL( `http://localhost:3000/${path}` );
        fetch(url)
        .then( response => response.json() )
        .then( rawHJson => output.innerHTML = JSON.stringify(this.parseRawJson(rawHJson)) )
        .catch( e => console.log(e) )
    }

    parseRawJson(rawjson:string):object{
        return {}
    }
}
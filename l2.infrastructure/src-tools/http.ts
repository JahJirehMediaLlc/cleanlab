type PostOptions = {method:string,body:any};
type GetOptions = {method:string,body:any};
export class Http{
    _url:string;
    _response:any;
    _result:any;
    constructor(url:string){
        this._url = url;
    }
    async post(fd:FormData){
        let postoptions:PostOptions = {method: "POST", body: fd};
    
        this._response = await fetch(this._url,postoptions);
        this._result = this._response.json();
    }
    async get(fd:FormData){
    
        this._response = await fetch(this._url);
        this._result = this._response.json();
    }
    result():any{
        return this._result.message;
    }
}
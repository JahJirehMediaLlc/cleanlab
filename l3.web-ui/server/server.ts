import express from 'npm:express';
// deno-lint-ignore no-unused-vars
import ejs from 'npm:ejs'
import path from 'npm:path'
import cors from 'npm:cors';
// import bodyParser from 'npm:body-parser';
import { Logger, Authenticate } from './services/middleware.ts';
import { prompt } from './services/tools.ts';

type config = {
port: number,
version:string,
serverDir: string,
clientDir: string,
assetsDir:string,
viewsDir:string,
wwwrootDir:string
}
export class Server{
port:number;
aConfig:config;
app = express();
//
constructor(_aConfig:config){
this.port = _aConfig.port;
this.aConfig = _aConfig;

console.log("sever", _aConfig);
}

// View engine setup (global vars are being set)
initViewEngine( engine:"pugs" | "ejs",folder?:string){
const vf =  folder || 'views';

console.log(`Initializing view engine [${engine}] [${vf}] ..`);

this.app.set('views', vf);
this.app.set('view engine', engine);

console.log(` [${engine}] View Engine initialized...`);

}
// static server, cors, bodyParser.urlencoded, bodyParser.json
initMiddleWare(){
// serve static files
this.app.use(express.static(this.aConfig.assetsDir));
this.app.use(express.static(this.aConfig.wwwrootDir));

// accept cross orgin requests
this.app.use(cors());

// parse application/x-www-form-urlencoded
this.app.use( express.urlencoded( {extended: false} ) );

// parse multipart/formdata 
this.app.use( express.json( ));

console.log("Middleware initialized [static server, cors, bodyparser.json , bodyParser.urlencoded]....");
}
// Logger and Authenticate
initCustomMiddleWare(){
// Log request and response
this.app.use(Logger);
this.app.use(Authenticate);

console.log("Custom Middleware initialized [Logger and Authenticate]....");
}
//
async listen(){

this.app.listen(this.port, () => {
    console.log(`Listening on port:${this.port}`);
});

const rc = await prompt("enter exit to quit?");

if( rc )return;
}
}
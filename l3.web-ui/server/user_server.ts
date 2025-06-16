import express from 'npm:express';
// deno-lint-ignore no-unused-vars
import ejs from 'npm:ejs'
import path from 'npm:path'
import cors from 'npm:cors';
// import bodyParser from 'npm:body-parser';

import { Logger, Authenticate } from './services/middleware.ts';

import { prompt } from './services/tools.ts';

const assetsDir  = path.join(Deno.cwd(), 'assets');
const wwwrootDir = path.join(Deno.cwd(), 'wwwroot');

export class UserServer{
port = Deno.env.get("APP_PORT") || 3000;
app = express();
//
constructor(){

}
//
initViewEngine2(){

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
this.app.use(express.static(assetsDir));
this.app.use(express.static(wwwrootDir));

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

export const ver = 10.1;
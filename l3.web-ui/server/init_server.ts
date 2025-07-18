import {Request, Response} from 'npm:express';
import path from 'npm:path'
import {File as _File} from './services/fileio.ts';
import {Server} from './server.ts';

import { about_router } from './routers/about_router.ts';
import { user_router } from './routers/user_router.ts';
import { pizza_router } from './routers/pizza_router.ts';
import { contact_router } from './routers/contact_router.ts';
import { repository_router } from './routers/repository_router.ts';

const serverDir:string = Deno.cwd();
const clientDir:string = Deno.cwd().replace("server","client");

type config = {
port: number,
version:string,
serverDir: string,
clientDir: string,
assetsDir:string,
viewsDir:string,
wwwrootDir:string
}
//
const _aConfig:config = {
port: Deno.env.get("APP_PORT") || 3000,
version :'v1.90',
serverDir: Deno.cwd(),
clientDir: Deno.cwd().replace("server","client"),
viewsDir : path.join(Deno.cwd(), 'views'),
assetsDir : path.join(clientDir, 'assets'),
wwwrootDir : path.join(clientDir, 'wwwroot'),
}
//
function handleRoutes(user_server:Server){
// show welcome web page
user_server.app.get("/", (_req:Request,res:Response) => {
res.sendFile(path.join(_aConfig.assetsDir,"welcome.html"));     // send file from static path
});
// show index web page
user_server.app.get("/index", (_req:Request,res:Response) => {
  res.render(`index`, _aConfig);  // send file from view engine
});

// handle custom routes
user_server.app.use( "/user", user_router );
user_server.app.use( "/contact", contact_router );
user_server.app.use( "/about", about_router );
user_server.app.use( "/pizza", pizza_router );
user_server.app.use( "/repo", repository_router );
}
/*   
  viewsDir:   "E:\\projects\\CleanLab\\l3.web-ui\\server\\views",
  assetsDir:  "E:\\projects\\CleanLab\\l3.web-ui\\server\\assets",
  wwwrootDir: "E:\\projects\\CleanLab\\l3.web-ui\\server\\wwwroot" 

  viewsDir:   "E:\\projects\\CleanLab\\l3.web-ui\\server\\views",
  assetsDir:  "E:\\projects\\CleanLab\\l3.web-ui\\client\\assets",
  wwwrootDir: "E:\\projects\\CleanLab\\l3.web-ui\\client\\wwwroot"
  */

//
async function setupServer(){

const user_server = new Server(_aConfig);
//
user_server.initViewEngine("ejs");
// cors , static files, body-parser
user_server.initMiddleWare();
// routing and logging
user_server.initCustomMiddleWare();

handleRoutes(user_server);

await user_server.listen();
}

await setupServer();

Deno.exit();
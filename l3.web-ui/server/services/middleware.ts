import  { Nextfunction, Request, Response} from 'npm:express';
import path from 'npm:path';

const _version = 1.0;

// Authenticate middleware
export function Authenticate(_req:Request,res:Response, next:Nextfunction):void{

  const auth = false;

    if( auth ){
      return res.status(401).send("user not logged in");
    }

    next();
}

// Logger middleware
export function Logger(req:Request,_res:Response, next:Nextfunction):void{
  type logDto = {
    msg:string,
    utc: string,
    timestamp: string,
    http_vrb:string,
    body: string,
    qstring:string,
    action_url:string,
    referrer:string,
    cwd:string
  }

  const logdto:logDto={
    msg:"Logger Output:",
    utc: Date.now().toString(),
    timestamp: (new Date()).toLocaleString(),
    http_vrb: req.method,
    body: JSON.stringify(req.body),
    qstring: JSON.stringify(req.query),
    action_url: req.url,
    referrer: req.referrer,
    cwd: path.basename(Deno.cwd())
  }

    try{
       console.log(logdto);
      next();
    }
    catch(error){
      next(error);
    }
  
}
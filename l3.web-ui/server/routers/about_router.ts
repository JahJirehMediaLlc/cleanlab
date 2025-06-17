import {Router, Request, Response} from 'npm:express';
import {Authenticate as _Authenticate} from '../services/middleware.ts';
import {person,user} from '../../../l0.domain/domain_types.ts';
import {repository as repo} from '../services/repository.ts';

// Initialize router
export const about_router = Router();

about_router.route( "/" )
.get( (_req:Request,resp:Response)=>{ 

  console.log("repository status",repo.status());
  resp.render("about");
} )
.post( (req:Request,resp:Response)=>{
  resp.send(`post all about..${req.params.id || "@"}`)
  console.log(`post all about...${req.params.id || "@"}`, req.body);
} )
.put( (req:Request,resp:Response)=>{
  resp.send(`put all about...${req.params.id || "@"}`)
  console.log(`put all about...${req.params.id || "@"}`, req.body);
} )
.delete( (req:Request,resp:Response)=>{
  resp.send(`delete all about...${req.params.id || "@"}`)
  console.log(`delete all about...${req.params.id || "@"}`, req.body);
});
//
about_router.route("/:id")
.get( (req:Request,resp:Response)=>{resp.send(`get single about..${req.params.id}`)})
.post((req:Request,resp:Response)=>{resp.send(`post single about...${req.params.id}`)})
.put((req:Request,resp:Response)=>{resp.send(`put single about...${req.params.id}`)})
.delete((req:Request,resp:Response)=>{resp.send(`delete single about...${req.params.id}`)});
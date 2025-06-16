import {Router, Request, Response} from 'npm:express';
import {Authenticate as _Authenticate} from '../services/middleware.ts';
import {person,user} from '../../../lab-domain/domain_types.ts';
import {repository as repo} from '../services/repository.ts';

// Initialize router
export const contact_router = Router();

contact_router.route( "/index" )
.get( (_req:Request,resp:Response)=>{ 
  console.log("repository status",repo.status());
  resp.render("contact");
} )
.post( (req:Request,resp:Response)=>{
  resp.send(`post all contact..${req.params.id || "@"}`)
  console.log(`post all contact...${req.params.id || "@"}`, req.body);
} )
.put( (req:Request,resp:Response)=>{
  resp.send(`put all contact...${req.params.id || "@"}`)
  console.log(`put all contact...${req.params.id || "@"}`, req.body);
} )
.delete( (req:Request,resp:Response)=>{
  resp.send(`delete all contact...${req.params.id || "@"}`)
  console.log(`delete all contact...${req.params.id || "@"}`, req.body);
});

contact_router.route("/:id")
.get( (req:Request,resp:Response)=>{resp.send(`get single contact..${req.params.id}`)})
.post((req:Request,resp:Response)=>{resp.send(`post single contact...${req.params.id}`)})
.put((req:Request,resp:Response)=>{resp.send(`put single contact...${req.params.id}`)})
.delete((req:Request,resp:Response)=>{resp.send(`delete single contact...${req.params.id}`)});

contact_router.route("/")
.get( (req:Request,resp:Response)=>{
  resp.send(`
get single contact..
id:${req.query.id}
name: ${req.query.name}
title:${req.query.title}
dto: ${JSON.stringify(req.query)}
`)
})
.post((req:Request,resp:Response)=>{resp.send(`post single contact...${req.params.id}`)})
.put((req:Request,resp:Response)=>{resp.send(`put single contact...${req.params.id}`)})
.delete((req:Request,resp:Response)=>{resp.send(`delete single contact...${req.params.id}`)});
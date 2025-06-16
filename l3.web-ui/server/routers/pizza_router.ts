import {Router, Request, Response} from 'npm:express';

// Initialize router
export const pizza_router = Router();

pizza_router.route( "/" )
.get( async (_req:Request,resp:Response)=>{ 
    const pizza_resp = await fetch("http://localhost:3000/data/pizzatoppings.json");

    resp.status(200).json(await pizza_resp.json());
} )
.post( (req:Request,resp:Response)=>{
  resp.send(`post all pizzas..${req.params.id || "@"}`)
  console.log(`post all pizzas...${req.params.id || "@"}`, req.body);
} )
.put( (req:Request,resp:Response)=>{
  resp.send(`put all pizzas...${req.params.id || "@"}`)
  console.log(`put all pizzas...${req.params.id || "@"}`, req.body);
} )
.delete( (req:Request,resp:Response)=>{
  resp.send(`delete all pizzas...${req.params.id || "@"}`)
  console.log(`delete all pizzas...${req.params.id || "@"}`, req.body);
});

pizza_router.route("/:id")
.get( (req:Request,resp:Response)=>{resp.send(`get single pizza..${req.params.id}`)})
.post((req:Request,resp:Response)=>{resp.send(`post single pizza...${req.params.id}`)})
.put((req:Request,resp:Response)=>{resp.send(`put single pizza...${req.params.id}`)})
.delete((req:Request,resp:Response)=>{resp.send(`delete single pizza...${req.params.id}`)});
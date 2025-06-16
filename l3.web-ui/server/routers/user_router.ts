import {Router, Request, Response} from 'npm:express';
import {Authenticate as _Authenticate} from '../services/middleware.ts';
import {person,user} from '../../../lab-domain/domain_types.ts';
import {repository as repo} from '../services/repository.ts';

// Initialize router
export const user_router = Router();

//
function createPayload(http_verb:string, aPerson:person):object{
  const verbs = new Map<string,string>();

  verbs.set("PUT","User has been Created");
  verbs.set("GET","User has been Read");
  verbs.set("POST","User has been Updated");
  verbs.set("DELETE","User has been Deleted");

  const rc = {
    msg: `${verbs.get(http_verb.toUpperCase())}`,
    utc: Date.now().toString(),
    timestamp: (new Date()).toLocaleString(),
    http_verb: http_verb,
    repo: repo.status(),
    payload: aPerson,
  };
 
 return rc;
}
//
user_router.route( "/index" )
.get( (req:Request,resp:Response)=>{ 
  const aPerson:person = req.query;

  const payload = createPayload("GET", aPerson );

  resp.render("user");

  console.log(`
get /user/index  
input[${JSON.stringify(payload)}] 

output[user.ejs]:`);
});
//
user_router.route("/")
.get( (req:Request,resp:Response)=>{
  const qstring = req.query;

  const _new_user:user = {
    id: "0",
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    phone: "",
    contact: {
      id: "",
      first_name: "",
      last_name: "",
      age: 0,
      email: "",
      phone: "",
      kids: undefined
    },
    company: "",
    dob: "",
    ssn: "",
    address: {
      id: "",
      user_id: "",
      street: "",
      bldg_apt: "",
      city: "",
      state: "",
      zip: ""
    }
  };

  const aUser:user = repo.getUser(qstring.id)!;

  if(aUser)
    resp.status(200).json(JSON.stringify({msg:`User ${qstring.id} found`,payload:aUser}));
 else
    resp.status(404).json(JSON.stringify({msg:`User ${qstring.id} not found`,payload:aUser||"undefine"}));

console.log(`
GET /user/ single user.  

input : [${JSON.stringify({msg:"qstring",payload:qstring})}]

output: [${JSON.stringify({msg: `Get Sungle User ${qstring.id}`,payload:aUser||"undefine"})}]:`);
}

)
.post((req:Request,resp:Response)=>{
  const aPerson:person = req.body;

  const payload = createPayload("POST", aPerson);

  resp.status(200).json(payload);

  console.log(`
  POST /user/ single user.  
  input[${JSON.stringify(payload)}]

  output[${JSON.stringify(payload)}]:`);
})
.put((req:Request,resp:Response)=>{
  const aPerson:person = req.body;

  const payload = createPayload("PUT", aPerson);

  resp.status(200).json(payload);

  console.log(`
PUT /user/ single user.  
input[${JSON.stringify(payload)}]

output[${JSON.stringify(payload)}]:`);
})
.delete((req:Request,resp:Response)=>{
const aPerson:person = req.body;

const payload = createPayload("DELETE", aPerson);

resp.status(200).json(payload);

console.log(`
DELETE /user/ single user.  
input[${JSON.stringify(payload)}] 

output[${JSON.stringify(payload)}]:`);
});
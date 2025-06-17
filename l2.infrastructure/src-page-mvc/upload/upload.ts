import {Form, FormInput, MockFormData,MockFormData2} from '../../src-dom/domutils';
import {user} from '../../../lab-deno-express/src-domain/domain';
import {Logger, Console, AutoScroller} from '../../../lab-tools/src-tools/tools';

type json = object;

type getDto ={ 
id: number,
user_id: string,
q1?: string,
q2?: string,
q3?: string
}

type formDto = {
  btnID: string,
  btnValue: string,
  formAction: string,
  formID: string,
  formMethod: string,
  httpVerb:string,
  formData:FormData,
}

type fetchOpts = {
  method: string | "GET" | "POST" | "PUT" | "DELETE",
  body?:{},
  headers?:Headers,
}

interface User{
   setID(id:string):void;
  setCurrentSelectedUser(id:string):void;
  setUserList(userList:user[]):void;
  setFirstName(firstname:string):void;
  setLastName(lastname:string):void;
  setAge(age:number):void;
  setFmail(email:string):void;
  setPhone(phone:string):void;
}

class UserModel{
  
}

class UserView implements User{
private formProcessor: ( cb:any )=>void;
private userListForm = document.getElementById("user_list_form") as HTMLFormElement;
private userDetailsForm = document.getElementById("user_details_form")as HTMLFormElement;
private currentSelectedUserID = "0";
fi:FormInput = new FormInput(null);
private autoscroll = new AutoScroller(document.getElementById("console"));
//
 constructor(){

    try{
      this.userListForm.addEventListener("submit",this.formHandler.bind(this));
      this.userDetailsForm.addEventListener("submit",this.formHandler.bind(this));
      this.userListForm.addEventListener("change",this.userChangeHandler.bind(this));
      this.autoscroll.startObserving();
    }
    catch(e){
      con.log(`error adding event listner to forms element ...${e.message}`);
    }

}
// Master form items
setID(id: string): void {
  this.fi.attach("user_id_master");
  this.fi.setValue(id);

  con.log(`setID master ${id}`);
}
setCurrentSelectedUser(id: string): void {
  con.log(`setCurrentSelectedUser ${id}`);
}
setUserList(users:user[]){
  this.fi.attach("user_id_list");
  //this.fi.addChild("option",users.map((user)=>`${user.last_name},${user.first_name}`));
}
// Details form items
setUserID(userID:string){
  this.fi.attach("user_id_details");
  this.fi.setValue(userID);
  con.log(`setUserID ${userID}`);
}
setFirstName(first_name:string){
  this.fi.attach("user_first_name");
  this.fi.setValue(first_name);
  con.log(`setFirstName ${first_name}`);
}
setLastName(last_name){
  this.fi.attach("user_last_name");
  this.fi.setValue(last_name);
  con.log(`setLasttName ${last_name}`);
}
setAge(age:number):void{
  this.fi.attach("user_age");
  this.fi.setValue(age.toString());
  con.log(`setAge ${age.toString()}`);
}
setFmail(email:string):void{
  this.fi.attach("user_email");
  this.fi.setValue(email);
  con.log(`setEmail ${email}`);
}
setPhone(phone:string):void{
  this.fi.attach("user_phone");
  this.fi.setValue(phone);
  con.log(`setPhone ${phone}`);
}
//
userChangeHandler(event:SubmitEvent){
this.fi.attach("user_id_list");

console.log(`
User Changed: 
index[${this.fi.getSelectedIndex()}] 
value[${this.fi.getSelectedValue()}]
`);
}
formHandler(event:SubmitEvent):void{
   
    event.preventDefault();
    // get the form element that contains the submit buton
    const _parent = Form.getForm(event.submitter);
    // use Form adapter/proxy to access form element
    const _form = new Form(_parent.element);

    let fdata:formDto = {
      btnID: event.submitter.id,
      btnValue: (event.submitter as HTMLButtonElement).value,
      httpVerb: (event.submitter as HTMLButtonElement).value,
      formID: _form.name,
      formMethod: _form.method,
      formAction: _form.path_action,
      formData: _form.getData(),
    };

    Form.printFormData(fdata.formData);

    // if formprocessor is registered by controller, call it. otherwise error.
    if(this.formProcessor)
      this.formProcessor(fdata);
    else
    {
      con.log("formProcessor not registered...");
      throw("UserView: formProcessor not registered...");
    }

}
//
setFormProcessor( aCallback:any ){
    this.formProcessor = aCallback;

    con.log("registering form processor....");
}
//
updateMaster(currentID:string, users:user[] ){
console.log("updateMaster", currentID, users);
this.setID(currentID);
this.setUserList(users);
}
//
updateDetails(aUser:user){
console.log("updateDetails", aUser);
this.setID(aUser.id);
this.setFirstName(aUser.first_name);
this.setLastName(aUser.last_name);
this.setAge(aUser.age);
this.setFmail(aUser.email);
this.setPhone(aUser.phone);
}
}
//
function printStatus(fdto:formDto, response:Response, payload:object){

  con.log(`
controller.processRequests...
--------------------------------------
fetching action[${fdto.formAction}] verb [${fdto.httpVerb}]
response.ok=${response.ok}
response.status=${response.status}
--------------------------------------
`);

con.log(`payload:${JSON.stringify(payload)}`);
}
//
async function getPayload(resp:Response):Promise<object>{
  return await resp.json();
}
//
async function repoFetch(jsonfile:string):Promise<user[]>{
  const response = await fetch(`http://localhost:3000/data/${jsonfile}`);
  const userjson = await response.json();

  console.log(`${jsonfile} fetched...`, userjson);

  return userjson;
}

//
class UserPageController{
  model:UserModel = new UserModel();
  view:UserView = new UserView();

  constructor(){
  const user:user={
    id: '11111111',
    first_name: 'john',
    last_name: 'doe',
    age: 11111,
    email: 'email@gmail.com',
    phone: '213-301-1444-111-111111111111'
  };

  this.view.setFormProcessor(this.processRequests);

  const jsonfile = repoFetch('users.json');

  jsonfile.then( json=>this.view.updateMaster("0", json));
  }
  //
  async responseStatus(fdto:formDto, response:Response, payload:object){

    printStatus(fdto,response,await  response.json());

  }
  //
  async processRequests(fdto:formDto){

    const payload = fdto.formData;
    const form = new Form(fdto.formID);
    
    if( "GET"  === fdto.httpVerb.toUpperCase() )
      {
      let qstring = "";

      const fetchopts = {method:"GET"};
      const form = new Form(fdto.formID);
  
      const formDto:getDto = form.getJsonData() as getDto;

      if(formDto.q1)qstring+=("q1="+formDto.q1);
      if(formDto.q2)qstring+=("&q2="+formDto.q2);
      if(formDto.q2)qstring+=("&q2="+formDto.q3);

      if(qstring.length)qstring = "?"+qstring;

      console.log("qstring =", qstring);

      // @ts-ignore
      const response = await fetch(`http://localhost:3000/users/${formDto.id}${qstring}`, fetchopts);

      printStatus( fdto, response, await response.json());

      return;
    }

  //  const payload3 = new URLSearchParams(fdto.formData);
    const userDto:user = form.getJsonData() as user;

    const payload4 = JSON.stringify(userDto);

    // Form.printFormData(fdto.formData);

    const headers:Headers = new Headers();

    headers.set("Content-type","application/json; charset=UTF-8");

/*    
headers.set("Content-type","multipart/form-data; charset=UTF-8");
headers.set("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
*/

    let fopts:fetchOpts = {
      method: fdto.httpVerb.toUpperCase(),
      headers: headers,
      body: payload4,
    };

    // @ts-ignore
    const response = await fetch(`http://localhost:3000/users`, fopts);

    printStatus(fdto,response,await response.json());
  }

}

const logger = new Logger();
const con = new Console(document.getElementById("console"));
const userPC = new UserPageController();

con.log("module [users.js] loaded and initialized..:");
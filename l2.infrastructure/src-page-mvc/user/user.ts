import {Form, FormInput, el_attr} from '../../src-dom/domutils';
import {user} from '../../../lab-deno-express/src-domain/domain';
import {repository} from '../../../lab-deno-express/src-server/services/repository';
import {Logger, Console, AutoScroller} from '../../../lab-tools/src-tools/tools';

type json = object;
type http_verb = "get" | "post" | "put" | "delete";
type header = "application/json; charset=UTF-8" |
"multipart/form-data; charset=UTF-8" |
"application/x-www-form-urlencoded; charset=UTF-8" |
"application/apikey?; charset=UTF-8";

const contentTypes:Map<string,header> = new Map<string,header>();

contentTypes.set("json","application/json; charset=UTF-8");
contentTypes.set("post","multipart/form-data; charset=UTF-8");
contentTypes.set("get" ,"application/x-www-form-urlencoded; charset=UTF-8");
contentTypes.set("apikey" ,"application/apikey?; charset=UTF-8");

type search_params ={ 
id: string,
user_id: string,
}
//
type formDto = {
  btnID: string,
  btnValue: string,
  formAction: string,
  formID: string,
  formMethod: string,
  httpVerb:string,
  formData:FormData,
}
//
type fetchOpts = {
  method: string | "GET" | "POST" | "PUT" | "DELETE",
  body?:{},
  headers?:Headers,
}
//
interface User{
  setID(id:string):void;
  setCurrentSelectedUser(id:string):void;
  setUserList(userList:user[]):void;
  setFirstName(firstname:string):void;
  setLastName(lastname:string):void;
  setAge(age:number):void;
  setEmail(email:string):void;
  setPhone(phone:string):void;
}
//
class UserEndPoint{
  _url:URL;

  constructor(url:URL){
    this._url = url;
  }
  //
  async get(id:string):Promise<user>{
    const url_sp:URLSearchParams = new URLSearchParams({"id":id,"apikey":"xx-xxx-09875"});
    const req = new Request(`${this._url.origin}/repo?${url_sp.toString()}`);

    const get_fopts:fetchOpts = {
      method: "GET",
      headers: getHeaders("get"),
    };

    const post_fopts:fetchOpts = {
      method: "POST",
      headers: getHeaders("json"),
      body: JSON.stringify({"nul":null})
    };

    console.log("EndPoint get:",req);

    const response = await fetch(`${this._url.origin}/repo?${url_sp.toString()}`, get_fopts as unknown as RequestInit);
    //check status ok then parse json
    const data = JSON.parse(await response.json());

    return  data.payload;
  }
  //
  getAll(){

  }
  //
  delete(id:string){
      
  }
  //
  put(aUser:user){
      
    }
  //
  post(aUser:user){
      
  }
}

/**
 * UserM9del 
 * - manages the data models on a page.
 * @class
 */
class UserModel{
  state:user = null;
  users:user[] = null;
  //
  constructor(_users:user[]){
    this.users = _users;
    this.state = this.users[0];
  }
  //
  getState():user{
    console.log(JSON.stringify(this.state));

    return this.state;
  }
}
/**
 * UserView 
 * - manages the html controls on a page.
 * - calls processRequest on Page Controller via callback using a bridge
 * @class
 */
class UserView implements User{
private formProcessor: ( cb:any )=>void;
private userMasterForm = document.getElementById("user_master_form") as HTMLFormElement;
private userDetailsForm = document.getElementById("user_details_form")as HTMLFormElement;
private currentSelectedUserID = "0";
fi:FormInput = new FormInput(this.userDetailsForm);
private autoscroll = new AutoScroller(document.getElementById("console"));
 constructor(){

    try{
      this.userMasterForm.addEventListener("submit",this.formHandler.bind(this));
      this.userDetailsForm.addEventListener("submit",this.formHandler.bind(this));
      this.userMasterForm.addEventListener("change",this.changeHandler.bind(this));
      this.userMasterForm.addEventListener("keypress",this.keyPressedHandler.bind(this));
      this.autoscroll.startObserving();
    }
    catch(e){
      con.log(`error adding event listner to forms element ...${e.message}`);
    }

}
//
changeHandler(event:InputEvent){
const id = (event.target as HTMLInputElement).id;
const value = (event.target as HTMLInputElement).value;

switch(id){
case "user_id_list": 
this.fi.attach("user_id_list");

if(this.fi.getSelectedValue() != value)this.setID(this.fi.getSelectedValue());

this.setID(this.fi.getSelectedValue());
break;

case "user_id_master": 
this.fi.attach("user_id_list");

let selectedIndex = this.fi.optionIndex(value);   // new user

this.fi.setSelectedIndex(selectedIndex)
break;
}

}
//
//
keyPressedHandler(event:KeyboardEvent){
  

  if( 'Enter' === event.key ){
    event.preventDefault();

    this.fi.attach("user_id_list");

    const userInput = (event.target as HTMLInputElement).value;

    const tid = this.fi.optionIndex(userInput)

    this.setCurrentSelectedUser(tid.toString());

    if(userInput != tid.toString()){
      console.log("*** User not found, use Edit on new user");

      alert("*** User not found, use Edit on new user");
    }

    return;
  }
  
}
//
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

    //Form.printFormData(fdata.formData);

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
console.log("updateMaster:  adding users to select list element", currentID, users);
this.setID(currentID);
this.setUserList(users);
}
//
updateDetails(aUser:user){
console.log("updateDetails", aUser);

this.setUserID(aUser.id);
this.setFirstName(aUser.first_name);
this.setLastName(aUser.last_name);
this.setAge(aUser.age);

if(aUser.address){
  this.setStreet(aUser.address.street);
  this.setApartment(aUser.address.bldg_apt);
  this.setCity(aUser.address.city);
  this.setState(aUser.address.state);
  this.setZip(aUser.address.zip);
  this.setStreet(aUser.address.street);
}


this.setEmail(aUser.email);
this.setPhone(aUser.phone);
}

//#region Master form control setters 
setID(id: string): void {
  this.fi.attach("user_id_master");
  this.fi.setValue(id);

  con.log(`setID master ${id}`);
}
setCurrentSelectedUser(id: string): void {
  this.fi.attach("user_id_list");
  this.fi.setSelectedIndex(parseInt(id));
}
setUserList(users:user[]){
const elattrs:el_attr[] = [];
let ela:el_attr = {
  id: '0',
  name: '',
  value: '0',
  innerText: 'new,user'
}

  elattrs.push({...ela});

  users.forEach( user=>{
    ela.id = user.id;
    ela.value = user.id;
    ela.innerText = `${user.last_name},${user.first_name}`;

    elattrs.push({...ela});
  });

  this.fi.attach("user_id_list");
  this.fi.addChild("option", elattrs);
}
//#endregion

//#region Details form controls setters
setUserID(userID:string):void{
  this.fi.attach("user_id_details");
  this.fi.setValue(userID);
  con.log(`setUserID ${userID}`);
}
setFirstName(first_name:string):void{
  this.fi.attach("user_first_name");
  this.fi.setValue(first_name);
  con.log(`setFirstName ${first_name}`);
}
setLastName(last_name):void{
  this.fi.attach("user_last_name");
  this.fi.setValue(last_name);
  con.log(`setLasttName ${last_name}`);
}
setAge(age:number):void{
  this.fi.attach("user_age");
  this.fi.setValue(age.toString());
  con.log(`setAge ${age.toString()}`);
}
setStreet(street:string):void{
  this.fi.attach("user_street");
  this.fi.setValue(street);
  con.log(`setStreet${street}`);
}
setApartment(apartment:string):void{
  this.fi.attach("user_apartment");
  this.fi.setValue(apartment);
  con.log(`setSApartment${apartment}`);
}
setCity(city:string):void{
  this.fi.attach("user_city");
  this.fi.setValue(city);
  con.log(`setCity${city}`);
}
setState(state:string):void{
  this.fi.attach("user_state");
  this.fi.setValue(state);
  con.log(`setState${state}`);
}
setZip(zip:string):void{
  this.fi.attach("user_zip");
  this.fi.setValue(zip);
  con.log(`setZip${zip}`);
}
setEmail(email:string):void{
  this.fi.attach("user_email");
  this.fi.setValue(email);
  con.log(`setEmail ${email}`);
}
setPhone(phone:string):void{
  this.fi.attach("user_phone");
  this.fi.setValue(phone);
  con.log(`setPhone ${phone}`);
}
//#endregion
}

/**
   * printStatus
   * 
   * Prints formDto, Response and response data to the console.
   * @function
   * @param {Response} resp - a Response object containing fetched results
   * @param {HTMLinputElement} control - an input element to look for.
   * @returns {void} void
   */
function printStatus(fdto:formDto, response:Response, payload:object){

console.log(`
  controller.processRequests...
  --------------------------------------
  fetching action[${fdto.formAction}] using http-verb[${fdto.httpVerb.toLocaleUpperCase()}]
  response.ok=${response.ok}
  response.status=${response.status}
  payload=${JSON.stringify(payload)}
  --------------------------------------
  `);

}
/**
 * getPayload
 * 
 * Gets the returned data from a response.
 * @function
 * @param {Response} resp - a Response object containing fetched results
 * @param {HTMLinputElement} control - an input element to look for.
 * @returns {Promise<object>} fetched data
 */
async function getPayload(resp:Response):Promise<object>{
  return await resp.json();
}
/**
   * repoFetch
   * 
   * Gets the returned data from a response.
   * @function
   * @param {Response} resp - a Response object containing fetched results
   * @param {HTMLinputElement} control - an input element to look for.
   * @returns {Promise<object>} fetched data
   */
async function repositoryFetch(path:URL|string,jsonfile:string):Promise<user[]>{
  
  if(typeof path == "string")path = new URL(path);

   return repository.getUsers();
}
/**
   * getHeaders
   * 
   * Gets a header record for a particulat http-verb.
   * @function
   * @param {http_verb | "json"} htype - a Response object containing fetched results
   * @returns {Headers} array containing header strings
   */
function getHeaders(htype: http_verb | "json" | "apikey"):Headers{
  const hdr:Headers = new Headers();

  switch(htype.toLowerCase()) {
    case "json":  hdr.set("Content-type",contentTypes.get("json"));break;
    case "get":  hdr.set("Content-type",contentTypes.get("get"));break;
    case "post":  hdr.set("Content-type",contentTypes.get("post"));break;
    default: hdr.set("Content-type",contentTypes.get("get"));break;
  }

  return hdr;
}
/**
 * UserController 
 * - manages the business process for the UMP.
 * - makes fetch request to the User router Api.
 * - Updates the UserView with data.
 * @class
 */
class UserPageController{
  model:UserModel;
  view:UserView;

  constructor(){

  const user:user={
    id: '11111111',
    first_name: 'john',
    last_name: 'doe',
    age: 11111,
    email: 'email@gmail.com',
    phone: '213-301-1444-111-111111111111'
  };

  this.view = new UserView();

  this.view.setFormProcessor(requestBridge);

  // load json file with users
  const url = new URL('http://localhost:3000/data/');

  const users = repositoryFetch(url,'users.json');
  // update view with users
  users.then( user=>{
  this.view.updateMaster("0", user);
  this.model = new UserModel(user);
  })
    
  //console.log("repository users", repository.status());

  }
  //
  async responseStatus(fdto:formDto, response:Response, payload:object){

    printStatus(fdto, response, await  response.json());

  }
  //
  async processRequests(fdto:formDto){

    const payload = fdto.formData;
    const form = new Form(fdto.formID);
    const userDto = form.getJsonData() as user;

    const get_fopts:fetchOpts = {
      method: fdto.httpVerb.toUpperCase(),
      headers: getHeaders("get"),
    };

    const post_fopts:fetchOpts = {
      method: fdto.httpVerb.toUpperCase(),
      headers: getHeaders("json"),
      body: JSON.stringify(userDto)
    };

    switch( fdto.httpVerb.toLowerCase() ){
        case "edit":
            const user_list = new Form("user_master_form");
            const search_ids = user_list.getJsonData() as search_params;

            const ep = new UserEndPoint(new URL(`http://localhost:3000/repo?id=0`));

            const usr = await ep.get((search_ids.id));

            this.view.updateDetails(usr);
            break;
        case "get":
                const form = new Form(fdto.formID);
                let queryString = "";

                for(const [key,value] of fdto.formData){
                    queryString += `${key}=${value}&`;
                }

                queryString = queryString.substring(0,queryString.length-1);

                console.log("fetching queryString:",queryString);

                const rc1 = await fetch(`http://localhost:3000/user?${queryString}`, get_fopts as unknown as ResponseInit);
                let data1 = {msg:"User Not Found",payload:{}}

                if(rc1.status === 200){
                    data1 = await rc1.json();
                }
                else{
                    const id = form.getJsonData() as search_params;

                    alert(`${id} ${data1.msg}`);
                }

                printStatus( fdto, rc1, data1);
            break;
        default:
            const rc2 = await fetch(`http://localhost:3000/user`, post_fopts as unknown as ResponseInit);

            let data2 = {msg:"User Not Found",payload:{}}

            if(rc2.status === 200)data2 = await rc2.json();

            printStatus(fdto,rc2,data2);
            break;
    }

  }

}
/**
 * requestBridge
 * 
 * call the processRequest on controller.  This bridge was use beacuse the
 * calls back to view from controller did not work.
 * @function
 * @param {formDto} fdto - information about the form and the user entered data
 * @returns {void} void
 */
function requestBridge(fdto:formDto){
  userPC.processRequests(fdto);
  console.log("requestBridge called...");
}
const logger = new Logger();
const con = new Console(document.getElementById("console"),true);
const userPC = new UserPageController();

console.log("module [users.js] loaded and initialized..:");
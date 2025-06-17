import {Form, FormInput} from '../../src-dom/domutils.ts';
import {user} from '../../../lab-domain/domain.ts';
import {Logger, Console, AutoScroller} from '../../../lab-tools/src-tools/tools.ts';

//
type contactDto ={ 
    id: number,
    name: string,
    title: string,
    department: string,
    phone: string,
    email: string,
    note: string
}
//
function usecase(){
    /* 

checkParam(conElement);
con.log("The contactDto Shape:");
for(const [key,value] of Object.entries(aContactDto))con.log(`${key} : ${value}` );

 */
}

//
/**
 * Check the parameter for its type
 * @function
 * @param {SubmitEvent | string} param  an object to type check 
 * @return void
 */
function checkParam(param:HTMLElement | string){

    if(typeof param === "string")
        con.log(`the type of param is string[${typeof param}]`)
    else
    con.log(`param is element[${typeof param}]`)
}
/**
 * Processes the contact_profile_form using FormData
 * @function
 * @param {SubmitEvent}  evt  The submit event containing the submitter button.
 * @return void
 */
function formHandler(evt:SubmitEvent){

const aContactDto:contactDto = {
        id: 0,
        name: '',
        title: '',
        department: '',
        phone: '',
        email: '',
        note: ''
}

const parentForm = Form.getForm(evt.submitter!).element;

//evt.preventDefault();

const formData:FormData = new FormData(parentForm, evt.submitter)

con.log("formHandler() : submitting form....");

for(const [key,value] of formData.entries()){
    con.log(`${key} : ${value}` );
  }
}
//
const conElement = document.getElementById("console");
const con = new Console(conElement!);
const scroller = new AutoScroller(conElement!);
const form:Form = new Form("contact_profile_form");
const fdata:FormData = form.getData();

scroller.startObserving();
form.element.addEventListener("submit",formHandler);
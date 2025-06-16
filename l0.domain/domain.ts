import * as dtype from "./domain_types.ts";

export * from './domain_types.ts';

export class Person{
private _state:dtype.person = {
    id: '0',
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    phone: ''
};
constructor(p:dtype.person){
    this._state = p;
}
}

export class User{
private state:dtype.user = {
    address: {bldg_apt: "", city: "", id: "", state: "", street: "", user_id: "", zip: ""},
    age: 0,
    dob: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    ssn: "",
    contact: {
        id: '0',
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        phone: '',
        kids: undefined
    },
    company: '',
    phone: ''
};
private accounts:UserAccount[] = [];
constructor(usr:dtype.user){
    this.state = usr;
}
}

export class Customer{
    private state:dtype.customer;
    constructor(c:dtype.customer){
        this.state = c;
    }
}

export class UserAccount{
private state:dtype.user = {
    address: {bldg_apt: "", city: "", id: "", state: "", street: "", user_id: "", zip: ""},
    age: 0,
    dob: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    ssn: "",
    contact: {
        id: '0',
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        phone: '',
        kids: undefined
    },
    company: '',
    phone: ''
};
private authcred:AuthCred = new AuthCred();
}

export class AuthCred{
private state:dtype.auth_cred = {
    userid: '',
    pwd: '',
    email: ''
};
}

export class Resume{
private state:{} = {};
}

export class Employee{
private state:{} = {};
}

export class Employer{
protected state:{}={};
}

export class Company extends Employer{
protected state1:{} = {};
constructor(){
    super();
}
}
import {person, user, customer} from '../../../l0.domain/domain_types.ts';

export type reproStatus = {
  Users: number,
  Customers: number,
  Persons: number,
}

let users:user[] = [];
let persons:person[] = [];
let customers:customer[] = [];

/**
 * The repository interface used by the User Management System.
 * @class
 */
export class Repository{
  url:URL;

/**
* Loads information and provide api for Types and Models of the UMS. The current
* models that are loaded are:User, Customer, Person. 
* @return {Repository - a Repository object
*/
constructor(path:URL|string){
this.url = new URL(path);
this.init();
}
async init(){
  await this.loadUsers(this.url);
  await this.loadCustomers(this.url);
  await this.loadPersons(this.url);
}
/**
* returns the count statistics s for each domain object 
* @return {reproStatus} - object containg status of the repository.
*/
public status():reproStatus{

  const _rstat = {
    Users: users.length,
    Customers: customers.length,
    Persons: persons.length,
  };
  
  return _rstat;
}
//
private async loadUsers(path:URL,jsonFile:string="users.json"):Promise<user[]>{
  const url = new URL(`${path.href}${jsonFile}`);

  const resp = await fetch(url);

  const usrs =  await resp.json();

  return users = usrs;
}
//
private async loadCustomers(path:URL,jsonFile:string="customers.json"):Promise<customer[]>{
  const url = new URL(`${path.href}${jsonFile}`);

  const resp = await fetch(url);
  
  const custs =  await resp.json();

  return customers = custs;
}
//
private async loadPersons(path:URL,jsonFile:string="persons.json"):Promise<person[]>{
  const url = new URL(`${path.href}${jsonFile}`);

  const resp = await fetch(url);
  
  const pers =  await resp.json();

  return persons = pers;
}
/**
* returns a list of users 
* @return {user[]} - array  containg user objects.
*/
async getUsers():Promise<user[]>{

  if(!users.length){
    await this.loadUsers(this.url).then(u=>{
      users = u;
    });
  }

  return users;
}
/**
* returns a user with specified id 
* @param {string} _id - id of user to lookup. 
* @return {user} - a user object.
*/
getUser(_id:string):user | undefined{
  
  const user = users.find(user =>user.id == _id);

  return user;
}
/**
* adds a user object to the data store 
* @param {person} per - a user object to store. 
* @return {void} - void
*/
addUser(usr:user):void{
  users.push(usr);
}
/**
* returns a list of person objects 
* @return {person[]} - array  containg person objects.
*/
async getPersons():Promise<person[]>{

  if(!persons.length){
    console.log("Repository Loading persons")
    await this.loadPersons(this.url).then(p=>{
      console.log("setting persons", p);
      persons = p;
    });
  }


  return persons;
}
/**
* returns a person with specified id 
* @param {string} _id - id of person to lookup. 
* @return {user} - a person object.
*/
static getPerson(id:string):person{
   return persons.find( person => person.id === id)!;
}
/**
* adds a person object to the data store 
* @param {person} per - a person object to store. 
* @return {void} - void
*/
static addPerson(per:person):void{
  persons.push(per);
}
/**
* returns a list of customer objects 
* @return {customer[]} - array containg customer objects.
*/
async getCustomers():Promise<customer[]>{
  
  if(!customers.length){
    console.log("Repository Loading customers")
    await this.loadCustomers(this.url).then(c=>{
      console.log("setting persons", c);
      customers = c;
    });
  }
  return customers;
}
/**
* returns a customer with specified id 
* @param {string} _id - id of customer to lookup. 
* @return {user} - a customer object.
*/
static getCustomer(_id:string):customer{
  
  return customers[0];
}
/**
* adds a customer object to the data store 
* @param {customer} cust - a customer object to store. 
* @return {void} - void
*/
static addCustomer(cust:customer):void{
  customers.push(cust);
}
}

export const repository = new Repository("http://localhost:3000/data/");
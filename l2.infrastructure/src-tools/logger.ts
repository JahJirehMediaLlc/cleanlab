/**
 * A class that logs user input for viewing later.  
 * 
 */
export class Logger extends  EventTarget{
private _log: string[];
//
constructor()
{
super();
this._log =  new Array();
}
/**
 * Listens for a LogEvent and stores the text in the log data store.  
 * @param {string} eventName - The name of the event that is used in the addEventListner.
 * @param {Function} handler -  The handler function to run once event is received.
 * @return {void} - void
 */
on(eventName: string, handler:(e:Event)=>void): void
{
addEventListener(eventName, handler.bind(this));
}
/**
 * Publishes an event on the data store is updated.  
 * @param {string} eventName - The name of the event that is used in the addEventListner.
 * @param {CustomEvent} evt -  CustomEvent containg details option filled in.
 * @return {void} - void
 */
emit(eventName: string, evt :CustomEvent):void
{
dispatchEvent(new CustomEvent('log-item-added', {detail: 'hello' }));
}
/**
 * Adds text to the data store.  
 * @param {string} text- text to be stored.
 * @return {void} - void
 */
write(text:string):void
{
//  if(this._log == undefined)this._log =  new Array();

let d: Date = new Date(); 
let timetext = d.getHours().toString().padStart(2, '0')+":"+
d.getMinutes().toString().padStart(2, '0')+":"+
d.getSeconds().toString().padStart(2, '0');
let logdata = {time: timetext,index: this._log.length+1 ,text: text};
let logtext = `time = ${timetext}  text = ${text}  index = ${this._log.length+1} `;
let itemAddedEvent = new CustomEvent('log-item-added',{detail: {time:timetext,data:logdata,text:logtext}});

this._log.push( logtext );

dispatchEvent(itemAddedEvent);
}
/**
 * return number of items in the data store.  
 * @return {number} - a number represening the length of the data store.
 */
logSize():number
{
return this._log.length;
}
/**
 * erases the items in the data store.  
 * @return {void} - void.
 */
clear():void
{
this._log.splice(0,this._log.length);
}

}
import {Template} from "./template.ts"

/**
 * Simulates a console.log
 * @class
 */
export class Console{
private _outputPort: HTMLElement;
private _dual = true;
/**
 * Creates a new console.
 * @param {HTMLElement} element- element where the output goes.  
 * @param {boolean} dual? - optional flag to spefy if console.log also gets used.
 * @return {Console} - a Console object.
 */
constructor(element:HTMLElement, dual?:boolean){
this._outputPort = element!;
this._dual = dual!;
}
/**
* Displays specified text in specefied element (and optionally in colsole.log).  
* @param {string} text - text to be displayed.
* @return {void} - void
*/
log(text:string):void{
this._outputPort.appendChild( Template.toDocumentFragment(`<p>${text}</p>`) );

if(this._dual)console.log(text);

/*   old of creating element

const childElement = document.createElement("p");
childElement.textContent = text;
this._outputPort.appendChild(childElement); 

*/

}

}
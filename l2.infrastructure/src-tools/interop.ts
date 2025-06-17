/* import {IEmitter} from './interfaces';
import {EventEmitter} from 'events'; */
//
export let consoleTakeSnapShotEvent = new CustomEvent('take-snap-shot', 
                                        { 
                                            detail: 'snapshot= pagesize= logsize= currentpage=' 
                                        });
export let consoleSnapshotTakenEvent = new CustomEvent('console-snapshot-taken', 
                                        { 
                                            detail: 'pagesize= logsize= currentpage=' 
                                        });
export let logItemAddedEvent = new CustomEvent('log-item-added', 
                                        { 
                                            detail: 'hello' 
                                        });
//
export const aBirthDayEvent = new CustomEvent('birthday-event', 
                                  { 
                                      detail: {
                                        message:  "Hallp Birthday...",
                                        dob: "06/04/64",
                                        person: "full name"
                                      }
                                  });
//
const anEvent = new Event("look", 
                        { bubbles: true, 
                            cancelable: false 
                        });
// create custom events
const catFoundEvent = new CustomEvent("animal-found", 
                        {
                            detail: {
                            name: "cat",
                            },
                        });
//
  const dogFoundEvent = new CustomEvent("animal-found", {
                        detail: {
                        name: "dog",
                        },
                        });
//
 export class EventEmitter_<T> {
    constructor(private target: HTMLElement, private eventName: string) {}
  
    emit(value: T, options?: any) {
      const aCustomEvent = new CustomEvent<T>(this.eventName, { detail: value, ...options });

      this.target.dispatchEvent(aCustomEvent);
    }
    on(eventName: string, listner: ()=>void){}
  }
//

/**
 * An class that autoscrolls an element's contents.
 * @class
 */
export class AutoScroller{
_isRunning: boolean = false;
_someElement: HTMLElement = null!;
_observer: MutationObserver = null!;
_start: number = 0;
_end: number = 0;
_change: number = 0;
_elapsedTime: number = 0;
_increment = 20;   // how smooth the scroll  i.e. scrollTop + increment
_duration = 900 // how many milliseconds you want to scroll to last
    //
    constructor( element: HTMLElement ){
        this._someElement = element;
        this._start = this._someElement.scrollTop;
        this._end = this._someElement.scrollHeight;
        this._change = this._end - this._start;
        this._increment = 20;   // og 20 
        this._duration = 900;   // og 900 

        console.log("Autoscroller initialized..",this._someElement.id);
    }
/**
 * Monitors an element and scrolls the contents when height is reached.
 * @returns {void}
 */
    startObserving()
    {
      if(this._isRunning)return;

    this._observer = new MutationObserver( this.onMutation.bind(this) );  // Create an observer instance linked to the callback function

    const config = { attributes: true, childList: true, subtree: true };   // Options for the observer (which mutations to observe)

    this._observer.observe(this._someElement, config);  // Start observing targetNode for config mutations

    this._isRunning = true;
    }
/**
 * Stops monitoring an element.  Terminates scrolling.
 * @returns {void}
 */
    stopObserving()
    {
    if(this._observer)this._observer.disconnect();    // Later, you can stop observing
    this._isRunning = false;
    }
    //
    onMutation(mutationList: any, observer: any){

    for (const mutation of mutationList) 
    {
        if (mutation.type === "childList") 
        {

            if(mutation.addedNodes.length)
            {
              /*   console.log(`
                observer      ${mutation.addedNodes[0]} childNode added...
                scrollHeight [ ${mutation.addedNodes[0].scrollHeight} ]
                scrollWidth  [ ${mutation.addedNodes[0].scrollWidth} ]
                `); */
            }

            if(mutation.removedNodes.length)
            {
           //     console.log(`observer ${mutation.removedNodes[0]} childNode removed...`,mutation.removedNodes[0]);
            }

            this.scrollToBottom( this._someElement );
        } 
        else if (mutation.type === "attributes") 
        {
         //   console.log(`${mutation.attributeName} attribute added/deletd.`);
        }
    }

    }
    //
    scrollToBottom(someElement: HTMLElement) 
    {
        animateScroll(this._duration, someElement);  // smooth scrolling
    }
    //
    animateScroll(duration: number, someElement: any) 
    {
      this.animate(0);
    }
    //
    animate(elapsedTime: any) 
    {
        elapsedTime += this._increment;
        var position = this.easeInOut(elapsedTime, this._start, this._change, this._duration);

        this._someElement.scrollTop = position;

        if (elapsedTime < this._duration) {
            setTimeout( ()=> { this.animate(this._elapsedTime);}, this._increment)
        }
    }
    //
    easeInOut(currentTime: any, start: any, change: any, duration: any) {
        // by Robert Penner
        currentTime /= duration / 2;

        if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
        }

        currentTime -= 1;

        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }  
}
//
function animateScroll(duration: number, someElement: any) 
{
  var start = someElement.scrollTop;
  var end = someElement.scrollHeight;
  var change = end - start;
  var increment = 20;   // og 20 
  
  function easeInOut(currentTime: any, start: any, change: any, duration: any) {
    // by Robert Penner
    currentTime /= duration / 2;

    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }

    currentTime -= 1;

    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }  
  
  function animate(elapsedTime: any) 
  {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);

    someElement.scrollTop = position;

    if (elapsedTime < duration) {
      setTimeout(function() {animate(elapsedTime);}, increment)
    }
  }

  animate(0);
}
//
export function winStats1(){

    console.log(`
    clientHeight ${document.documentElement.clientHeight} 
    clientWidth ${document.documentElement.clientWidth} 
    
    scrollHeight ${document.documentElement.scrollHeight} 
    scrollWidth ${document.documentElement.scrollWidth} 
    
    scrollTop ${document.documentElement.scrollTop} 
    scrollLeft ${document.documentElement.scrollLeft} 
    
    window.innerHeight ${window.innerHeight} 
    window,innerWidth ${window.innerWidth} 
    
    window.pageXOffset ${window.pageXOffset} 
    window.pageYOffset ${window.pageYOffset} 
    
    `);
}
  
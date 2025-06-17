// Callback function to execute when mutations are observed
export function startObserving(targetNode: HTMLElement)
{
const observer = new MutationObserver( onMutation );  // Create an observer instance linked to the callback function

const config = { attributes: true, childList: true, subtree: true };   // Options for the observer (which mutations to observe)

observer.observe(targetNode!, config);  // Start observing targetNode for config mutations

// observer.disconnect();    // Later, you can stop observing
}
//
function onMutation(mutationList: any, observer: any)
 {

  for (const mutation of mutationList) 
  {
    if (mutation.type === "childList") 
    {
  //    console.log("A child node has been added or removed.", observer);
      scrollToBottom( document.getElementById("footer")! );
    } 
    else if (mutation.type === "attributes") 
    {
  //    console.log(`The ${mutation.attributeName} attribute was modified.`,observer);
    }
  }
};
// Here's our main callback function we passed to the observer
function scrollToBottom(someElement: HTMLElement) 
{
  // the folowwing line enables jumps crolling
  // someElement.scrollTop = someElement.scrollHeight;  
 
  // the following 2 lines enable smooth scrolling
  var duration = 900 // Or however many milliseconds you want to scroll to last
  animateScroll(duration, someElement);  // smooth scrolling
}
// First, define a helper function.
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
export function scrollToBottom2(timedelay=0) {
  var height = 0;
  var minScrollHeight = 100;
  const scrollId = setInterval(function () {
      if (height <= document.body.scrollHeight) {
          window.scrollBy(0, minScrollHeight);
      }
      else {
          clearInterval(scrollId);
      }
      height += minScrollHeight;
  }, timedelay);           
}
(() => {
  // ../../../l2.infrastructure/src-tools/template.ts
  var Template = class _Template {
    _template;
    _templatesMap = /* @__PURE__ */ new Map();
    /**
    * Loads a template using a specified element id.  
    * @param {string } templateId - An id of the Template element in the document.
     * @param {URL } url - An id of the Template element in the document.
    */
    constructor(templateId, url = new URL("http://localhost:3000/data/screens.html")) {
      this._template = null;
      (async () => {
        const tm = await this.loadTemplates(templateId, url);
        console.log("loadtemplate results", tm);
      })();
    }
    /**
    * Use the fetch api to load a document that contains the template with specified id.  
    * @param {string} url - URL of the file containing template element.
     * @param {string} elementID - ID of the innerElement.
    * @return {Template} - a Template object.
    */
    /**
    * Returns the template as an element..
    * @return {HTMLTemplateElement} - an HTMLElement representing the Template.
    */
    toElement() {
      return this._template;
    }
    /**
    * Returns a node that represents the clone of the Template..
    * @return {HTMLTemplateElement} - an Nodel representing the clone Template.
    */
    toClone() {
      return this._template.content.cloneNode(true);
    }
    /**
    * Renders the Template into an element.  The existing content of the element is erased.
    * @return {void} - void.
    */
    render(output) {
      try {
        document.getElementById(output).replaceChildren(this.toClone());
      } catch (error) {
        console.log(`Error writing to elementID[${output}]...${error.message}`);
      }
    }
    /**
    * Renders a cloned copy of the Template into a Node.  The existing content of the element is preserved.
    * @return {void} - void.
    */
    renderNode(parent) {
      parent.appendChild(this.toClone());
    }
    innerHtml() {
      const inner = document.createElement("div");
      inner.setAttribute("class", "hide");
      inner.append(this._template.content.cloneNode(true));
      return inner;
    }
    content() {
      return this._template.content;
    }
    clone() {
      return this._template.content.cloneNode(true);
    }
    async loadTemplates(tempid, url) {
      const resp = await fetch(url);
      const text = await resp.text();
      const templates = this.parserDom(text, tempid);
      console.log("templates =", templates);
      return this._templatesMap;
    }
    parserDom(domText, query = "template") {
      const domNodes = new DOMParser();
      const doc = domNodes.parseFromString(domText, "text/html");
      const templateElements = doc.querySelectorAll(query);
      templateElements.forEach((el) => this._templatesMap.set(el.id, el));
      console.log(this._templatesMap);
      return Array.from(this._templatesMap);
    }
    init(tempid, screensUrl = new URL("http://localhost:3000/data/screens.html")) {
      this._template = document.createElement("template");
      this._template.innerHTML = "<p>new template</p>";
      const _url = new URL(screensUrl);
    }
    static createElement(tagName, attrs) {
      let _attrs = "";
      for (const a in attrs) {
        console.log(a);
      }
      const obj = attrs;
      return _Template.toDocumentFragment(`<${tagName} ${_attrs}'>${attrs.innerText}</${tagName}>`);
    }
    static fetchTemplate(url, elementID) {
      let result = `"<span>${elementID}</span>`;
      return new _Template(result);
    }
    /**
     * Create a document fragment that contains the element(s) ot a webcomponent.
     * @param {string} value - string containg html.
     * @return {DocumentFragment} - a Template object.
     */
    static toDocumentFragment(value) {
      let temp = document.createElement("template");
      temp.innerHTML = value;
      return temp.content;
    }
  };

  // ../../../l2.infrastructure/src-tools/fetch_json.ts
  async function fetchJson(name) {
    const response = await fetch(`http://localhost:3000/data/${name}`);
    return await response.json();
  }
  async function fetchHtml(name) {
    const response = await fetch(`http://localhost:3000/data/${name}`);
    const dp = new DOMParser();
    return dp.parseFromString(await response.text(), "text/html");
  }

  // ../../../l2.infrastructure/src-tools/http.ts
  var Http = class {
    _url;
    _response;
    _result;
    constructor(url) {
      this._url = url;
    }
    async post(fd) {
      let postoptions = { method: "POST", body: fd };
      this._response = await fetch(this._url, postoptions);
      this._result = this._response.json();
    }
    async get(fd) {
      this._response = await fetch(this._url);
      this._result = this._response.json();
    }
    result() {
      return this._result.message;
    }
  };

  // ../../../l2.infrastructure/src-tools/console.ts
  var Console = class {
    _outputPort;
    _dual = true;
    /**
     * Creates a new console.
     * @param {HTMLElement} element- element where the output goes.  
     * @param {boolean} dual? - optional flag to spefy if console.log also gets used.
     * @return {Console} - a Console object.
     */
    constructor(element, dual) {
      this._outputPort = element;
      this._dual = dual;
    }
    /**
    * Displays specified text in specefied element (and optionally in colsole.log).  
    * @param {string} text - text to be displayed.
    * @return {void} - void
    */
    log(text) {
      this._outputPort.appendChild(Template.toDocumentFragment(`<p>${text}</p>`));
      if (this._dual) console.log(text);
    }
  };

  // ../../../l2.infrastructure/src-tools/autoscroll.ts
  var AutoScroller = class {
    _isRunning = false;
    _someElement = null;
    _observer = null;
    _start = 0;
    _end = 0;
    _change = 0;
    _elapsedTime = 0;
    _increment = 20;
    // how smooth the scroll  i.e. scrollTop + increment
    _duration = 900;
    // how many milliseconds you want to scroll to last
    //
    constructor(element) {
      this._someElement = element;
      this._start = this._someElement.scrollTop;
      this._end = this._someElement.scrollHeight;
      this._change = this._end - this._start;
      this._increment = 20;
      this._duration = 900;
      console.log("Autoscroller initialized..", this._someElement.id);
    }
    /**
     * Monitors an element and scrolls the contents when height is reached.
     * @returns {void}
     */
    startObserving() {
      if (this._isRunning) return;
      this._observer = new MutationObserver(this.onMutation.bind(this));
      const config = { attributes: true, childList: true, subtree: true };
      this._observer.observe(this._someElement, config);
      this._isRunning = true;
    }
    /**
     * Stops monitoring an element.  Terminates scrolling.
     * @returns {void}
     */
    stopObserving() {
      if (this._observer) this._observer.disconnect();
      this._isRunning = false;
    }
    //
    onMutation(mutationList, observer) {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          if (mutation.addedNodes.length) {
          }
          if (mutation.removedNodes.length) {
          }
          this.scrollToBottom(this._someElement);
        } else if (mutation.type === "attributes") {
        }
      }
    }
    //
    scrollToBottom(someElement) {
      animateScroll(this._duration, someElement);
    }
    //
    animateScroll(duration, someElement) {
      this.animate(0);
    }
    //
    animate(elapsedTime) {
      elapsedTime += this._increment;
      var position = this.easeInOut(elapsedTime, this._start, this._change, this._duration);
      this._someElement.scrollTop = position;
      if (elapsedTime < this._duration) {
        setTimeout(() => {
          this.animate(this._elapsedTime);
        }, this._increment);
      }
    }
    //
    easeInOut(currentTime, start, change, duration) {
      currentTime /= duration / 2;
      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }
      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
  };
  function animateScroll(duration, someElement) {
    var start = someElement.scrollTop;
    var end = someElement.scrollHeight;
    var change = end - start;
    var increment = 20;
    function easeInOut(currentTime, start2, change2, duration2) {
      currentTime /= duration2 / 2;
      if (currentTime < 1) {
        return change2 / 2 * currentTime * currentTime + start2;
      }
      currentTime -= 1;
      return -change2 / 2 * (currentTime * (currentTime - 2) - 1) + start2;
    }
    function animate(elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      someElement.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function() {
          animate(elapsedTime);
        }, increment);
      }
    }
    animate(0);
  }
  function winStats1() {
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

  // ../../../l2.infrastructure/src-tools/muteObserver.ts
  function startObserving(targetNode) {
    const observer = new MutationObserver(onMutation);
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
  }
  function onMutation(mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        scrollToBottom(document.getElementById("footer"));
      } else if (mutation.type === "attributes") {
      }
    }
  }
  function scrollToBottom(someElement) {
    var duration = 900;
    animateScroll2(duration, someElement);
  }
  function animateScroll2(duration, someElement) {
    var start = someElement.scrollTop;
    var end = someElement.scrollHeight;
    var change = end - start;
    var increment = 20;
    function easeInOut(currentTime, start2, change2, duration2) {
      currentTime /= duration2 / 2;
      if (currentTime < 1) {
        return change2 / 2 * currentTime * currentTime + start2;
      }
      currentTime -= 1;
      return -change2 / 2 * (currentTime * (currentTime - 2) - 1) + start2;
    }
    function animate(elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      someElement.scrollTop = position;
      if (elapsedTime < duration) {
        setTimeout(function() {
          animate(elapsedTime);
        }, increment);
      }
    }
    animate(0);
  }
  function scrollToBottom2(timedelay = 0) {
    var height = 0;
    var minScrollHeight = 100;
    const scrollId = setInterval(function() {
      if (height <= document.body.scrollHeight) {
        window.scrollBy(0, minScrollHeight);
      } else {
        clearInterval(scrollId);
      }
      height += minScrollHeight;
    }, timedelay);
  }

  // ../../../l2.infrastructure/src-tools/interop.ts
  var consoleTakeSnapShotEvent = new CustomEvent(
    "take-snap-shot",
    {
      detail: "snapshot= pagesize= logsize= currentpage="
    }
  );
  var consoleSnapshotTakenEvent = new CustomEvent(
    "console-snapshot-taken",
    {
      detail: "pagesize= logsize= currentpage="
    }
  );
  var logItemAddedEvent = new CustomEvent(
    "log-item-added",
    {
      detail: "hello"
    }
  );
  var aBirthDayEvent = new CustomEvent(
    "birthday-event",
    {
      detail: {
        message: "Hallp Birthday...",
        dob: "06/04/64",
        person: "full name"
      }
    }
  );
  var anEvent = new Event(
    "look",
    {
      bubbles: true,
      cancelable: false
    }
  );
  var catFoundEvent = new CustomEvent(
    "animal-found",
    {
      detail: {
        name: "cat"
      }
    }
  );
  var dogFoundEvent = new CustomEvent("animal-found", {
    detail: {
      name: "dog"
    }
  });
  var EventEmitter_ = class {
    constructor(target, eventName) {
      this.target = target;
      this.eventName = eventName;
    }
    emit(value, options) {
      const aCustomEvent = new CustomEvent(this.eventName, { detail: value, ...options });
      this.target.dispatchEvent(aCustomEvent);
    }
    on(eventName, listner) {
    }
  };

  // ../../../l2.infrastructure/src-tools/logger.ts
  var Logger = class extends EventTarget {
    _log;
    //
    constructor() {
      super();
      this._log = new Array();
    }
    /**
     * Listens for a LogEvent and stores the text in the log data store.  
     * @param {string} eventName - The name of the event that is used in the addEventListner.
     * @param {Function} handler -  The handler function to run once event is received.
     * @return {void} - void
     */
    on(eventName, handler) {
      addEventListener(eventName, handler.bind(this));
    }
    /**
     * Publishes an event on the data store is updated.  
     * @param {string} eventName - The name of the event that is used in the addEventListner.
     * @param {CustomEvent} evt -  CustomEvent containg details option filled in.
     * @return {void} - void
     */
    emit(eventName, evt) {
      dispatchEvent(new CustomEvent("log-item-added", { detail: "hello" }));
    }
    /**
     * Adds text to the data store.  
     * @param {string} text- text to be stored.
     * @return {void} - void
     */
    write(text) {
      let d = /* @__PURE__ */ new Date();
      let timetext = d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0");
      let logdata = { time: timetext, index: this._log.length + 1, text };
      let logtext = `time = ${timetext}  text = ${text}  index = ${this._log.length + 1} `;
      let itemAddedEvent = new CustomEvent("log-item-added", { detail: { time: timetext, data: logdata, text: logtext } });
      this._log.push(logtext);
      dispatchEvent(itemAddedEvent);
    }
    /**
     * return number of items in the data store.  
     * @return {number} - a number represening the length of the data store.
     */
    logSize() {
      return this._log.length;
    }
    /**
     * erases the items in the data store.  
     * @return {void} - void.
     */
    clear() {
      this._log.splice(0, this._log.length);
    }
  };
})();
//# sourceMappingURL=tools.js.map

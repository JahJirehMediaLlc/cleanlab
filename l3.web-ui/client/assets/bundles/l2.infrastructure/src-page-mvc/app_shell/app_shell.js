(() => {
  // ../../../l2.infrastructure/src-dom/domutils.ts
  var Html = class {
    static insertElements(element, htmlText) {
      element.replaceChildren();
      element.insertAdjacentHTML("afterbegin", htmlText);
      return element;
    }
    static wrapElement(tagName, attrs, element) {
      return wrapElement(tagName, attrs, element);
    }
    static getElementIndex(element) {
      return getElementIndex(element);
    }
    static createElement(tagName, attrs, innerText = "") {
      return createElement(tagName, attrs, innerText);
    }
  };
  function addClass(element, className) {
    element.classList.add(className);
  }
  function removeClass(element, className) {
    if (element.classList.contains(className)) element.classList.remove(className);
  }
  function _html(strings, ...expressions) {
    return expressions.reduce((acc, exp, indx) => {
      return acc + exp + strings[indx + 1];
    }, strings[0]);
  }
  function _css(strings, ...expressions) {
    return expressions.reduce((acc, exp, indx) => {
      return acc + exp + strings[indx + 1];
    }, strings[0]);
  }
  var Css = class {
    static hide(element, state) {
      if (state)
        addClass(element, "hide");
      else
        removeClass(element, "hide");
      return this;
    }
    static flex(element, state) {
      if (state)
        addClass(element, "flex_row");
      else
        addClass(element, "flex_column");
      return this;
    }
    static wrap(element, state) {
      if (state)
        addClass(element, "wrap");
      else
        removeClass(element, "wrap");
      return this;
    }
    static border(element, state) {
      if (state)
        addClass(element, "border");
      else
        removeClass(element, "border");
      return this;
    }
  };
  var FormInput = class {
    element;
    form;
    elementID;
    /**
    * creates a FormInput object
    * @param {HTMLFormElement} aForm - id of an input element(HTMLInputElement).
    */
    constructor(aForm) {
      this.attachForm(aForm);
    }
    attachForm(form) {
      this.form = form;
    }
    /**
    * attaches an element for manipulation.
    * @param {string} attr_name - id of an input element(HTMLInputElement) to attach..
    * @return {void} - void
    */
    attach(attr_name) {
      this.elementID = attr_name;
      this.element = this.form.querySelector(`[name=${attr_name}]`);
      if (!this.element) console.log(`!!! element attribute [${attr_name}] is invalid`);
    }
    /**
    * adds a css class to the element
    * @param {string} className - the name of a css class from a style sheet.
    * @return {void} - void
    */
    addCssClass(className) {
      this.element.classList.add(className);
    }
    /**
    * removes a css class from the element
    * @param {string} className - the name of a css class from a style sheet.
    * @return {void} - void
    */
    removeCssClass(className) {
      this.element.classList.remove(className);
    }
    /**
    * set the value attribute on the element
    * @param {string} value - the value to be assigned.
    * @return {void} - void
    */
    setValue(value) {
      if (this.element)
        this.element.value = value;
      else
        console.log("element is invalid");
    }
    /**
    * gets the selectedIndex for a select element(HTMLSelectElement).
    * @return {number} - the selectIndex of the select element
    */
    getSelectedIndex() {
      return this.element.selectedIndex;
    }
    /**
    * gets the selectedValue for a select element(HTMLSelectElement).
    * @return {number} - the value on the select element
    */
    getSelectedValue() {
      const select = this.element;
      return select.options[this.getSelectedIndex()].value;
    }
    /**
    * sets the selectedIndex for a select element(HTMLSelectElement).
    * @param {number} value - the selectIndex of the select element
    * @return {void} - void
    */
    setSelectedIndex(value) {
      const select = this.element;
      select.selectedIndex = value;
    }
    /**
    * sets the Value for a select element(HTMLSelectElement).
    * @param {string} value - the value to be assigned
    * @return {void} - void
    */
    setSelectedValue(value) {
      const select = this.element;
      select.value = value.toString();
    }
    /**
    * adds one or more child elements to the attached element.
    * The attached element is cleared out.
    * @param {string} tagName - the tagName of the child element
    * @param {el_attr[]} attrs - innerText of the child elements
    * @return {void} - void
    */
    addChild(tagName, attrs) {
      this.element.innerText = "";
      attrs.forEach((attr) => {
        this.element.appendChild(createElement(tagName, attr));
      });
    }
    /**
    * inserts one or more child elements to the attached element.
    * The attached element is not cleared out.
    * @param {string} tagName - the tagName of the child element
     * @param {el_attr[]} attrs - innerText of the child elements
     * @return {void} - void
    */
    insertChild(tagName, attrs) {
      attrs.forEach((text) => {
        this.element.appendChild(createElement(tagName, text));
      });
    }
    /**
    * returns the index of the select element option with the
    * specified value.
    *
    * 0 is returned if no option has the value.
    * @param {string} value - the value of the option being sought
    * @return {number} - the index of the option, 0 if no options was found.
    */
    optionIndex(value) {
      const select = this.element;
      let index = 0;
      Array.from(select.options).forEach((element) => {
        if (element.value == value) index = element.index;
      });
      return index;
    }
  };
  var Form = class _Form {
    element;
    formData;
    name;
    method;
    http_verb;
    path_action;
    /**
     * Creates a form object using and element or its id.
     * @param el
     */
    constructor(el) {
      if (typeof el === "string")
        this.element = document.getElementById(el);
      else
        this.element = el;
      this.formData = new FormData(this.element);
      this.name = this.element.name;
      this.method = this.element.method;
      this.http_verb = this.element.method;
      this.path_action = this.element.action;
    }
    /**
     *
     * @returns a FormData object containg the values of the form.
     */
    getData() {
      return this.formData;
    }
    /**
     * Get the form input as key/value pairs.
     * @returns an object containh the key and value for the form input element.
     */
    getJsonData() {
      let jsonData = {};
      for (const [key, value] of this.formData) jsonData[key] = value;
      return jsonData;
    }
    /**
     * Adds key/value to Form.  used for manual form building.
     * @param key
     * @param value
     */
    append(key, value) {
      this.formData.append(key, value);
    }
    /**
     * Check if an element is in the form.
     * @param {HTMLFormElement} form - a Form Element to check
     * @param {HTMLElement} control - an input element to look for.
     * @returns
     */
    static isPresent(form, control) {
      let rc = false;
      for (let i = 0; i != form.elements.length; i++) {
        if (form.elements[i].id === control.id) {
          rc = true;
          break;
        }
      }
      return rc;
    }
    /**
     * Gets the form that contains the specified element.
     * @param {HTMLElement} control - an input element to look for.
     * @returns
     */
    static getForm(control) {
      const forms = document.querySelectorAll("form");
      let form = null;
      forms.forEach((_form) => {
        if (this.isPresent(_form, control)) form = new _Form(_form);
      });
      return form;
    }
    isValid(cb) {
      return true;
    }
    print() {
      console.log(`### [method:${this.method}] [path_action:${this.path_action}] [http_verb:${this.http_verb}] ###`);
      for (const [key, value] of this.formData) {
        console.log(`${key}: ${value}`);
      }
    }
    static printFormData(formData) {
      for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }
    }
  };
  function wrapElement(tagName, attrs, element) {
    let attributes = "";
    Object.entries(attrs).forEach(([key, value]) => {
      attributes += `${key}=${value} `;
    });
    const results = new DOMParser().parseFromString(`<${tagName} ${attributes}>${element.outerHTML}</${tagName}>`, "text/html");
    return results.querySelectorAll(tagName)[0];
  }
  function createElement(tagName, attrs, innerText = "") {
    let attributes = "";
    for (let key in attrs) attributes += `${key}="${attrs[key]}" `;
    let newTag = `<${tagName} ${attributes}>${innerText}</${tagName}>`;
    const results = new DOMParser().parseFromString(newTag, "text/html");
    return results.querySelectorAll(tagName)[0];
  }
  function getElementIndex(element) {
    console.log("the siblings are:", element.parentNode.children);
    return Array.from(element.parentNode.children).indexOf(element);
  }
  var TemplatePlus = class {
    _url;
    templateId = "";
    template;
    _templatesMap;
    // acessors
    get id() {
      return this.templateId;
    }
    get map() {
      return this._templatesMap;
    }
    get element() {
      return this.template;
    }
    constructor(templateId, url = new URL("http://localhost:3000/data/screens.html")) {
      this.templateId = templateId;
      this.template = this.createTemplate();
      this._url = url;
      this._templatesMap = /* @__PURE__ */ new Map();
      this.createBlankTemplate();
      if (templateId) {
        this.getTemplateElement(this.templateId).then((t) => this.template = t);
      }
    }
    // creation logic
    localTemplate(id) {
      let temp = document.getElementById(id);
      if (temp)
        this.template = temp;
      else
        this.template = this.createBlankTemplate();
      this.templateId = id;
      return this.template;
    }
    createTemplate() {
      const template = document.createElement("template");
      const cssMarkup = document.createElement("style");
      const htmlMarkup = document.createElement("div");
      const jsMarkup = document.createElement("script");
      const fragment = new DocumentFragment();
      htmlMarkup.setAttribute("class", `${this.id}_container`);
      fragment.append(cssMarkup, htmlMarkup, jsMarkup);
      template.content.append(fragment);
      return template;
    }
    createBlankTemplate() {
      const rawCss11 = _css`
  <style>

      h1{
        color:yellow;
      }
      .scroll_x {
          overflow-x: scroll;
      }

      .scroll_y {
          overflow-y: scroll;
          width: fit-content;
      }

      .flex_row {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 1rem;
      }

      .flex_col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
      }

      .bg_blue {
          background-color: cornflowerblue;
      }

      .bg_green {
          background-color: darkolivegreen;
      }

      .bg_grey {
          background-color: darkgray;
      }

      .hide {
          display: none;
      }

      .margins {
          margin: 1rem;
      }
  </style>
  `;
      const rawHtml9 = _html`
  <h1>blank template</h1>
  `;
      return this.initTemplate(rawCss11, rawHtml9);
    }
    initTemplate(rawCss11, rawHtml9) {
      this.insertAdjacentHtml(rawCss11, rawHtml9);
      return this.template;
    }
    insertAdjacentHtml(rawCss11, rawHtml9, rawJS = "") {
      const style = this.template.content.querySelector("style");
      style.replaceChildren();
      style.insertAdjacentHTML("afterbegin", rawCss11);
      const div = this.template.content.querySelector("div");
      div.replaceChildren();
      div.insertAdjacentHTML("afterbegin", rawHtml9);
      const script = this.template.content.querySelector("script");
      script.replaceChildren();
      script.insertAdjacentHTML("afterbegin", rawJS);
      return this.template;
    }
    // asyns fetching logic
    async fetchTemplates(templateId, url) {
      this._url = url;
      const resp = await fetch(this._url);
      const text = await resp.text();
      this.extractElement(text, templateId);
      return this._templatesMap;
    }
    async getTemplateElement(id = this.templateId) {
      const templateList = await this.fetchTemplates(id, this._url);
      if (templateList.has(this.templateId)) {
        this.template = templateList.get(this.templateId);
      } else {
        this.template = createElement("template", {});
        Html.insertElements(this.template, "<h1>blank template</h1>");
      }
      return this.template;
    }
    async getDocumentFragment() {
      return (await this.getTemplateElement()).content;
    }
    async content() {
      return (await this.getTemplateElement()).content;
    }
    extractElement(domText, tempid) {
      const doc = new DOMParser().parseFromString(domText, "text/html");
      const templateElements = doc.querySelectorAll(`template`);
      templateElements.forEach((el) => {
        this._templatesMap.set(el.id, el);
      });
      this.template = this._templatesMap.get(tempid);
      if (!this.template) this.template = createElement("template", {}, "");
      return Array.from(this._templatesMap);
    }
    // rendering logic
    render(output) {
      if (this.template.content) {
        output.appendChild(this.template.content.cloneNode(true));
      } else
        output.append(`${this.templateId} the template content not defined !!!!`);
    }
  };

  // ../../../l2.infrastructure/src-web-comps/ui-contact.ts
  var rawCss = _css`
<style>
*,
*::after, 
*::before  {
box-sizing: border-box;
margin: 0;
padding:0;
}

:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color:purple;
}


img{
display: block;
max-width: 100%;
height: auto;
/* margin: 0px auto; */
}

:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color: grey;
}

::slotted(label){
color: yellow;
flex-shrink: 0;
}

::slotted(label:hover){
color: red;
}

::slotted(.focus){
background-color:grey;
}

::hover:label{
border: 2px red solid;
}

.focus{
border: 2px yellow solid;
background-color:green;
}

.scroll_x{
overflow-x: scroll;
}
.scroll_y{
overflow-y: scroll;
width: fit-content;
}

.menu_x{
display: flex;
list-style: none;
gap: 2rem;
overflow-x: auto;
}
.menu_x > *{
flex-shrink: 0;
}
.menu_y{
display: flex;
flex-direction:column;
gap: .51rem;
text-align: center;
list-style: none;
width: fit-content;;
border: 2px red solid;
}
.menu_y > *{
margin:0;
padding:0;
}

.flex_row{
display:flex;
flex-direction: row;
flex-wrap: nowrap;
gap: 1rem;
}
.flex_col{
display:flex;
flex-direction: column;
gap: 1rem;
}
.center_text{
text-align: center;
}

.space_between{
justify-content: space-between;
}
.space_around{
justify-content: space-around;
}

.wrap{
display:flex;
flex-wrap: wrap;
gap: 1rem;
}
.hide{
display:none;
}

.border{
border:1px green solid;
}
.border2{
border: 2px green solid;
}

.shrink_off{
flex-shrink: 1;
}
.shrink_on{
flex-shrink: 0;
}

.grow_on{
flex-grow: 1;
}
.grow_off{
flex-grow: 0;
}



</style>
`;
  var rawHtml = _html`
<form>


<slot name="first_name">
<p>no first_name provided</p>
<label for="first_name">first_name</label>
<input id="first_name" name="first_name" type="text" autocomplete="true">
</slot>


<slot name="last_name">
<p>no last_name provided</p>
<label for="last_name">last_name</label>
<input id="last_name" name="last_name" type="text" autocomplete="true">
</slot>


<slot name="age">
<p>no age provided</p>
<label for="age">age</label>
<input id="age" name="age" type="number" autocomplete="true">
</slot>


<slot name="email">
<p>no email provided</p>
<label for="email">"email</label>
<input id="email" name="email" type="text" autocomplete="true">
</slot>

<slot name="phone">
<p>no phone provided</p>
<label for="phone">"phone</label>
<input id="phone" name="phone" type="phone" autocomplete="true">
</slot>

<button type="submit">Done</button> 
</form>
<slot></slot>
`;
  var HTMLUiContactView = class {
    template;
    _shadowRoot;
    controller;
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("");
      tplus.initTemplate(rawCss, rawHtml);
      this.render(tplus.element);
    }
    //
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
    //
  };
  var HTMLUiContactController = class {
    _view;
    _parent;
    _shadowRoot;
    controller;
    constructor(parent) {
      this._parent = parent;
      this._view = new HTMLUiContactView(this._parent._shadowRoot);
    }
  };
  var HTMLUiContact = class extends HTMLElement {
    _shadowRoot;
    controller;
    template;
    thead;
    tbody;
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiContactController(this);
      console.log("<ui-contact> registered....");
    }
    connectedCallback() {
    }
    disconnectedCallback() {
      console.log("disconnectedCallback Method not implemented.");
    }
    attributeChangedCallback(name, oldValue, newValue) {
      throw new Error("Method not implemented.");
    }
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["position", "height", "scrollable", "person-json"];
  };
  window.customElements.define("ui-contact", HTMLUiContact);

  // ../../../l2.infrastructure/src-web-comps/ui-tabs.ts
  var HTMLUiTabsView = class {
    _shadowRoot;
    controller;
    tplus;
    currentElement;
    currentTab;
    tabs_menu_form;
    tabs_menu_ul;
    tabs_output;
    //
    constructor(shadowRoot, _controller) {
      this._shadowRoot = shadowRoot;
      this.tplus = new TemplatePlus("ui_tabs_template", new URL("http://localhost:3000/data/web_components.html"));
      this.controller = _controller;
      this.setupTemplate();
    }
    //
    setupTemplate() {
      this.tplus.content().then((frag) => {
        this.tabs_menu_form = frag.getElementById("tabs_menu_form");
        this.tabs_menu_ul = frag.getElementById("tabs_menu_ul");
        this.tabs_output = frag.getElementById("tabs_output");
        if (this.tabs_output && this.tabs_menu_form) {
          this.tabs_output.addEventListener("click", (evt) => this.processClickEvent(evt));
          this.tabs_menu_form.addEventListener("submit", (evt) => this.processSubmitForm(evt));
          console.log("event handlers initialized");
        } else {
          console.log("event handlers mot initialized");
        }
        let _frag = this.initFormButtons();
        this.tabs_menu_ul.replaceChildren(_frag);
        this.render(this.tplus.element);
      });
    }
    initFormButtons() {
      let ui_tab_items = document.getElementsByTagName("ui-tab");
      let _frag = new DocumentFragment();
      for (let item of ui_tab_items) {
        let _topic = item.getAttribute("topic");
        let _name = item.getAttribute("name");
        let _value = item.getAttribute("value");
        let _btn = createElement("button", { name: _name, value: _value, class: "tabs_item" }, _topic);
        let _li = wrapElement("li", {}, _btn);
        _frag.appendChild(_li);
      }
      return _frag;
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    showTab(tabid) {
      const currenttab = document.querySelectorAll(`ui-tab[slot=active]`);
      const newtab = document.querySelectorAll(`ui-tab[value=${tabid}]`);
      if (!newtab.length) {
        console.log(`tabid ${tabid} does not exist in in lightdom`);
        return;
      }
      currenttab[0].setAttribute("slot", "");
      newtab[0].setAttribute("slot", "active");
      this.currentTab = tabid;
    }
    processClickEvent(evt) {
      const articleName = evt.target.getAttribute("name");
      const articleTopic = evt.target.getAttribute("topic");
    }
    processSubmitForm(evt) {
      evt.preventDefault();
      const fdata = new FormData(evt.target, evt.submitter);
      if (fdata.get("action"))
        this.showTab(fdata.get("action"));
      else
        console.log("no frmdata provided...");
    }
  };
  var HTMLUiTabsController = class {
    _view;
    _parent;
    tabs = [];
    version = "1.0.0";
    fi = new FormInput(null);
    get currentTab() {
      return this._view.currentTab;
    }
    set currentTab(value) {
      this._view.showTab(value);
    }
    //
    constructor(parent) {
      this._parent = parent;
      this._view = new HTMLUiTabsView(this._parent._shadowRoot, this);
      this.version = "1.0.0";
    }
    initTabsAttributes() {
      for (let h of this._parent.children) {
        let ta = {
          name: h.getAttribute("name"),
          value: h.getAttribute("value"),
          slot: h.getAttribute("slot"),
          topic: h.getAttribute("topic"),
          article_id: h.getAttribute("article_id")
        };
        this.tabs.push(ta);
      }
    }
    processRequest(articleID) {
      console.log("Controller.processRequest()", articleID);
    }
    saveFormData() {
      const tplate_Form = this._view.currentElement.querySelector("form");
      const tab_output_Form = this._view.tabs_output.querySelector("form");
      if (!tab_output_Form && !tplate_Form) return;
      const tab_output_fdata = new FormData(tab_output_Form);
      this.fi.attachForm(tplate_Form);
      for (let [key, value] of tab_output_fdata) {
        this.fi.attach(`${key}`);
        this.fi.setValue(`${value}`);
      }
    }
  };
  var HTMLUiTabs = class extends HTMLElement {
    _controller;
    _shadowRoot = this.attachShadow({ mode: "open" });
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["position", "height", "scrollable", "id", "top", "left", "bottom", "right"];
    constructor() {
      super();
      this._controller = new HTMLUiTabsController(this);
      console.log("...ui-tabs registered..");
    }
  };
  window.customElements.define("ui-tabs", HTMLUiTabs);

  // ../../../l2.infrastructure/src-web-comps/ui-tab.ts
  var HTMLUiTab = class extends HTMLElement {
    constructor() {
      super();
      console.log("ui-tab registered..");
    }
  };
  window.customElements.define("ui-tab", HTMLUiTab);

  // ../../../l2.infrastructure/src-web-comps/ui-table.ts
  function createRow(text) {
    return "<tr>" + text.map((h) => `<td>${h}</td>`).join("") + "<tr>";
  }
  var HTMLUiTableView = class {
    _shadowRoot;
    controller;
    template;
    thead;
    tbody;
    //
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.template = new TemplatePlus("ui_table_template", new URL("http://localhost:3000/data/web_components.html"));
    }
    setupTemplate() {
      this.template.content().then((frag) => {
        this.thead = frag.querySelectorAll("table thead")[0];
        this.tbody = frag.querySelectorAll("table tbody")[0];
        fetch("http://localhost:3000/data/persons.json").then((resp) => resp.json()).then((data) => {
          const obj = data[0];
          const rows = [];
          this.thead.innerHTML = createRow(Object.keys(obj));
          data.forEach((o) => {
            let row = createRow(Object.values(o));
            rows.push(row);
          });
          this.tbody.innerHTML = rows.join("");
          this.render(frag);
        });
      });
    }
    //
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
  };
  var HTMLUiTableController = class {
    _view;
    _parent;
    //
    constructor(parent) {
      this._parent = parent;
      this._view = new HTMLUiTableView(this._parent._shadowRoot);
      this._view.setupTemplate();
    }
  };
  var HTMLUiTable = class extends HTMLElement {
    _controller;
    _shadowRoot;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["position", "height", "scrollable", "id", "top", "left", "bottom", "right"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._controller = new HTMLUiTableController(this);
      console.log("ui-table registered....");
    }
  };
  window.customElements.define("ui-table", HTMLUiTable);

  // ../../../l2.infrastructure/src-web-comps/ui-gallery.ts
  var HTMLUiGalleryView = class {
    _shadowRoot;
    controller;
    template;
    galleryImagesList = null;
    currentImage = null;
    selectedElement = null;
    galleryBtnForm = null;
    selectedImageIndex = 0;
    gallerySize = 0;
    set SelectedImageIndex(index) {
      if (index < 0) index = this.gallerySize - 1;
      if (index >= this.gallerySize) index = 0;
      this.selectedImageIndex = index;
      this.setFocus(index);
    }
    get SelectedImageIndex() {
      return this.selectedImageIndex;
    }
    //
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.template = new TemplatePlus("ui_gallery_template", new URL("http://localhost:3000/data/web_components.html"));
      this.setupTemplate();
      ;
    }
    //
    setupTemplate() {
      this.template.content().then((frag) => {
        this.currentImage = frag.getElementById("current_image");
        this.galleryImagesList = frag.getElementById("gallery_images_list");
        this.galleryBtnForm = frag.getElementById("gallery_btn_form");
        let images_li = document.querySelectorAll("ui-gallery li");
        this.gallerySize = images_li.length;
        const tn_img = document.createElement("li");
        tn_img.insertAdjacentHTML("afterbegin", `<img class="img_thumbnai" src="images/icons/icon72.png">`);
        this.galleryImagesList.replaceChildren();
        images_li.forEach((li) => this.galleryImagesList.appendChild(li));
        if (this.galleryImagesList && this.galleryBtnForm) {
          this.galleryImagesList.addEventListener("click", this.processClickEvent.bind(this));
          this.galleryBtnForm.addEventListener("submit", this.processSubmitForm.bind(this));
          console.log("event handlers sucessfully registered..");
        } else {
          console.log("event handlers not registered..");
        }
        fetch("http://localhost:3000/data/gallery.json").then((resp) => resp.json()).then((data) => {
        });
        this.SelectedImageIndex = 2;
        this.render(frag);
        this.setFocus(this.SelectedImageIndex);
      });
    }
    render(node) {
      if (!node) {
        console.log("node is null");
        return;
      }
      if (node instanceof DocumentFragment)
        this._shadowRoot.appendChild(node);
      else
        this._shadowRoot.appendChild(node.content);
    }
    processClickEvent(event) {
      this.selectedElement = event.target;
      if (this.selectedElement.tagName.toUpperCase() !== "IMG") return;
      let images = this.galleryImagesList.getElementsByTagName("img");
      this.SelectedImageIndex = Array.from(images).indexOf(this.selectedElement);
    }
    processSubmitForm(evt) {
      evt.preventDefault();
      const fdata = new FormData(evt.target, evt.submitter);
      switch (fdata.get("action")) {
        case "prev":
          this.SelectedImageIndex -= 1;
          break;
        case "next":
          this.SelectedImageIndex += 1;
          break;
      }
    }
    //
    setFocus(index) {
      let newSelectedImage = this.galleryImagesList.getElementsByTagName("img")[index];
      let oldSelectedImage = this.galleryImagesList.getElementsByClassName("border")[0];
      let image = this.galleryImagesList.getElementsByTagName("img")[index];
      this.currentImage.setAttribute("src", image.getAttribute("src"));
      if (oldSelectedImage) Css.border(oldSelectedImage, false);
      Css.border(newSelectedImage, true);
    }
    startSlide() {
    }
  };
  var HTMLUiGalleryController = class {
    _view;
    _parent;
    //
    constructor(parent) {
      this._parent = parent;
      this._view = new HTMLUiGalleryView(this._parent._shadowRoot);
    }
  };
  var HTMLUiGallery = class extends HTMLElement {
    _controller;
    _shadowRoot;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height", "url"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._controller = new HTMLUiGalleryController(this);
      console.log("ui-gallery registered....");
    }
  };
  window.customElements.define("ui-gallery", HTMLUiGallery);

  // ../../../l2.infrastructure/src-web-comps/ui-panel.ts
  var rawCss2 = _css`
<style>
*,
*::after, 
*::before  {
    box-sizing: border-box;
    margin: 0;
    padding:0;
}

:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color:purple;
}


img{
    display: block;
    max-width: 100%;
    height: auto;
    /* margin: 0px auto; */
}

.position_top{
    position: fixed;
    top: 0;
    width:100%;
    z-index: 1;
}
.position_bottom{
    position: fixed;
    bottom: 0;
    width:100%;
    z-index: 1;
}
.position_left{
    position: fixed;
    left: 0;
    width:100%;
    z-index: 1;
}
.position_right{
    position: fixed;
    right: 0;
    width:100%;
    z-index: 1;
}

    .scroll_x {
        overflow-x: scroll;
    }

    .scroll_y {
        overflow-y: scroll;
        width: fit-content;
    }

    .flex_row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 1rem;
    }

    .flex_col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .bg_blue {
        background-color: cornflowerblue;
    }

    .bg_green {
        background-color: darkolivegreen;
    }

    .bg_grey {
        background-color: darkgray;
    }

    .hide {
        display: none;
    }

    .margins {
        margin: 1rem;
    }

    .paddings {
    padding: 1rem;
    }
    
    .inline{
    display: inline-block;
    }
</style>
`;
  var rawHtml2 = _html`
<div id="panel">
<slot name="menu">
<p>no slots provided</p>
</slot>
</div> 
`;
  var HTMLUiPanelView = class {
    _shadowRoot;
    controller;
    id;
    height;
    scrollable;
    position;
    panel_div;
    ui_panels;
    light_dom;
    shadow_dom;
    styles = [];
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
    }
    setupTemplate() {
      const tplus = new TemplatePlus("");
      const template = tplus.initTemplate(rawCss2, rawHtml2);
      let div = template.content.querySelector("div");
      this.render(template.content.cloneNode(true));
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
  };
  var HTMLUiPanelController = class {
    view;
    parent;
    constructor(parent) {
      this.parent = parent;
      this.view = new HTMLUiPanelView(this.parent._shadowRoot);
    }
    get styles() {
      return this.view.styles;
    }
    get id() {
      return this.view.id;
    }
    get Height() {
      return this.view.height;
    }
    get Scrollable() {
      return this.view.scrollable;
    }
    get Position() {
      return this.view.position;
    }
    set id(value) {
      this.view.id = value;
    }
    set Height(value) {
      this.view.height = value;
    }
    set Scrollable(value) {
      this.view.height = value;
    }
    set Position(value) {
      this.view.height = value;
    }
  };
  var HTMLUiPanel = class extends HTMLElement {
    _shadowRoot;
    view;
    controller;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["position", "height", "scrollable", "id", "top", "left", "bottom", "right"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiPanelController(this);
      console.log("ui-panel registered....");
    }
    connectedCallback() {
      this.controller.view.setupTemplate();
    }
    disconnectedCallback() {
      console.log("disconnectedCallback Method not implemented.");
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.controller.view[name] = newValue;
      if (name == "id") return;
      if (name == "left" || name == "right") {
        this.controller.styles.push(`display:inline-block`);
        this.controller.styles.push(`margin-bottom: 2rem`);
        this.controller.styles.push(`${name}: 0`);
        return;
      }
      this.controller.styles.push(`${name}:${newValue}`);
    }
  };
  window.customElements.define("ui-panel", HTMLUiPanel);

  // ../../../l2.infrastructure/src-web-comps/ui-view.ts
  var rawCss3 = _css`
    <style>
            *,
            *::after, 
            *::before  {
                box-sizing: border-box;
                margin: 0;
                padding:0;
            }
                
:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color:purple;
}

            img{
                display: block;
                max-width: 100%;
                height: auto;
                /* margin: 0px auto; */
            }

    </style>
`;
  var rawHtml3 = _html`
<slot>
<p>ui-view component</p>
</slot>
<div id="output">
output
</div>
`;
  var HTMLUiViewView = class {
    _shadowRoot;
    controller;
    get url() {
      return new URL("http://localhost:3000/html/es6-ts-this.html");
    }
    set url(value) {
    }
    get width() {
      return "";
    }
    set width(value) {
    }
    get height() {
      return "";
    }
    set height(value) {
    }
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("tid");
      tplus.initTemplate(rawCss3, rawHtml3);
      this.render(tplus.element);
    }
    parseRawHtml(rawhtml) {
      const dom = new DOMParser().parseFromString(rawhtml, "text/html");
      const style = dom.querySelector("style");
      const body = dom.querySelector("body");
      console.log(dom);
      return `<style>${style.innerHTML}</style> ${body.innerHTML}`;
    }
    fetchArticleUrl(article) {
      const article_url = article.getAttribute("url");
      if (!article_url) return;
      console.log(`article url: ${article_url}`);
      const url = new URL(`http://localhost:3000/${article_url}`);
      fetch(url).then((response) => response.text()).then((rawHtml9) => article.innerHTML = this.parseRawHtml(rawHtml9)).catch((e) => console.log(e));
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
  };
  var HTMLUiViewController = class {
    view;
    parent;
    controller;
    constructor(parent) {
      this.parent = parent;
      this.view = new HTMLUiViewView(this.parent._shadowRoot);
    }
  };
  var HTMLUiView = class extends HTMLElement {
    _shadowRoot;
    view;
    controller;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height", "url"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiViewController(this);
      console.log("ui-view registered....");
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.controller.view[name] = newValue;
    }
  };
  window.customElements.define("ui-view", HTMLUiView);

  // ../../../l2.infrastructure/src-web-comps/ui-folder.ts
  var rawCss4 = _css`
<style>
*,
*::after, 
*::before  {
box-sizing: border-box;
margin: 0;
padding:0;
}

img{
display: block;
max-width: 100%;
height: auto;
/* margin: 0px auto; */
}

:host{
display:block;
contain:paint;

border: 2px red dashed;
color: white;
background-color:purple;
}

::slotted(label){
color: yellow;
flex-shrink: 0;
}

::slotted(label:hover){
color: red;
}

::slotted(.focus){
background-color:grey;
}

::slotted(article){
height: 25rem;;
overflow:auto;
}

.focus{
border: 2px yellow solid;
background-color:green;
}

.scroll_x{
overflow-x: scroll;
}
.scroll_y{
overflow-y: scroll;
width: fit-content;
}

.menu_x{
display: flex;
list-style: none;
gap: 2rem;
overflow-x: auto;
}
.menu_x > *{
flex-shrink: 0;
}
.menu_y{
display: flex;
flex-direction:column;
gap: .51rem;
text-align: center;
list-style: none;
width: fit-content;;
border: 2px red solid;
}
.menu_y > *{
margin:0;
padding:0;
}

.flex_row{
display:flex;
flex-direction: row;
flex-wrap: nowrap;
gap: 1rem;
}
.flex_col{
display:flex;
flex-direction: column;
gap: 1rem;
}
.center_text{
text-align: center;
}

.space_between{
justify-content: space-between;
}
.space_around{
justify-content: space-around;
}

.wrap{
display:flex;
flex-wrap: wrap;
gap: 1rem;
}
.hide{
display:none;
}

.border{
border:1px green solid;
}
.border2{
border: 2px green solid;
}

.shrink_off{
flex-shrink: 1;
}
.shrink_on{
flex-shrink: 0;
}

.grow_on{
flex-grow: 1;
}
.grow_off{
flex-grow: 0;
}



</style>
`;
  var rawHtml4 = _html`
<form>
<nav id="nav" class="flex_row menu_x">
    <slot name="tab">
      <p>no labels provided...</p>
    </slot>
</nav>
</form>

<h3Article</h3>
<slot name="details">
<p>no details provided...</p>
</slot>
`;
  var HTMLUiFolderView = class {
    _shadowRoot;
    controller;
    currentTab = "tab1";
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.setupTemplate();
      this.showDetails(this.currentTab);
    }
    initEventHandlers() {
      this._shadowRoot.addEventListener("submit", this.processSubmitForm.bind(this));
      this._shadowRoot.addEventListener("click", this.processClickEvent.bind(this));
    }
    setupTemplate() {
      const tplus = new TemplatePlus("");
      tplus.initTemplate(rawCss4, rawHtml4);
      this.render(tplus.element);
      this.initEventHandlers();
      const slots = this._shadowRoot.querySelectorAll("slot");
      const slot_attrs = document.querySelectorAll("[slot=details]");
      slot_attrs.forEach((sa) => sa.setAttribute("slot", "1"));
    }
    parseRawHtml(rawhtml) {
      const dom = new DOMParser().parseFromString(rawhtml, "text/html");
      const style = dom.querySelector("style");
      const body = dom.querySelector("body");
      console.log(dom);
      return `<style>${style.innerHTML}</style> ${body.innerHTML}`;
    }
    fetchArticleUrl(article) {
      const article_url = article.getAttribute("url");
      if (!article_url) return;
      console.log(`article url: ${article_url}`);
      const url = new URL(`http://localhost:3000/${article_url}`);
      fetch(url).then((response) => response.text()).then((rawHtml9) => article.innerHTML = this.parseRawHtml(rawHtml9)).catch((e) => console.log(e));
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const clickedElement = event.target;
      if (clickedElement.tagName === "LABEL") {
        this.showDetails(clickedElement.getAttribute("for"));
      }
    }
    processSubmitForm(event) {
      event.preventDefault();
      const form = document.getElementById("some_form");
      const fdata = new FormData(form, event.submitter);
      const form_input = fdata.get("some form input element");
    }
    showDetails(tabId) {
      try {
        document.getElementById(this.currentTab).setAttribute("slot", "1");
        this.setFocus(this.currentTab, false);
        this.currentTab = tabId;
        const article = document.getElementById(this.currentTab);
        this.fetchArticleUrl(article);
        article.setAttribute("slot", "details");
        this.setFocus(this.currentTab, true);
      } catch (error) {
        console.log(`no article found. ${error.message}`);
        console.log(`showdetails new tab:${tabId}    old tab: ${this.currentTab}`);
      }
    }
    setFocus(tabId, on) {
      const el = document.querySelector(`[for=${tabId}]`);
      if (on)
        el.classList.add("focus");
      else
        el.classList.remove("focus");
    }
  };
  var HTMLUiFolderController = class {
    view;
    parent;
    controller;
    constructor(parent) {
      this.parent = parent;
      this.view = new HTMLUiFolderView(this.parent._shadowRoot);
    }
  };
  var HTMLUiFolder = class extends HTMLElement {
    _shadowRoot;
    view;
    controller;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height", "url"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiFolderController(this);
      console.log("<ui-folder> registered....");
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log("attributeChangedCallback Method not implemented.");
    }
  };
  window.customElements.define("ui-folder", HTMLUiFolder);

  // ../../../l2.infrastructure/src-web-comps/ui-nav.ts
  var rawCss5 = _css`
    <style>
        *,
        *::after, 
        *::before  {
            box-sizing: border-box;
            margin: 0;
            padding:0;
        }

    :host{
        display:block;
        contain:paint;

        border: 2px red dashed;
        color: white;
        background-color:purple;
        }

        .bg_blue{
          background-color: blue;
        }

        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
        }

        .scroll_x{
            overflow-x: scroll;
        }
        .scroll_y{
            overflow-y: scroll;
            width: fit-content;
        }

        .menu_x{
            display: flex;
            list-style: none;
            gap: 2rem;
            overflow: auto;
            margin: 0px;
            padding: 0px;
        }
        .menu_x > *{
            flex-shrink: 0;
        }
        .menu_y{
            display: flex;
            flex-direction:column;
            gap: .51rem;
            text-align: center;
            list-style: none;
            width: fit-content;;
            border: 2px red solid;
        }
        .menu_y > *{
            margin:0;
            padding:0;
        }

        .flex_row{
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
        }
        .flex_col{
            display:flex;
            flex-direction: column;
            gap: 1rem;
        }

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
        }
        .center_text{
            text-align: center;
        }

        .space_between{
            justify-content: space-between;
        }
        .space_around{
            justify-content: space-around;
        }

        .wrap{
            display:flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .hide{
            display:none;
        }

        .border{
            border:1px green solid;
        }
        .border2{
            border: 2px green solid;
        }
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

        .ul_inline{
            display:inline-block;
            margin:0px;
            padding:0px;
        }
        .ul_inline li{
            display:inline-block;
        }

    </style>
`;
  var rawHtml5 = _html`
  <nav class="bg_blue flex_row">
    <form id="nav_form"  action="">
            <select> 
                <option>Action 1</option>
                <option>Action 2</option>
            </select>
            
            <input id="1" type="radio" name="menu" value="1">
            <label for="1">Menu 1</label>

            <input id="2" type="radio" name="menu" value="2">
            <label for="2">Menu 2</label>

            <input type="text" value="search">

            <ul class="menu_x">
                <li>Action 1</li>
                <li>Action 2</li>
            </ul>
    </form>
  </nav>
`;
  var HTMLUiNavView = class {
    template;
    _shadowRoot;
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.template = new TemplatePlus("ui_nav_template", new URL("http://localhost:3000/data/web_components.html"));
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("");
      const slots = document.querySelectorAll(`[slot="nav-action"]`);
      const template = tplus.initTemplate(rawCss5, rawHtml5);
      const ul = template.content.querySelector(`ul`);
      const select = template.content.querySelector(`select`);
      let li = "";
      let option = "";
      ul.replaceChildren();
      select.replaceChildren();
      slots.forEach((el) => {
        li += `<li>${el.textContent}</li>`;
        option += `<option>${el.textContent}</option>`;
      });
      ul.insertAdjacentHTML("afterbegin", li);
      select.insertAdjacentHTML("afterbegin", option);
      this.render(tplus.element);
      this.initEventHandlers();
    }
    initEventHandlers() {
      this._shadowRoot.addEventListener("submit", this.processSubmitForm.bind(this));
      this._shadowRoot.addEventListener("click", this.processClickEvent.bind(this));
      console.log("initEventHandlers...");
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const clickedElement = event.target;
      const form = this._shadowRoot.querySelector("form");
      const formjson = new Form(form);
      console.log(clickedElement.tagName);
      console.log(formjson.getJsonData());
    }
    processSubmitForm(event) {
      event.preventDefault();
      const form = document.getElementById("some_form");
      console.log("processSubmitForm", form);
    }
  };
  var HTMLUiNavController = class {
    _view;
    _parent;
    constructor(parent) {
      this._parent = parent;
      this._view = new HTMLUiNavView(this._parent._shadowRoot);
    }
  };
  var HTMLUiNav = class extends HTMLElement {
    _controller;
    _shadowRoot;
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height"];
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._controller = new HTMLUiNavController(this);
      console.log("ui-nav registered..");
    }
  };
  window.customElements.define("ui-nav", HTMLUiNav);

  // ../../../l2.infrastructure/src-web-comps/ui-nav-action.ts
  var HTMLUiNavAction = class extends HTMLElement {
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["slot", "template", "href", "action"];
    constructor() {
      super();
      console.log("ui-navaction registered..");
    }
  };
  window.customElements.define("ui-navaction", HTMLUiNavAction);

  // ../../../l2.infrastructure/src-web-comps/ui-route-list.ts
  var HTMLUiRouteList = class extends HTMLElement {
    constructor() {
      super();
      console.log("ui-route-list registered..");
    }
  };
  window.customElements.define("ui-route-list", HTMLUiRouteList);

  // ../../../l2.infrastructure/src-web-comps/ui-route.ts
  var HTMLUiRoute = class extends HTMLElement {
    constructor() {
      super();
      console.log("ui-route registered..");
    }
  };
  window.customElements.define("ui-route", HTMLUiRoute);

  // ../../../l2.infrastructure/src-web-comps/ui-icon.ts
  var HTMLUiIcon = class extends HTMLElement {
    // satisfies webcomponentlifecycle interface
    observedAttributes;
    // this property must be static inorder to receive attributechangedcallback allsbe 
    static observedAttributes = ["width", "height", "url"];
    constructor() {
      super();
      console.log("ui-icon registered..");
    }
  };
  window.customElements.define("ui-icon", HTMLUiIcon);

  // ../../../l2.infrastructure/src-web-comps/ui-choice.ts
  var rawCss6 = _css`
    <style>
        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
        }

        .scroll_x{
            overflow-x: scroll;
        }
        .scroll_y{
            overflow-y: scroll;
            width: fit-content;
        }

        .menu_x{
            display: flex;
            list-style: none;
            gap: 2rem;
            overflow-x: scroll;
        }
        .menu_x > *{
            flex-shrink: 0;
        }
        .menu_y{
            display: flex;
            flex-direction:column;
            gap: .51rem;
            text-align: center;
            list-style: none;
            width: fit-content;;
            border: 2px red solid;
        }
        .menu_y > *{
            margin:0;
            padding:0;
        }

        .flex_row{
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
        }
        .flex_col{
            display:flex;
            flex-direction: column;
            gap: 1rem;
        }

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
        }
        .center_text{
            text-align: center;
        }

        .space_between{
            justify-content: space-between;
        }
        .space_around{
            justify-content: space-around;
        }

        .wrap{
            display:flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .hide{
            display:none;
        }

        .border{
            border:1px green solid;
        }
        .border2{
            border: 2px green solid;
        }
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

    </style>
`;
  var rawHtml6 = _html`
<slot name="title">no title</slot>
<select class="bg_grey">
<slot name="item">
<option>no ui-select slot items provided</option>
</slot>
</select>
`;
  var HTMLUiChoiceView = class {
    _shadowRoot;
    controller;
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("tid");
      tplus.initTemplate(rawCss6, rawHtml6);
      this.render(tplus.element);
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
  };
  var HTMLUiChoiceController = class {
    view;
    parent;
    controller;
    constructor(parent) {
      this.parent = parent;
      this.view = new HTMLUiChoiceView(this.parent._shadowRoot);
    }
  };
  var HTMLUiChoice = class extends HTMLElement {
    _shadowRoot;
    view;
    controller;
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiChoiceController(this);
      console.log("ui-choice registered....");
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log("attributeChangedCallback Method not implemented.");
    }
    get observedAttributes() {
      console.log("observedAttributes Method not implemented.");
      return ["name", "value"];
    }
  };
  window.customElements.define("ui-choice", HTMLUiChoice);

  // ../../../l2.infrastructure/src-web-comps/ui-select.ts
  var rawCss7 = _css`
    <style>
        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
        }

        .scroll_x{
            overflow-x: scroll;
        }
        .scroll_y{
            overflow-y: scroll;
            width: fit-content;
        }

        .menu_x{
            display: flex;
            list-style: none;
            gap: 2rem;
            overflow-x: scroll;
        }
        .menu_x > *{
            flex-shrink: 0;
        }
        
        .menu_y{
            display: flex;
            flex-direction:column;
            gap: .51rem;
            text-align: center;
            list-style: none;
            width: fit-content;;
        }
        .menu_y > *{
            margin:0;
            padding:0;
        }

        .flex_row{
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
        }
        .flex_col{
            display:flex;
            flex-direction: column;
            gap: 1rem;
        }

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
        }
        .center_text{
            text-align: center;
        }

        .space_between{
            justify-content: space-between;
        }
        .space_around{
            justify-content: space-around;
        }

        .wrap{
            display:flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .hide{
            display:none;
        }

        .border{
            border:1px green solid;
        }
        .border2{
            border: 2px green solid;
        }
        
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

    </style>
`;
  var HTMLUISelectView = class {
    _shadowRoot;
    constructor(sRoot) {
      this._shadowRoot = sRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("tid");
      this.render(tplus.element);
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
  };
  var HTMLUISelect = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const csv = new HTMLUISelectView(this.shadowRoot);
      console.log("ui-select registered...");
    }
  };
  customElements.define("ui-select", HTMLUISelect);

  // ../../../l2.infrastructure/src-web-comps/ui-option.ts
  var rawCss8 = _css`
    <style>
        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
        }

        .scroll_x{
            overflow-x: scroll;
        }
        .scroll_y{
            overflow-y: scroll;
            width: fit-content;
        }

        .menu_x{
            display: flex;
            list-style: none;
            gap: 2rem;
            overflow-x: scroll;
        }
        .menu_x > *{
            flex-shrink: 0;
        }
        .menu_y{
            display: flex;
            flex-direction:column;
            gap: .51rem;
            text-align: center;
            list-style: none;
            width: fit-content;;
            border: 2px red solid;
        }
        .menu_y > *{
            margin:0;
            padding:0;
        }

        .flex_row{
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
        }
        .flex_col{
            display:flex;
            flex-direction: column;
            gap: 1rem;
        }

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
        }
        .center_text{
            text-align: center;
        }

        .space_between{
            justify-content: space-between;
        }
        .space_around{
            justify-content: space-around;
        }

        .wrap{
            display:flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .hide{
            display:none;
        }

        .border{
            border:1px green solid;
        }
        .border2{
            border: 2px green solid;
        }
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

    </style>
`;
  var HTMLUIOptionView = class {
    _shadowRoot;
    constructor(sRoot) {
      this._shadowRoot = sRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("tid");
      this.render(tplus.element);
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
  };
  var HTMLUIOption = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const csv = new HTMLUIOptionView(this.shadowRoot);
      console.log("ui-option registered...");
    }
  };
  customElements.define("ui-option", HTMLUIOption);

  // ../../../l2.infrastructure/src-web-comps/ui-search.ts
  var rawCss9 = _css`
    <style>
        img{
            width: 3rem;
            height: 3rem;
        }

        .bg_blue{
            background-color: cornflowerblue;
        }
        .bg_green{
            background-color: darkolivegreen;
        }
        .bg_grey{
            background-color: darkgray;
        }

        .hide{
            display:none;
        }

        .position_top{
            position: fixed;
            top: 0;
            width:100%;
            z-index: 1;
        }
        .position_bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            z-index: 1;
        }
        .position_left{
            position: fixed;
            left: 0;
            width:100%;
            z-index: 1;
        }
        .position_right{
            position: fixed;
            right: 0;
            width:100%;
            z-index: 1;
        }

        .scroll_x{
            overflow-x: scroll;
        }
        .scroll_y{
            overflow-y: scroll;
            width: fit-content;
        }

        .menu_x{
            display: flex;
            list-style: none;
            gap: 2rem;
            overflow-x: scroll;
        }
        .menu_x > *{
            flex-shrink: 0;
        }
        .menu_y{
            display: flex;
            flex-direction:column;
            gap: .51rem;
            text-align: center;
            list-style: none;
            width: fit-content;;
            border: 2px red solid;
        }
        .menu_y > *{
            margin:0;
            padding:0;
        }

        .flex_row{
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 1rem;
        }
        .flex_col{
            display:flex;
            flex-direction: column;
            gap: 1rem;
        }

        .fullscreen{
            position: relative;
            top: 2rem;
            height: 80vh;
            /*width: 100%;*/
        }

        .width100{width:100%;}
        .width75{width:75%;}
        .width50{width:50%;}
        .width50{width:25%;}

        .fullwidth{
            width: 100%;
        }

        .flex_center{
            display:flex;
            align-items: center ;
            justify-content: center;
        }

        .center{
            display:flex;
            text-align: center;
            align-items: center ;
            justify-content: center;
        }
        .center *{
            text-align: center;
            margin: 0 auto;
            display: inline-block;
        }
        .center_text{
            text-align: center;
        }

        .space_between{
            justify-content: space-between;
        }
        .space_around{
            justify-content: space-around;
        }

        .wrap{
            display:flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .hide{
            display:none;
        }

        .border{
            border:1px green solid;
        }
        .border2{
            border: 2px green solid;
        }
        .grow_on{
            flex-grow: 1;
        }
        .grow_off{
            flex-grow: 0;
        }

        .shrink_on{
            flex-shrink: 1;
        }
        .shrink_off{
            flex-shrink: 0;
        }

        .margins{
            margin: 1rem;
        }

    </style>
`;
  var rawHtml7 = _html`
<slot></slot>`;
  var HTMLUiSearchView = class {
    template;
    _shadowRoot;
    controller;
    constructor(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("tid");
      tplus.initTemplate(rawCss9, rawHtml7);
      this.render(tplus.element);
    }
    render(node) {
      if (node instanceof HTMLTemplateElement)
        this._shadowRoot.appendChild(node.content);
      else
        this._shadowRoot.appendChild(node);
    }
    processClickEvent(event) {
      const selectedElement = event.target;
    }
    processSubmitForm(evt) {
    }
    //
  };
  var HTMLUiSearchController = class {
    view;
    parent;
    controller;
    constructor(parent) {
      this.parent = parent;
      this.view = new HTMLUiSearchView(this.parent._shadowRoot);
    }
  };
  var HTMLUiSearch = class extends HTMLElement {
    _shadowRoot;
    view;
    controller;
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this.controller = new HTMLUiSearchController(this);
      console.log("ui-search registered....");
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
      throw new Error("Method not implemented.");
    }
    get observedAttributes() {
      throw new Error("Method not implemented.");
    }
  };
  window.customElements.define("ui-search", HTMLUiSearch);

  // ../../../l2.infrastructure/src-page-mvc/app_shell/app_shell.ts
  var rawCss10 = `
<style>
    h1{
        color:red;
    }
</style>
`;
  var rawHtml8 = `
<h1>....Hello ....</h1>
`;
  var AppShellView = class {
    topPanel;
    bottomPanel;
    centerPanel;
    leftPanel;
    rightPanel;
    panels = /* @__PURE__ */ new Map();
    constructor() {
      this.topPanel = document.getElementById("top_panel");
      this.panels.set("top", this.topPanel);
      this.bottomPanel = document.getElementById("bottom_panel");
      this.panels.set("bottom", this.bottomPanel);
      this.centerPanel = document.getElementById("center_panel");
      this.panels.set("center", this.centerPanel);
      this.leftPanel = document.getElementById("left_panel");
      this.panels.set("left", this.leftPanel);
      this.rightPanel = document.getElementById("right_panel");
      this.panels.set("right", this.rightPanel);
      this.setupTemplate();
    }
    setupTemplate() {
      const tplus = new TemplatePlus("");
      tplus.initTemplate(rawCss10, rawHtml8);
      this.render(tplus.element);
    }
    render(node, panel = "center") {
      if (!node) {
        console.log("node is null");
        return;
      }
      const outPanel = this.panels.get(panel) || this.centerPanel;
      if (node instanceof DocumentFragment)
        outPanel.replaceChildren(node);
      else
        outPanel.replaceChildren(node.content);
    }
    print(innerContent, format = "text") {
      try {
        if (format === "paragraph")
          this.centerPanel.innerHTML += `<p>${innerContent}</p>`;
        else
          this.centerPanel.innerHTML += `<text>${innerContent}</text>`;
      } catch (error) {
        console.log(error.message);
      }
    }
    addClass(element, className) {
      this.listClass(element);
      if (element.classList) element.classList.add(className);
    }
    deleteClass(element, className) {
      this.listClass(element);
      if (element.classList) element.classList.remove(className);
    }
    listClass(element) {
      const results = [];
      if (element.classList) element.classList.forEach((cl) => {
        results.push(cl);
      });
      return results;
    }
    show(panel) {
      if (panel.classList.contains("hide")) this.deleteClass(panel, "hide");
    }
    hide(panel) {
      this.addClass(panel, "hide");
    }
    center(flag) {
      if (flag)
        this.centerPanel.classList.add("center");
      else
        this.centerPanel.classList.remove("center");
    }
    clear() {
      if (this.centerPanel) this.centerPanel.replaceChildren();
    }
    showPanel(panel) {
      if (panel == "left") this.show(this.leftPanel);
      if (panel == "right") this.show(this.rightPanel);
      if (panel == "top") this.show(this.topPanel);
      if (panel == "bottom") this.show(this.bottomPanel);
    }
    hidePanel(panel) {
      if (panel == "left") this.hide(this.leftPanel);
      if (panel == "right") this.hide(this.rightPanel);
      if (panel == "top") this.hide(this.topPanel);
      if (panel == "bottom") this.hide(this.bottomPanel);
    }
  };
  var AppShellModel = class {
  };
  var AppShellController = class {
    _view = new AppShellView();
    _model = new AppShellModel();
    constructor() {
      this.initHandlers();
    }
    // register domContentLoaded and winLoad and nav_event
    initHandlers() {
      globalThis.onload = this.windowLoaded.bind(this);
      document.addEventListener("DOMContentLoaded", this.domLoaded.bind(this));
      globalThis.addEventListener("nav_event", this.navEventHandler.bind(this));
    }
    // DocumentContentLoaded Handler
    domLoaded() {
      const tp = document.getElementById("top_panel");
      tp.addEventListener("submit", (e) => alert("yadda..." + e.target));
      console.log("DOM ready");
    }
    // WinLoad Handler
    windowLoaded() {
      const tplus = new TemplatePlus("nav_template");
      controller.showPanel("top", tplus);
      console.log("all resources are loaded");
    }
    navEventHandler(event) {
      console.log("nav_event received", event.detail);
      _showComponent(event.detail.template);
    }
    print(text) {
      this._view.print(text, "text");
    }
    printLn(text) {
      this._view.print(text, "paragraph");
    }
    showPanel(_panelName, tplus) {
      tplus.getTemplateElement().then((telement) => this.render(telement, "top"));
    }
    hide(panelName) {
      this._view.hidePanel(panelName);
    }
    centerView() {
      this._view.center(true);
    }
    resetView() {
      this.clearView();
      this._view.center(false);
    }
    clearView() {
      this._view.clear();
    }
    render(node, panel = "center") {
      this._view.render(node, panel);
    }
  };
  function _showComponent(templateId) {
    const tplus = new TemplatePlus(templateId);
    console.log("showing component ", templateId);
    tplus.getTemplateElement().then((te) => {
      controller.resetView();
      controller.render(te, "center");
    });
  }
  var controller = new AppShellController();
})();
//# sourceMappingURL=app_shell.js.map

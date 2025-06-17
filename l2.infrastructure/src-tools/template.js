"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var Template = /** @class */ (function () {
    //
    function Template(templateId) {
        this._rawCss = "<style>body{color:red}</style>";
        this._template = document.getElementById(templateId);
    }
    Template.fetchTemplate = function (url, elementID) {
        var result = "<span></span>";
        //fetch the fragment from the url
        // html = new Fecch(url);
        // result = html.getElementByID(id);
        return new Template(result);
    };
    //
    Template.toDocumentFragment = function (value) {
        var temp = document.createElement("template");
        temp.innerHTML = value;
        return temp.content;
    };
    //
    Template.prototype.toElement = function () {
        return this._template;
    };
    //
    Template.prototype.toClone = function () {
        return this._template.content.cloneNode(true);
    };
    //
    Template.prototype.render = function (templateId) {
        document.getElementById(templateId).appendChild(this.toClone());
    };
    //
    Template.prototype.renderNode = function (parent) {
        parent.appendChild(this.toClone());
    };
    return Template;
}());
exports.Template = Template;

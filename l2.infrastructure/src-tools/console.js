"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
var template_js_1 = require("./template.js");
var Console = /** @class */ (function () {
function Console(element) {
this._elementID = "elementID";
this._outputPort = element;
}
//
//
Console.prototype.log = function (text) {
/*
const childElement = document.createElement("p");

childElement.textContent = text;

this._outputPort.appendChild(childElement); */
this._outputPort.appendChild(template_js_1.Template.toDocumentFragment("<p>".concat(text, "</p>")));
};
return Console;
}());
exports.Console = Console;

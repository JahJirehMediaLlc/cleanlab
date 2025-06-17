"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter_ = exports.aBirthDayEvent = exports.logItemAddedEvent = exports.consoleSnapshotTakenEvent = exports.consoleTakeSnapShotEvent = void 0;
/* import {IEmitter} from './interfaces';
import {EventEmitter} from 'events'; */
//
exports.consoleTakeSnapShotEvent = new CustomEvent('take-snap-shot', {
    detail: 'snapshot= pagesize= logsize= currentpage='
});
exports.consoleSnapshotTakenEvent = new CustomEvent('console-snapshot-taken', {
    detail: 'pagesize= logsize= currentpage='
});
exports.logItemAddedEvent = new CustomEvent('log-item-added', {
    detail: 'hello'
});
//
exports.aBirthDayEvent = new CustomEvent('birthday-event', {
    detail: {
        message: "Hallp Birthday...",
        dob: "06/04/64",
        person: "full name"
    }
});
//
var anEvent = new Event("look", { bubbles: true,
    cancelable: false
});
// create custom events
var catFoundEvent = new CustomEvent("animal-found", {
    detail: {
        name: "cat",
    },
});
//
var dogFoundEvent = new CustomEvent("animal-found", {
    detail: {
        name: "dog",
    },
});
//
var EventEmitter_ = /** @class */ (function () {
    function EventEmitter_(target, eventName) {
        this.target = target;
        this.eventName = eventName;
    }
    EventEmitter_.prototype.emit = function (value, options) {
        var aCustomEvent = new CustomEvent(this.eventName, __assign({ detail: value }, options));
        this.target.dispatchEvent(aCustomEvent);
    };
    EventEmitter_.prototype.on = function (eventName, listner) { };
    return EventEmitter_;
}());
exports.EventEmitter_ = EventEmitter_;
//
var EventEmitterScaffold = /** @class */ (function () {
    function EventEmitterScaffold() {
        this.eventListners = {};
    }
    EventEmitterScaffold.prototype.on = function (eventName, listner) { };
    EventEmitterScaffold.prototype.emit = function (eventName, payLoad) { };
    return EventEmitterScaffold;
}());
//
var EventEmitterNonGeneric2 = /** @class */ (function () {
    function EventEmitterNonGeneric2() {
        this.eventListners = {};
    }
    EventEmitterNonGeneric2.prototype.on = function (eventName, listner) { };
    EventEmitterNonGeneric2.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return EventEmitterNonGeneric2;
}());

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winStats = exports.AutoScroller = void 0;
var AutoScroller = /** @class */ (function () {
    //
    function AutoScroller(element) {
        this._isRunning = false;
        this._someElement = null;
        this._observer = null;
        this._start = 0;
        this._end = 0;
        this._change = 0;
        this._elapsedTime = 0;
        this._increment = 20; // how smooth the scroll  i.e. scrollTop + increment
        this._duration = 900; // how many milliseconds you want to scroll to last
        this._someElement = element;
        this._start = this._someElement.scrollTop;
        this._end = this._someElement.scrollHeight;
        this._change = this._end - this._start;
        this._increment = 20; // og 20 
        this._duration = 900; // og 900 
    }
    AutoScroller.prototype.startObserving = function () {
        if (this._isRunning)
            return;
        this._observer = new MutationObserver(this.onMutation.bind(this)); // Create an observer instance linked to the callback function
        var config = { attributes: true, childList: true, subtree: true }; // Options for the observer (which mutations to observe)
        this._observer.observe(this._someElement, config); // Start observing targetNode for config mutations
        this._isRunning = true;
    };
    AutoScroller.prototype.stopObserving = function () {
        if (this._observer)
            this._observer.disconnect(); // Later, you can stop observing
        this._isRunning = false;
    };
    AutoScroller.prototype.onMutation = function (mutationList, observer) {
        for (var _i = 0, mutationList_1 = mutationList; _i < mutationList_1.length; _i++) {
            var mutation = mutationList_1[_i];
            if (mutation.type === "childList") {
                if (mutation.addedNodes.length) {
                    /*   console.log(`
                      observer      ${mutation.addedNodes[0]} childNode added...
                      scrollHeight [ ${mutation.addedNodes[0].scrollHeight} ]
                      scrollWidth  [ ${mutation.addedNodes[0].scrollWidth} ]
                      `); */
                }
                if (mutation.removedNodes.length) {
                    //     console.log(`observer ${mutation.removedNodes[0]} childNode removed...`,mutation.removedNodes[0]);
                }
                this.scrollToBottom(this._someElement);
            }
            else if (mutation.type === "attributes") {
                //   console.log(`${mutation.attributeName} attribute added/deletd.`);
            }
        }
    };
    //
    AutoScroller.prototype.scrollToBottom = function (someElement) {
        animateScroll(this._duration, someElement); // smooth scrolling
    };
    //
    AutoScroller.prototype.animateScroll = function (duration, someElement) {
        this.animate(0);
    };
    AutoScroller.prototype.animate = function (elapsedTime) {
        var _this = this;
        elapsedTime += this._increment;
        var position = this.easeInOut(elapsedTime, this._start, this._change, this._duration);
        this._someElement.scrollTop = position;
        if (elapsedTime < this._duration) {
            setTimeout(function () { _this.animate(_this._elapsedTime); }, this._increment);
        }
    };
    AutoScroller.prototype.easeInOut = function (currentTime, start, change, duration) {
        // by Robert Penner
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    };
    return AutoScroller;
}());
exports.AutoScroller = AutoScroller;
//
function animateScroll(duration, someElement) {
    var start = someElement.scrollTop;
    var end = someElement.scrollHeight;
    var change = end - start;
    var increment = 20; // og 20 
    function easeInOut(currentTime, start, change, duration) {
        // by Robert Penner
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
    function animate(elapsedTime) {
        elapsedTime += increment;
        var position = easeInOut(elapsedTime, start, change, duration);
        someElement.scrollTop = position;
        if (elapsedTime < duration) {
            setTimeout(function () { animate(elapsedTime); }, increment);
        }
    }
    animate(0);
}
//
function winStats() {
    console.log("\n    clientHeight ".concat(document.documentElement.clientHeight, " \n    clientWidth ").concat(document.documentElement.clientWidth, " \n    \n    scrollHeight ").concat(document.documentElement.scrollHeight, " \n    scrollWidth ").concat(document.documentElement.scrollWidth, " \n    \n    scrollTop ").concat(document.documentElement.scrollTop, " \n    scrollLeft ").concat(document.documentElement.scrollLeft, " \n    \n    window.innerHeight ").concat(window.innerHeight, " \n    window,innerWidth ").concat(window.innerWidth, " \n    \n    window.pageXOffset ").concat(window.pageXOffset, " \n    window.pageYOffset ").concat(window.pageYOffset, " \n    \n    "));
}
exports.winStats = winStats;

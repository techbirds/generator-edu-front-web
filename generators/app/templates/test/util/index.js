/* global Promise */

define([
    './nej-lodash/index.js'
], function (_) {
    function regularComponentEventEmissionWrapper(componentInstance, eventName, handler, done) {
        if (!componentInstance) {
            return;
        }

        componentInstance.$on(eventName, function (event) {
            handler(event);
            componentInstance.$off(eventName);
            done();
        });
    }

    /**
     * Create a div in the <body> tag, generate a random id for it and return the id
     * 
     * @returns {string} The id of the div
     */
    function createDiv() {
        var compDiv = document.createElement("div");
        var randomId = `${Math.random().toString().replace("0.", "")}-${Math.random().toString().replace("0.", "")}`;
        compDiv.id = `rand-id-${randomId}`;
        document.body.appendChild(compDiv);

        return compDiv.id;
    }

    /**
     * Clean up a div with an id
     * 
     * @param {any} id 
     */
    function cleanUpDiv(id) {
        var node = document.getElementById(id);

        node.parentNode.removeChild(node);
    }

    function mountComponent(Ctor, options) {
        let divId;

        divId = createDiv();

        return {
            cleanUp: function () {
                cleanUpDiv(divId);
            },
            component: new Ctor(options).$inject(`#${divId}`),
            id: divId
        };
    }

    /**
     * Make a for loop with asynchronous function call in it synchronous
     * 
     * @param {any} start Loop start index; Inclusive
     * @param {any} end Loop end index; Exclusive
     * @param {any} asyncFn The async function call. It takes the index and a promise resolve callback as arguments
     * @param {any} finishCb The function to call when the loop is finished
     */
    async function asyncLoop(start, end, asyncFn, finishCb) {
        for (let i = start; i < end; i++) {
            await new Promise(resolve => {
                asyncFn(i, resolve);
            });
        }

        finishCb();
    }

    function waitFor(selector, timeout, cond) {
        let cnt = 0;

        return new Promise(resolve => {
            var checkingInterval = setInterval(() => {
                cnt++;

                if (cond(document.querySelector(selector))) {
                    resolve();
                    clearInterval(checkingInterval);
                } else if (cnt > timeout) {
                    resolve();
                    clearInterval(checkingInterval);
                }
            }, 1);
        });
    }

    /**
     * Wait for an element to be on the HTML (not necessarily visible) or to be gone
     * 
     * @param {any} selector 
     * @param {any} timeout 
     * @param {any} toShow Wait for element to show or to be gone
     * @param {any} cb A callback to be called after the element is selected. It takes the element as arguments
     */
    async function waitForElement(selector, timeout, cb, toShow) {
        toShow = typeof toShow === 'undefined' ? true : !!toShow;
        let cond = toShow ? (v) => v : (v) => !v;

        await waitFor(selector, timeout, cond);

        cb(document.querySelector(selector));
    }

    /**
     * Wait for an element to be on the HTML (not necessarily visible) or to be gone
     * 
     * @param {any} selector 
     * @param {any} timeout 
     * @param {any} toShow Wait for element to show or to be gone
     * @param {any} cb A callback to be called after the element is selected. It takes the element as arguments
     */
    async function waitForElements(selector, timeout, cb, toShow) {
        toShow = typeof toShow === 'undefined' ? true : !!toShow;
        let cond = toShow ? (v) => v : (v) => !v;

        await waitFor(selector, timeout, cond);

        cb(document.querySelectorAll(selector));
    }

    /**
     * Split a cookie string and set it to the browser
     * 
     * @param {any} cookieStr A cookie string containing key-value pairs which are separated by semi-colons
     */
    function setCookies(cookieStr) {
        cookieStr.split('; ').forEach(c => document.cookie = c);
    }

    /**
     * Clamp a value and make it fall within a range. Min and max are both inclusive
     * 
     * @param {any} val 
     * @param {any} min 
     * @param {any} max 
     * @returns 
     */
    function clamp(val, min, max) {
        return val < min ? min : val > max ? max : val;
    }

    /**
     * Return a random number. Min and max are both inclusive
     * 
     * @param {any} min 
     * @param {any} max 
     * @returns 
     */
    function _random(min, max) {
        return clamp(min + Math.random() * (max - min + 1));
    }

    const Random = {
        /**
         * Return a random integer. Min and max are both inclusive
         * 
         * @param {any} min 
         * @param {any} max 
         * @returns 
         */
        randomInt: function (min, max) {
            return Math.floor(_random(min, max));
        },
        /**
         * Return a random float. Min and max are both inclusive
         * 
         * @param {any} min 
         * @param {any} max 
         * @returns 
         */
        randomFloat: function(min, max, precision) {
            return parseFloat(_random(min, max).toFixed(precision));
        },
        randomString: function (min, max, base = "Test") {
            return base.repeat(this.randomInt(min, max));
        },
        randomElement: function (arr) {
            return arr[this.randomInt(0, arr.length - 1)];
        }
    };

    function regularComponentEventChecker(comp, eventName, expectedEventObject, expect, done, maxTimeout = 3000) {
        if (!comp || !eventName || !expectedEventObject) {
            return;
        }
        var emitted = false;

        comp.$on(eventName, function (event) {
            var res = true;

            for (const prop in expectedEventObject) {
                if (expectedEventObject.hasOwnProperty(prop)) {
                    if (!_.isEqual(event[prop], expectedEventObject[prop])) {
                        console.log(event[prop], expectedEventObject[prop])
                        res = false;
                        break;
                    }
                }
            }
            comp.$off(eventName);

            expect(res).to.be.true;
            emitted = true;
            done();
        });

        setTimeout(function() {
            expect(emitted).to.be.true;

            if (!emitted) {
                done()
            }
        }, maxTimeout);
    }

    return {
        createDiv,
        cleanUpDiv,
        mountComponent,
        asyncLoop,
        waitForElement,
        waitForElements,
        setCookies,
        clamp,
        Random,
        regularComponentEventEmissionWrapper,
        regularComponentEventChecker
    };
});

import { $, DOM } from '../DOM.js';

/**
 * @fileOverview DOM Plugin for FX
 * @module domPlugin
 */

/**
 * DOM Plugin for FX
 * @type {FXPlugin}
 */
const domPlugin = {
    name: "dom",
    types: ["base"],
    /**
     * Initializes the DOM plugin, adding the $ property to the Dynamic Object.
     * @param {DynamicObject} dynamicObject - The Dynamic Object to extend.
     */
    init: function (dynamicObject) {
        /**
         * Selects DOM elements and wraps them in Dynamic Objects.
         * @param {string} selector - The CSS selector to use.
         * @returns {DynamicObject} A Dynamic Object wrapping the selected element(s).
         */
        dynamicObject.$ = (selector) => {
            const dom = new DOM(selector);
            const elements = dom.elements;
            
            if (!elements) {
                return null;
            }

            const createDynamicObject = (element) => {
                const name = element.getAttribute('name') || element.tagName.toLowerCase();
                const dynamicElement = {
                    value: element,
                    nodes: {},
                    type: "dom",
                    $: dynamicObject.$,
                };
                
                // Apply lit plugin if available
                if (dynamicObject.lit) {
                    dynamicElement.lit = dynamicObject.lit;
                }
                
                return dynamicElement;
            };

            let dynamicObjectResult;

            if (elements instanceof NodeList || Array.isArray(elements)) {
                if (elements.length === 1) {
                    dynamicObjectResult = createDynamicObject(elements[0]);
                } else {
                    dynamicObjectResult = Array.from(elements).map(createDynamicObject);
                }
            } else if (elements instanceof Element) {
                 dynamicObjectResult = createDynamicObject(elements);
            } else {
                return null;
            }

            if (dynamicObject.nodes === undefined) {
                dynamicObject.nodes = {};
            }

            if (Array.isArray(dynamicObjectResult)) {
                dynamicObjectResult.forEach(dynamicElement => {
                    const name = dynamicElement.value.getAttribute('name') || dynamicElement.value.tagName.toLowerCase();
                     if (dynamicObject.nodes[name]) {
                        if (!Array.isArray(dynamicObject.nodes[name])) {
                            dynamicObject.nodes[name] = [dynamicObject.nodes[name]];
                        }
                        dynamicObject.nodes[name].push(dynamicElement);
                    } else {
                        dynamicObject.nodes[name] = dynamicElement;
                    }
                });
            } else if (dynamicObjectResult) {
                const name = dynamicObjectResult.value.getAttribute('name') || dynamicObjectResult.value.tagName.toLowerCase();
                dynamicObject.nodes[name] = dynamicObjectResult;
            }
            
            return dynamicObjectResult;
        };
    },
};

export default domPlugin;

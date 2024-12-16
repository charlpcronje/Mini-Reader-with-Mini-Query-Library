# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./src/env.js                         | 14       | 37       | 49        |
|  2    | ./src/fx/FX.js                       | 183      | 673      | 1108      |
|  3    | ./src/fx/DOM.js                      | 228      | 655      | 1162      |
|  4    | ./src/fx/plugins/litPlugin.js        | 97       | 275      | 478       |
|  5    | ./src/fx/plugins/domPlugin.js        | 91       | 261      | 459       |
|       | Total                                | 613      | 1901     | 3256      |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 613
- Total Words: 1901
- Total AI Tokens: 3256

## File: src/env.js
```js
// ./env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };

```

## File: src/fx/FX.js
```js
/**
 * @fileoverview This file contains the implementation of the FX class,
 * which provides a dynamic object creation system with plugin support.
 */

import litPlugin from "@fx/plugins/litPlugin.js";
import domPlugin from "@fx/plugins/domPlugin.js";

/**
 * Represents the core of the dynamic object system.
 * @class
 */
class FX {
    /**
     * @type {FX}
     */
    static instance = null;

    /**
     * @returns {FX}
     */
    static getInstance() {
        if (!FX.instance) {
            FX.instance = new FX();
        }
        return FX.instance;
    }

    constructor() {
        /**
         * @type {Object<string, {name: string, types: string[], init: function}>}
         */
        this.plugins = {};
        this.root = this.createDynamicObject();
        this.registerPlugin(litPlugin);
        this.registerPlugin(domPlugin);
    }

    /**
     * Registers a plugin to extend the functionality of dynamic objects.
     * @param {{name: string, types: string[], init: function}} plugin - The plugin to register.
     */
    registerPlugin(plugin) {
        if (!plugin || !plugin.name || !plugin.init || !plugin.types) {
            console.error("Invalid plugin format:", plugin);
            return;
        }
        this.plugins[plugin.name] = plugin;
    }

    /**
     * Creates a new dynamic object with default properties and applies registered plugins.
     * @param {string} type - The type of the dynamic object.
     * @returns {Proxy} - The wrapped dynamic object.
     */
    createDynamicObject(type = "base") {
        const core = {
            value: null,
            type: type,
            proxy: null,
            nodes: {},
            onCreate: [],
            onReady: [],
            val: function (value) {
                if (value !== undefined) {
                    this.value = value;
                }
                return this.value;
            }
        };

        // Apply plugins
        for (const pluginName in this.plugins) {
            const plugin = this.plugins[pluginName];
            if (plugin.types.includes(type)) {
                plugin.init(core);
            }
        }

        // Execute onCreate lifecycle hooks
        core.onCreate.forEach((hook) => hook(core));

        const proxy = new Proxy(core, {
            get: (target, prop) => {
                if (prop === "value") {
                    return target.value;
                }
                if (!(prop in target)) {
                    // Dynamically initialize properties if they do not exist
                    target[prop] = this.createDynamicObject();
                    target.nodes[prop] = target[prop];
                }
                return target[prop];
            },
            set: (target, prop, value) => {
                if (prop === "value") {
                    target.value = value;
                    return true;
                }
                if (typeof value === "object" && value !== null && !(value instanceof FX)) {
                    // If value is an object literal, add its properties to the dynamic object's value
                    if (!target[prop].value) {
                        target[prop].value = {};
                    }
                    for (const key in value) {
                        target[prop].value[key] = value[key];
                    }
                    target.nodes[prop] = target[prop];
                } else {
                    // If value is not an object literal, set it to the value property
                    target[prop] = value;
                    target.nodes[prop] = target[prop];
                }
                return true;
            },
        });

        core.proxy = proxy;

        // Execute onReady lifecycle hooks
        core.onReady.forEach((hook) => hook(core));

        return proxy;
    }

    /**
     * Resolves a path to a dynamic object, creating intermediate objects if necessary.
     * @param {string} path - The path to resolve.
     * @returns {Proxy} - The dynamic object at the specified path.
     */
    resolvePath(path) {
        let current = this.root;
        const parts = path.split(".");
        for (const part of parts) {
            if (!current[part]) {
                current[part] = this.createDynamicObject();
            }
            current = current[part];
        }
        return current;
    }

    /**
     * Sets a value at a specified path.
     * @param {string} path - The path to set the value at.
     * @param {*} value - The value to set.
     */
    set(path, value) {
        const target = this.resolvePath(path);
        if (typeof value === "object" && value !== null && !(value instanceof FX)) {
            // If value is an object literal, add its properties to the dynamic object's value
            if (!target.value) {
                target.value = {};
            }
            for (const key in value) {
                target.value[key] = value[key];
            }
        } else {
            // If value is not an object literal, set it to the value property
            target.value = value;
        }
    }

    /**
     * Gets or sets the value of a dynamic object at a specified path.
     * @param {string} path - The path to get or set the value at.
     * @param {*} value - The value to set (optional).
     * @param {*} defaultValue - The default value to return if the value is not set (optional).
     * @returns {*} - The value at the specified path.
     */
    val(path, value, defaultValue) {
        const target = this.resolvePath(path);
        if (value !== undefined) {
            target.value = value;
        }
        return target.value !== null ? target.value : defaultValue;
    }
}

const fx = FX.getInstance();
export { fx as 🟥 };
export default fx;

```

## File: src/fx/DOM.js
```js
import { env } from '@src/env.js';
console.log(env);
/**
 * Default AJAX configuration
 */
const defaultLoadConfig = {
    base: env.APP_HOST,
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
};
let loadConfig = { ...defaultLoadConfig };
/**
 * DOM class for DOM manipulation and AJAX
 */
class DOM {
    constructor(selector) {
        if (!selector) {
            throw new Error('Invalid selector: Selector cannot be null or undefined');
        }
        this.elements =
            typeof selector === 'string'
                ? document.querySelectorAll(selector)
                : selector;
    }
    val(value) {
        if (value === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.value || '';
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                const firstElement = this.elements[0];
                if (firstElement instanceof HTMLInputElement) {
                    return firstElement.value || '';
                }
            }
            return '';
        }
        this.forEachElement(el => {
            if (el instanceof HTMLInputElement) {
                el.value = value;
            }
        });
        return this;
    }

    html(content) {
        if (content === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.innerHTML || '';
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                const firstElement = this.elements[0];
                return firstElement ? firstElement.innerHTML || '' : '';
            }
            return '';
        }
        this.forEachElement(el => {
            el.innerHTML = content;
        });
        return this;
    }
    
    
    css(property, value) {
        if (typeof property === 'string' && value === undefined) {
            // Get a CSS property
            if (this.elements instanceof Element) {
                const computedStyle = getComputedStyle(this.elements);
                return computedStyle.getPropertyValue(property) || ''; // Fallback to empty string
            }
            if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
                // Get CSS for the first element in the collection
                const firstElement = this.elements[0];
                if (firstElement instanceof Element) {
                    const computedStyle = getComputedStyle(firstElement);
                    return computedStyle.getPropertyValue(property) || ''; // Fallback to empty string
                }
            }
            throw new Error("Cannot retrieve CSS property for the selected elements");
        }
        if (typeof property === 'string' && value !== undefined) {
            // Set a single CSS property
            this.forEachElement(el => {
                if (el instanceof HTMLElement) {
                    el.style.setProperty(property, value);
                }
            });
            return this;
        }
        if (typeof property === 'object') {
            // Set multiple CSS properties
            this.forEachElement(el => {
                if (el instanceof HTMLElement) {
                    for (const key in property) {
                        if (Object.prototype.hasOwnProperty.call(property, key)) {
                            el.style.setProperty(key, property[key]);
                        }
                    }
                }
            });
            return this;
        }
        throw new Error("Invalid arguments for css()");
    }
    
    
    on(event, callback) {
        this.forEachElement(el => el.addEventListener(event, callback));
        return this;
    }
    click(callback) {
        return this.on('click', callback);
    }
    change(callback) {
        return this.on('change', callback);
    }
    mouseover(callback) {
        return this.on('mouseover', callback);
    }
    mousedown(callback) {
        return this.on('mousedown', callback);
    }
    mouseup(callback) {
        return this.on('mouseup', callback);
    }
    forEachElement(callback) {
        if (this.elements instanceof Element) {
            callback(this.elements);
        }
        else if (this.elements instanceof NodeList || Array.isArray(this.elements)) {
            this.elements.forEach(el => callback(el));
        }
    }
}

/**
 * Factory function for creating a DOM instance
 */
function $(selector) {
    return new DOM(selector);
}

/**
 * Configure default settings for AJAX
 */
$.loadSetup = (config) => {
    console.log(".loadSetup: config:", config);
    const validKeys = Object.keys(defaultLoadConfig);
    const filteredConfig = Object.keys(config)
        .filter(key => validKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = config[key];
            return obj;
        }, {});
    loadConfig = { ...loadConfig, ...filteredConfig }; // Merge only valid keys
};

/**
 * Retrieve current AJAX load configuration
 */
$.loadConfig = () => {
    return loadConfig;
};

/**
 * Perform AJAX requests with configurable settings
 */
$.load = async (config) => {
    const settings = { ...loadConfig, ...config };
    const headers = { 'Content-Type': settings.contentType };
    const options = {
        method: settings.type,
        headers,
        body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), settings.timeout);
    options.signal = controller.signal;
    if (settings.beforeSend)
        settings.beforeSend();
    try {
        const response = await fetch(`${settings.base}${settings.url}`, options);
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let result;
        switch (settings.dataType) {
            case 'json':
                result = await response.json();
                break;
            case 'xml':
                result = new DOMParser().parseFromString(await response.text(), 'application/xml');
                break;
            case 'html':
            case 'text':
                result = await response.text();
                break;
            case 'script':
                result = await response.text().then(eval);
                break;
            default:
                result = await response.text();
        }
        if (settings.done)
            settings.done(result);
        return result;
    }
    catch (error) {
        if (settings.fail)
            settings.fail(error);
        throw error;
    }
    finally {
        if (settings.complete)
            settings.complete();
        if (settings.always)
            settings.always();
    }
};
window.$ = $;
export { $, DOM };


```

## File: src/fx/plugins/litPlugin.js
```js
/**
 * @file src/fx/plugins/litPlugin.js
 * @alias @fx/plugins/litPlugin/js 
 * @fileoverview This file contains the implementation of the lit plugin for Systemic.
 */

/**
 * @typedef {Object} LitPlugin
 * @property {string} name - The name of the plugin.
 * @property {string[]} types - The types of dynamic objects this plugin applies to.
 * @property {function} apply - The function that applies the plugin to a dynamic object.
 */

/**
 * Creates a LitElement-like interface for dynamic objects.
 * @type {LitPlugin}
 */
const litPlugin = {
    name: "lit",
    types: ["dom"],
    apply: (core) => {
        /**
         * @type {HTMLElement}
         */
        let element = null;
        core.lit = {
            /**
             * @type {Object<string, any>}
             */
            properties: {},
            /**
             * @type {function}
             */
            render: () => { },
            /**
             * @type {function}
             */
            connectedCallback: () => { },
            /**
             * @type {function}
             */
            disconnectedCallback: () => { },
            /**
             * @type {function}
             */
            attributeChangedCallback: () => { },
            /**
             * @param {string} name
             * @param {any} value
             */
            setProperty: (name, value) => {
                core.lit.properties[name] = value;
                if (element) {
                    core.lit.requestUpdate();
                }
            },
            /**
             * @returns {HTMLElement}
             */
            getElement: () => {
                return element;
            },
            /**
             * @param {HTMLElement} el
             */
            setElement: (el) => {
                element = el;
            },
            /**
             * Requests an update to the component.
             */
            requestUpdate: () => {
                if (element) {
                    // Call render and update the element
                    const template = core.lit.render();
                    if (template) {
                        element.innerHTML = template;
                    }
                }
            },
        };
        core.onCreate.push((core) => {
            core.lit.connectedCallback = () => {
                core.lit.requestUpdate();
            };
            core.lit.disconnectedCallback = () => {
                // Clean up if needed
            };
            core.lit.attributeChangedCallback = (name, oldValue, newValue) => {
                core.lit.setProperty(name, newValue);
            };
        });
    },
};

export default litPlugin;

```

## File: src/fx/plugins/domPlugin.js
```js
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

```



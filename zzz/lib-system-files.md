# File Analysis Report

This document contains an analysis of the project files.

| No.   | File                                 | Lines    | Words    | AI Tokens |
| ----- | ------------------------------------ | -------- | -------- | --------- |
|  1    | ./src/env.js                         | 15       | 39       | 53        |
|  2    | ./src/fx/FX.js                       | 281      | 1293     | 1956      |
|  3    | ./src/fx/DOM.js                      | 227      | 652      | 1157      |
|  4    | ./src/fx/boot.js                     | 203      | 783      | 1497      |
|  5    | ./src/fx/plugins/litPlugin.js        | 98       | 290      | 497       |
|  6    | ./src/fx/plugins/domPlugin.js        | 91       | 261      | 459       |
|       | Total                                | 915      | 3318     | 5619      |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 915
- Total Words: 3318
- Total AI Tokens: 5619

## File: src/env.js
```js
// ./env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80,
    STORAGE_KEY: 'mini-reader-storage'
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };

```

## File: src/fx/FX.js
```js

// /src/FX.js

/**
 * A simplified FX class that supports:
 *  1. Dynamic object creation via Proxies
 *  2. Recursive decomposition of plain objects
 *  3. .val(), .get(), and .set() methods on each node
 *  4. Plugin architecture
 *  5. A usage function $(path) => dynamic object
 *
 * Updates:
 *  - We are honoring the .nodes property for child nodes. 
 *  - We no longer clear out child nodes when setting .value directly, so a node can hold both .value and .nodes.
 *  - resolvePath(path) now explicitly navigates via .nodes for each path segment, ensuring the dynamic object structure remains consistent.
 *
 * Note:
 *  - Each node is represented by a 'core' object that has { value, nodes } plus .val(), .get(), .set() methods.
 *  - The Proxy traps handle direct property access, lazy creation, and merges with .nodes.
 */

export function $(path) {
    return FX.getInstance().resolvePath(path);
}

class FX {
    static instance = null;

    /**
     * Returns the singleton FX instance, creating it if necessary.
     * @returns {FX} The FX singleton instance.
     */
    static getInstance() {
        if (!FX.instance) {
            FX.instance = new FX();
        }
        return FX.instance;
    }

    /**
     * FX constructor. Maintains a plugin registry and a root dynamic object (Proxy).
     */
    constructor() {
        if (FX.instance) {
            return FX.instance;
        }
        FX.instance = this;
        /**
         * Stores registered plugins, keyed by plugin name.
         * Plugin format: { name: string, types: string[], init: function(coreObject) }
         */
        this.plugins = {};

        /**
         * The root dynamic object. Everything is resolved from this root.
         */
        this.root = this.createDynamicObject();
    }

    /**
     * Registers a plugin to enhance dynamic objects.
     * @param {{name: string, types: string[], init: function}} plugin - Plugin to register.
     */
    registerPlugin(plugin) {
        if (!plugin || !plugin.name || !plugin.init || !plugin.types) {
            console.error("Invalid plugin format:", plugin);
            return;
        }
        this.plugins[plugin.name] = plugin;
    }

    /**
     * Creates a new dynamic object (wrapped in a Proxy).
     *  - Recursively applies any relevant plugins based on 'type'.
     *  - Provides .val(), .get(), and .set() methods on the core object.
     * @param {string} type - The type of dynamic object (defaults to "base").
     * @returns {Proxy} A proxy-wrapped dynamic object.
     */
    createDynamicObject(type = "base") {
        const self = this;

        // The internal (core) object for the dynamic node
        const core = {
            type,
            value: null,

            /**
             * A place to store child dynamic objects. This is crucial for hierarchical access.
             * e.g. node.nodes['someProp'] => child dynamic object
             */
            nodes: {},

            /**
             * Sets or gets the node's value.
             * If called with no arguments, returns this node's current value.
             * If called with an argument, sets the node's value (recursively decomposing if plain object).
             * @param {*} newVal - Optional new value.
             * @returns {*} - The current value if no arguments, otherwise the new value just set.
             */
            val(newVal) {
                if (arguments.length === 0) {
                    return this.value;
                }
                this.set(newVal);
                return this.value;
            },

            /**
             * .set() has multiple signatures:
             *  1) .set(key, value): treat 'key' as a property name and 'value' as the new value for that child node
             *  2) .set(plainObject): recursively decompose the entire object into child nodes
             *  3) .set(primitiveOrClass): store directly in this node's .value (without deleting child nodes).
             *
             * @param {*} arg1 - A plain object, a primitive, a class instance, or a string key for a child node.
             * @param {*} [arg2] - If arg1 is a string, arg2 is the new value for the child node at 'arg1'.
             * @returns {Proxy} The current node (for chaining).
             */
            set(arg1, arg2) {
                // CASE 1: .set(key, value)
                if (typeof arg1 === 'string' && arguments.length === 2) {
                    const childKey = arg1;
                    const childValue = arg2;
                    if (!this.nodes[childKey]) {
                        this.nodes[childKey] = self.createDynamicObject();
                    }
                    this.nodes[childKey].set(childValue);
                    return this;
                }

                // CASE 2: .set(plainObject)
                if (self.isPlainObject(arg1)) {
                    // Instead of clearing out nodes entirely, we can augment or overwrite child keys as needed
                    const obj = arg1;
                    for (const key in obj) {
                        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
                        if (!this.nodes[key]) {
                            this.nodes[key] = self.createDynamicObject();
                        }
                        this.nodes[key].set(obj[key]);
                    }
                    // The node itself can keep .value as is, or you might choose to null it if you want a pure container
                    return this;
                }

                // CASE 3: .set(primitiveOrClass)
                // If it's neither (key,val) nor a plain object, just store directly in .value
                // Keep existing child nodes in place (no deletion), so a node can have a direct value AND sub-nodes
                this.value = arg1;
                return this;
            },

            /**
             * Retrieves a child dynamic object by relative path from the current node (via .nodes).
             * If the path is empty or not provided, returns the current node.
             * If the path doesn't exist, returns defaultValue or undefined.
             *
             * @param {string} [path] - Relative dot-delimited path from the current node.
             * @param {*} [defaultValue] - If the path is not found, return this defaultValue instead of undefined.
             * @returns {Proxy|undefined} The resolved dynamic node or defaultValue if not found.
             */
            get(path, defaultValue) {
                if (!path) {
                    return this; // If no path, return the current node
                }
                const parts = path.split(".");
                let current = this;
                for (let i = 0; i < parts.length; i++) {
                    const key = parts[i];
                    if (!current.nodes[key]) {
                        return defaultValue !== undefined ? defaultValue : undefined;
                    }
                    current = current.nodes[key];
                }
                return current;
            }
        };

        // Apply relevant plugins
        for (const pluginName in this.plugins) {
            const plugin = this.plugins[pluginName];
            if (plugin.types.includes(type)) {
                plugin.init(core);
            }
        }

        // Return a proxy that intercepts property access and assignment
        return new Proxy(core, {
            get(target, prop) {
                // Direct hits on the core object (e.g. .val, .set, .get, .value, .nodes, .type)
                if (prop in target) {
                    return target[prop];
                }

                // Check if there's a child node in .nodes
                if (target.nodes && prop in target.nodes) {
                    const childNode = target.nodes[prop];
                    // If the child node has a non-null .value, direct property access returns that
                    if (childNode.value !== null) {
                        return childNode.value;
                    }
                    // If child node has further children, return the child node (dynamic proxy)
                    if (Object.keys(childNode.nodes).length > 0) {
                        return childNode;
                    }
                    // Otherwise, return null
                    return null;
                }

                // If none of the above, handle the “direct reference to the node itself”
                // If the node has .value, return that
                if (target.value !== null) {
                    return target.value;
                } else if (target.nodes && Object.keys(target.nodes).length > 0) {
                    return target; // Return the proxy so user can navigate further
                }
                // If there's nothing, return null
                return null;
            },
            set(target, prop, value) {
                // If setting 'value' directly, store it
                if (prop === "value") {
                    target.value = value;
                    // We do NOT clear child nodes. The node can hold both .value and .nodes simultaneously.
                    return true;
                }

                // For other properties, treat them as children in .nodes
                if (!target.nodes[prop]) {
                    target.nodes[prop] = self.createDynamicObject();
                }
                target.nodes[prop].set(value);
                return true;
            }
        });
    }

    /**
     * Resolves a path from the root dynamic object by navigating the .nodes structure.
     * If the path doesn't exist, it will lazily create it.
     * @param {string} path - Dot-delimited path.
     * @returns {Proxy} The resolved dynamic node (dynamic Proxy).
     */
    resolvePath(path) {
        if (!path) {
            return this.root; // If no path, return the root node
        }
        const parts = path.split(".");
        let current = this.root;
        for (let i = 0; i < parts.length; i++) {
            const prop = parts[i];
            // We navigate via the .nodes property
            if (!current.nodes[prop]) {
                // lazily create a new dynamic object at this node
                current.nodes[prop] = this.createDynamicObject();
            }
            current = current.nodes[prop];
        }
        return current;
    }

    /**
     * Checks if a value is a plain object.
     * @param {*} value - The value to check.
     * @returns {boolean} True if plain object, false otherwise.
     */
    isPlainObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            value.constructor === Object
        );
    }
}


const fx = function (path) {
    return FX.getInstance().resolvePath(path);
}

export { FX, fx };

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
export { $, DOM };


```

## File: src/fx/boot.js
```js
// /src/factory.js
import '@fx/FX.js';
import "@fx/DOM.js";
import { DOM } from '@fx/DOM.js';
import { FX, fx } from '@fx/FX.js';

/***  
** Syncing Components
***/
import { AudioFx } from "@fx/html/sync/audio-fx.js";
import { PageFx } from "@fx/html/sync/page-fx.js";
import { SectionFx } from "@fx/html/sync/section-fx.js";
import { RowFx } from "@fx/html/sync/row-fx.js";
import { ColFx } from "@fx/html/sync/col-fx.js";
import { TextFx } from "@fx/html/sync/text-fx.js";
import { HeadingFx } from "@fx/html/sync/heading-fx.js";
import { ImageFx } from "@fx/html/sync/image-fx.js?test";
import { LinkFx } from "@fx/html/sync/link-fx.js";
import { VideoFx } from "@fx/html/sync/video-fx.js";

/***  
** Form Components
***/
import { VideoFx } from "@fx/html/forms/input-fx.js";


/***  
** UI Components
***/
import { VideoFx } from "@fx/html/ui/panel-fx.js";

// Array of valid HTML tags for DOM element detection
const HTML_TAGS = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
    'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
    'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
    'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
    'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress',
    'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table',
    'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
    'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
];

// Regex to detect custom HTML elements (contain a hyphen "-")
const CUSTOM_ELEMENT_REGEX = /^[a-z]+-[a-z0-9-]+$/;

// Default AJAX configuration
const defaultLoadConfig = {
    base: '',
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
};

let loadConfig = { ...defaultLoadConfig };

/**
 * Unified factory function for DOM and FX functionality.
 * @param {string | Element | NodeList | Array} selector - The selector or path.
 * @returns {DOM | Proxy} - A DOM instance or FX dynamic object.
 */
function $(selector) {
    // If it's a string, decide between DOM or FX
    if (typeof selector === 'string') {
        const tagName = selector.split(/[\s#\.\[]/)[0]; // Extract tag name

        // Match against HTML_TAGS or custom element regex
        if (
            HTML_TAGS.includes(tagName) || // Standard HTML tag
            CUSTOM_ELEMENT_REGEX.test(tagName) || // Custom element
            /^[#\.]/.test(selector) // Starts with # or .
        ) {
            return new DOM(selector); // Handle as DOM instance
        }
        // Otherwise, treat as FX path
        return fx(selector);
    }

    // If it's already a DOM object (Element/NodeList/Array), wrap in DOM
    if (selector instanceof Element || selector instanceof NodeList || Array.isArray(selector)) {
        return new DOM(selector);
    }

    // Fallback: invalid input
    throw new Error('Invalid selector or path for $()');
}

// Expose explicit FX and DOM usage for clarity
$.fx = fx;
$.dom = (selector) => new DOM(selector);

// Register a DOM plugin for FX to add DOM-like methods
FX.getInstance().registerPlugin({
    name: 'DOMPlugin',
    types: ['base'], // Apply to all FX nodes
    init(node) {
        if (node.value instanceof Element) {
            // Enhance FX nodes with DOM-like methods
            node.html = (content) => {
                if (content === undefined) {
                    return node.value.innerHTML;
                }
                node.value.innerHTML = content;
                return node;
            };
            node.css = (property, value) => {
                if (value === undefined) {
                    return getComputedStyle(node.value).getPropertyValue(property);
                }
                node.value.style.setProperty(property, value);
                return node;
            };
            node.on = (event, callback) => {
                node.value.addEventListener(event, callback);
                return node;
            };
        }
    },
});

/**
 * Configure default settings for AJAX
 * @param {object} config - Partial or complete load configuration.
 */
$.loadSetup = (config) => {
    const validKeys = Object.keys(defaultLoadConfig);
    const filteredConfig = Object.keys(config)
        .filter((key) => validKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = config[key];
            return obj;
        }, {});
    loadConfig = { ...loadConfig, ...filteredConfig }; // Merge only valid keys
};

/**
 * Retrieve current AJAX load configuration
 * @returns {object} The current load configuration.
 */
$.loadConfig = () => loadConfig;

/**
 * Perform AJAX requests with configurable settings
 * @param {object} config - Configuration for the AJAX request.
 * @returns {Promise<*>} The result of the AJAX call.
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

    if (settings.beforeSend) settings.beforeSend();

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
        if (settings.done) settings.done(result);
        return result;
    } catch (error) {
        if (settings.fail) settings.fail(error);
        throw error;
    } finally {
        if (settings.complete) settings.complete();
    }
};
window.$ = $;
export { $ };

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
 * @property {function} init - The function that initializes the plugin on a dynamic object.
 * @property {function} apply - The function that applies the plugin to a dynamic object.
 */

/**
 * Creates a LitElement-like interface for dynamic objects.
 * @type {LitPlugin}
 */
const litPlugin = {
    name: "lit",
    types: ["dom"],
    init: (core) => {
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



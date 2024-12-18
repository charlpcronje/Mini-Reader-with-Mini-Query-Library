// /src/factory.js
import '@fx/FX.js';
import "@fx/DOM.js";
import { DOM } from '@fx/DOM.js';
import { FX, fx } from '@fx/FX.js';

import { AudioFx } from "@fx/lit/audio-fx.js";
import { PageFx } from "@fx/lit/page-fx.js";
import { SectionFx } from "@fx/lit/section-fx.js";
import { RowFx } from "@fx/lit/row-fx.js";
import { ColFx } from "@fx/lit/col-fx.js";

import { TextFx } from "@fx/lit/text-fx.js";
import { HeadingFx } from "@fx/lit/heading-fx.js";
import { ImageFx } from "@fx/lit/image-fx.js?test";
import { LinkFx } from "@fx/lit/link-fx.js";
import { VideoFx } from "@fx/lit/video-fx.js";

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

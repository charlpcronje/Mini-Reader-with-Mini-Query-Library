console.log("hello");
import { env } from '../env.js';

console.log(env.APP_HOST);
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
 * MiniQuery class for DOM manipulation and AJAX
 */
class MiniQuery {
    constructor(selector) {
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
            return '';
        }
        this.forEachElement(el => {
            el.value = value;
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
            throw new Error("Cannot retrieve CSS property for multiple elements");
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
    html(content) {
        if (content === undefined) {
            if (this.elements instanceof Element) {
                return this.elements.innerHTML || '';
            }
            return '';
        }
        this.forEachElement(el => {
            el.innerHTML = content;
        });
        return this;
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
 * Factory function for creating a MiniQuery instance
 */
function $(selector) {
    return new MiniQuery(selector);
}
/**
 * Configure default settings for AJAX
 */
$.loadSetup = (config) => {
    loadConfig = { ...loadConfig, ...config };
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

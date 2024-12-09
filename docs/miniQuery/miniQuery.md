# MiniQuery(All JQuery Features)

JQuery is a JavaScript library that simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development. But I only need a few of its features. So I created a mini version of JQuery.

```js
// src/miniQuery.js
/**
 * miniQuery.js - A lightweight utility inspired by jQuery for modern JavaScript
 * Features: DOM Selection, Events, Value, Styles, and Fetch Utility
 */
(function (global) {
    const $ = function (selector) {
        const elements = typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : [selector];

        const api = {
            elements,

            // Get or set value
            val(value) {
                if (value === undefined) {
                    return elements[0]?.value || '';
                }
                elements.forEach(el => el.value = value);
                return this;
            },

            // Get or set styles
            css(property, value) {
                if (typeof property === 'string' && value === undefined) {
                    return getComputedStyle(elements[0])[property];
                } else if (typeof property === 'object') {
                    elements.forEach(el => {
                        for (let key in property) {
                            el.style[key] = property[key];
                        }
                    });
                } else {
                    elements.forEach(el => el.style[property] = value);
                }
                return this;
            },

            // Manipulate inner HTML
            html(content) {
                if (content === undefined) {
                    return elements[0]?.innerHTML || '';
                }
                elements.forEach(el => el.innerHTML = content);
                return this;
            },

            // Add event listeners
            on(event, callback) {
                elements.forEach(el => el.addEventListener(event, callback));
                return this;
            },

            // Shortcut events
            click(callback) { return this.on('click', callback); },
            change(callback) { return this.on('change', callback); },
            mouseover(callback) { return this.on('mouseover', callback); },
            mousedown(callback) { return this.on('mousedown', callback); },
            mouseup(callback) { return this.on('mouseup', callback); }
        };

        return api;
    };

    // Document ready
    $.ready = function (callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    // Fetch utility inspired by $.ajax
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

    $.loadSetup = function (config) {
        loadConfig = { ...loadConfig, ...config };
    };

    $.load = function (config) {
        const settings = { ...loadConfig, ...config };
        const headers = { 'Content-Type': settings.contentType };

        const options = {
            method: settings.type,
            headers,
            body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
        };

        let controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), settings.timeout);
        options.signal = controller.signal;

        const beforeSend = settings.beforeSend;
        const complete = settings.complete;

        if (beforeSend) beforeSend();

        return fetch(`${settings.base}${settings.url}`, options)
            .then(async response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                let result;
                switch (settings.dataType) {
                    case 'json': result = await response.json(); break;
                    case 'xml': result = await response.text().then(str => new DOMParser().parseFromString(str, "application/xml")); break;
                    case 'html': result = await response.text(); break;
                    case 'text': result = await response.text(); break;
                    case 'script': result = await response.text().then(eval); break;
                    default: result = await response.text();
                }
                if (settings.done) settings.done(result);
                return result;
            })
            .catch(error => {
                if (settings.fail) settings.fail(error);
                throw error;
            })
            .finally(() => {
                if (complete) complete();
                if (settings.always) settings.always();
            });
    };

    // Expose the library to the global scope
    global.$ = $;

})(window);
```

And a Type Safe version:

```ts
// src/miniQuery.ts
/**
 * miniQuery.ts - A lightweight utility inspired by jQuery with TypeScript type safety.
 */

type CSSProperty = Partial<CSSStyleDeclaration>;
type EventCallback = (event: Event) => void;

interface MiniQuery {
    elements: NodeListOf<Element>;
    val(value?: string): string | MiniQuery;
    css(property: string): string;
    css(property: CSSProperty): MiniQuery;
    css(property: string, value: string): MiniQuery;
    html(content?: string): string | MiniQuery;
    on(event: string, callback: EventCallback): MiniQuery;
    click(callback: EventCallback): MiniQuery;
    change(callback: EventCallback): MiniQuery;
    mouseover(callback: EventCallback): MiniQuery;
    mousedown(callback: EventCallback): MiniQuery;
    mouseup(callback: EventCallback): MiniQuery;
}

type LoadConfig = {
    base?: string;
    url?: string;
    type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    contentType?: 'application/json' | 'text/html' | 'text/plain';
    dataType?: 'json' | 'xml' | 'html' | 'text' | 'script' | 'jsonp';
    timeout?: number;
    data?: Record<string, unknown>;
    beforeSend?: () => void;
    complete?: () => void;
    done?: (response: unknown) => void;
    fail?: (error: Error) => void;
    always?: () => void;
};

const defaultLoadConfig: LoadConfig = {
    base: '',
    url: '',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    timeout: 5000,
    data: {},
};

let loadConfig = { ...defaultLoadConfig };

function $(selector: string | Element): MiniQuery {
    const elements =
        typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : [selector];

    return {
        elements,

        val(value?: string): string | MiniQuery {
            if (value === undefined) {
                return (elements[0] as HTMLInputElement)?.value || '';
            }
            elements.forEach(el => {
                (el as HTMLInputElement).value = value;
            });
            return this;
        },

        css(property: string | CSSProperty, value?: string): string | MiniQuery {
            if (typeof property === 'string' && value === undefined) {
                return getComputedStyle(elements[0])[property];
            } else if (typeof property === 'object') {
                elements.forEach(el => {
                    for (const key in property) {
                        (el as HTMLElement).style[key as any] = property[key]!;
                    }
                });
            } else if (typeof property === 'string') {
                elements.forEach(el => {
                    (el as HTMLElement).style[property as any] = value!;
                });
            }
            return this;
        },

        html(content?: string): string | MiniQuery {
            if (content === undefined) {
                return elements[0]?.innerHTML || '';
            }
            elements.forEach(el => {
                el.innerHTML = content;
            });
            return this;
        },

        on(event: string, callback: EventCallback): MiniQuery {
            elements.forEach(el => el.addEventListener(event, callback));
            return this;
        },

        click(callback: EventCallback): MiniQuery {
            return this.on('click', callback);
        },

        change(callback: EventCallback): MiniQuery {
            return this.on('change', callback);
        },

        mouseover(callback: EventCallback): MiniQuery {
            return this.on('mouseover', callback);
        },

        mousedown(callback: EventCallback): MiniQuery {
            return this.on('mousedown', callback);
        },

        mouseup(callback: EventCallback): MiniQuery {
            return this.on('mouseup', callback);
        },
    };
}

$.ready = (callback: () => void): void => {
    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }
};

$.loadSetup = (config: Partial<LoadConfig>): void => {
    loadConfig = { ...loadConfig, ...config };
};

$.load = async (config: Partial<LoadConfig>): Promise<unknown> => {
    const settings = { ...loadConfig, ...config };
    const headers = { 'Content-Type': settings.contentType! };

    const options: RequestInit = {
        method: settings.type,
        headers,
        body: settings.type === 'GET' ? undefined : JSON.stringify(settings.data),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), settings.timeout!);
    options.signal = controller.signal;

    if (settings.beforeSend) settings.beforeSend();

    try {
        const response = await fetch(`${settings.base}${settings.url}`, options);
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let result: unknown;
        switch (settings.dataType) {
            case 'json':
                result = await response.json();
                break;
            case 'xml':
                result = new DOMParser().parseFromString(
                    await response.text(),
                    'application/xml'
                );
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
        if (settings.fail) settings.fail(error as Error);
        throw error;
    } finally {
        if (settings.complete) settings.complete();
        if (settings.always) settings.always();
    }
};

// Expose to global scope
(window as any).$ = $;
```
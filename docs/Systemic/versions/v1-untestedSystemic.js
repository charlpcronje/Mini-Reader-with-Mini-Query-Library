// Systemic.js

class Systemic {
    constructor() {
        if (!Systemic.instance) {
            Systemic.instance = this;
            this.routingTable = new Map();
        }
        return Systemic.instance;
    }

    /**
     * Create a new dynamic object.
     * @param {Object} params - Parameters for initialization.
     * @returns {Proxy} - The dynamic object wrapped in a proxy.
     */
    createDynamicObject(params = {}) {
        const dynamicObject = this.initializeCoreProperties(params);
        return this.wrapWithProxy(dynamicObject);
    }

    /**
     * Initialize core properties of the dynamic object.
     * @param {Object} params - User-defined properties.
     * @returns {Object} - Initialized dynamic object.
     */
    initializeCoreProperties(params) {
        return {
            value: params.type === 'Observer' ? new Set() : null,
            observe: null,
            type: params.type || 'Static',
            proxy: null,
            ...params,
        };
    }

    /**
     * Wrap the dynamic object in a Proxy for runtime behaviors.
     * @param {Object} object - The dynamic object.
     * @returns {Proxy} - The proxy-wrapped object.
     */
    wrapWithProxy(object) {
        const proxy = new Proxy(object, {
            get: (target, prop) => {
                if (prop === 'proxy') return target.proxy;
                if (prop === 'value') {
                    if (target.type === 'Observer') {
                        target.value = target.value || new Set();
                        return target.value;
                    }
                    return target.value;
                }
                if (prop === Symbol.toPrimitive || prop === 'valueOf') {
                    return (hint) => {
                        if (target.type === 'Observer') {
                            if (hint === 'number') {
                                return { remove: true, target: proxy };
                            }
                            return proxy;
                        }
                        return target.value;
                    };
                }

                if (prop in target) {
                    const result = target[prop];
                    if (typeof result === 'object' && result !== null) {
                        return result.proxy || result;
                    }
                    return result;
                }

                target[prop] = this.createDynamicObject();
                return target[prop].proxy;
            },
            set: (target, prop, value) => {
                if (!target[prop]) {
                    target[prop] = this.createDynamicObject();
                }

                if (target.type === 'Observer' && prop === 'value') {
                    target.value = target.value || new Set();
                    if (value.remove) {
                        target.value.delete(value.target);
                    } else {
                        target.value.add(value);
                    }
                } else {
                    target[prop].value = value;
                }

                this.notifyObservers(target, prop, value);

                return true;
            },
        });

        if (object.type === 'Observer') {
            object.value = object.value || new Set();
        }

        object.proxy = proxy;
        return proxy;
    }

    /**
     * Notify observers of changes.
     * @param {Object} object - The dynamic object.
     * @param {string} property - The changed property.
     * @param {*} value - The new value.
     */
    notifyObservers(object, property, value) {
        if (object.observe && object.observe.value) {
            for (const observer of object.observe.value) {
                if (typeof observer === 'function') {
                    observer(object, property, value);
                }
            }
        }
    }
}

// Systemic instance
const systemic = new Systemic();
window.$ = systemic;
export default systemic;

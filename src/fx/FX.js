
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

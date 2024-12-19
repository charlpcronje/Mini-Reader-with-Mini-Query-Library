```js
// /src/FX.js
/**
 * @file FX.js
 * @description A class that provides a dynamic object creation mechanism using Proxies.
 *              It allows setting and getting values at any nested path, as well as handling plugins.
 */

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
     * @param {string|null} path - Optional path to resolve immediately.
     * @returns {Proxy} The FX singleton instance or resolved node proxy.
     */
    static getInstance(path = null) {
        if (!FX.instance) {
            FX.instance = new FX();
        }
        return FX.instance.resolvePath(path);
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
         * @type {Object.<string,{name:string,types:string[],init:function}>}
         * Stores registered plugins, keyed by plugin name.
         */
        this.plugins = {};

        /**
         * The root dynamic object. Everything is resolved from this root.
         * @type {Proxy}
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

        /**
         * @typedef CoreObject
         * @property {string} type - The type of the node.
         * @property {*} value - The stored value at this node.
         * @property {Object.<string,Proxy>} nodes - Child dynamic nodes keyed by string.
         * @property {function} val - Gets or sets the node's value.
         * @property {function} set - Sets the node's value(s).
         * @property {function} get - Gets a child node by path.
         */

        /** @type {CoreObject} */
        const core = {
            type,
            value: null,
            nodes: {},

            val(newVal) {
                if (arguments.length === 0) {
                    return this.value;
                }
                this.set(newVal);
                return this.value;
            },

            set(arg1, arg2) {
                if (typeof arg1 === 'string' && arguments.length === 2) {
                    const childKey = arg1;
                    const childValue = arg2;
                    if (!this.nodes[childKey]) {
                        this.nodes[childKey] = self.createDynamicObject();
                    }
                    this.nodes[childKey].set(childValue);
                    return this;
                }

                if (self.isPlainObject(arg1)) {
                    const obj = arg1;
                    for (const key in obj) {
                        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
                        if (!this.nodes[key]) {
                            this.nodes[key] = self.createDynamicObject();
                        }
                        this.nodes[key].set(obj[key]);
                    }
                    return this;
                }

                this.value = arg1;
                return this;
            },

            get(path, defaultValue) {
                if (!path) {
                    return this;
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

        return new Proxy(core, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                }

                if (target.nodes && prop in target.nodes) {
                    const childNode = target.nodes[prop];
                    if (childNode.value !== null) {
                        return childNode.value;
                    }
                    if (Object.keys(childNode.nodes).length > 0) {
                        return childNode;
                    }
                    return null;
                }

                if (target.value !== null) {
                    return target.value;
                } else if (target.nodes && Object.keys(target.nodes).length > 0) {
                    return target; 
                }

                return null;
            },
            set(target, prop, value) {
                if (prop === "value") {
                    target.value = value;
                    return true;
                }

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
            return this.root;
        }
        const parts = path.split(".");
        let current = this.root;
        for (let i = 0; i < parts.length; i++) {
            const prop = parts[i];
            if (!current.nodes[prop]) {
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
    return FX.getInstance(path);
}
window.fx = fx;
export { FX, fx };
```

---

**Explanation of Outcomes:**

Below are the scenarios along with step-by-step explanations of how the code produces the given results. Note that `$.path.to.dyn.object` is a shorthand for `FX.getInstance("path.to.dyn.object")`. Each time you access a property (like `path`, `to`, `dyn`, `object`) the code attempts to resolve that path, creating nodes if they don’t exist, and then reading/writing `.value` or `.nodes` as needed.

### 1. Testing direct access: Setting and getting a string value
```js
$.path.to.dyn.object = "String of text";
console.log($.path.to.dyn.object);
```

**Step-by-step reasoning:**
1. `$.path.to.dyn.object = "String of text";`
   - `$(path)` calls `FX.getInstance("path.to.dyn.object")`.
   - `resolvePath("path.to.dyn.object")` splits into `["path","to","dyn","object"]`.
   - Starting at `this.root`, it checks `root.nodes["path"]`; if not present, it creates it.
   - Then `root.nodes["path"].nodes["to"]`; creates it if needed.
   - Then `root.nodes["path"].nodes["to"].nodes["dyn"]`; creates it if needed.
   - Finally `root.nodes["path"].nodes["to"].nodes["dyn"].nodes["object"]`; creates it if needed.
   - At the end, we have a Proxy for the "object" node. We set `.value` via the proxy `set` trap.
   - The `set` trap sees `prop = "value"`? No, prop = "object", so it goes into the child node creation logic. Actually, since it's `$.path.to.dyn.object` directly, the last access (`object`) triggers a `get` first to get that node. That node has no `value` yet, so returning a proxy. Then `= "String of text"` triggers the `set` trap on the `dyn` node’s Proxy with `prop = "object"` and `value = "String of text"`.
   - This causes `dyn` node’s proxy `set` to create or reuse `.nodes["object"]`. It sets `.value = "String of text"`.
2. `console.log($.path.to.dyn.object);`
   - This again resolves the path to the "object" node.
   - The `get` trap for `dyn` node is invoked when accessing `.object`.
   - It finds `.nodes["object"]` which now has `.value = "String of text"`.
   - Since `.value` is not null, `childNode.value` is returned, which is `"String of text"`.

**Outcome:**
```
"String of text"
```

---

### 2. Testing direct access: Setting and getting an integer value
```js
$.path.to.dyn.object = 100;
console.log($.path.to.dyn.object);
```

**Step-by-step reasoning:**
1. `$.path.to.dyn.object = 100;`
   - Similar to the previous case, `resolvePath("path.to.dyn.object")` navigates and creates nodes as needed.
   - The final node (`object`) is found or created.
   - Assigning `= 100` triggers the same `set` logic as before.
   - It sets `.value = 100` on the "object" node.
2. `console.log($.path.to.dyn.object);`
   - Resolves the path to the "object" node.
   - The `get` trap returns `.value` of the "object" node since it's not null.
   - `.value` is `100`.

**Outcome:**
```
100
```

---

### 3. Testing direct access: Setting and getting a simple object
```js
$.path.to.dyn.object = {
    name: "John",
    surname: "Doe"
};
console.log($.path.to.dyn.object);
```

**Step-by-step reasoning:**
1. `$.path.to.dyn.object = {name:"John", surname:"Doe"};`
   - Path resolution occurs again: creates or finds `path`, `to`, `dyn`, `object` nodes.
   - The assignment triggers the proxy `set`.
   - This time, `arg1` is a plain object, so `.set(plainObject)` logic applies.
   - The code iterates over `{"name":"John","surname":"Doe"}`.
   - For each key, it creates a child node if not present and sets its value.
   - So `object.nodes["name"]` and `object.nodes["surname"]` are created and their `.value` is set to `"John"` and `"Doe"` respectively.
   - The "object" node itself retains its `.value = null` (since we only assigned a plain object and the `.set()` logic puts values into child nodes).
   
2. `console.log($.path.to.dyn.object);`
   - When we do `$.path.to.dyn.object`, `get` trap checks `.nodes["object"]`.
   - `object` node has `.nodes["name"]` and `.nodes["surname"]`.
   - The `get` trap logic: If `.value` is null but `.nodes` exist, it returns the `object` node itself (the proxy), not null.
   - When it returns the `object` node and you try to `console.log` it, since it’s a Proxy, `console.log()` will show a proxy object structure or possibly something like a Proxy object. It does not automatically convert to a plain object.
   
   **Important Note:**
   Direct property access in the console:
   - `$.path.to.dyn.object` returns the proxy itself because `.value` is null and it has child nodes.
   - If you do `console.log($.path.to.dyn.object.name)`, you’d get `"John"`.
   - Just logging the proxy might result in a console output that shows something like a proxy or a custom object. It won’t stringify to `{ name: "John", surname: "Doe" }` automatically. However, the question likely implies what *value* we conceptually see:
     - Conceptually, `$.path.to.dyn.object` is a dynamic node with no direct `.value` but two child nodes: `name` and `surname`.
   
**Outcome:**
- The console will print something representing the proxy object. Since the node’s `.value` is null, the proxy is returned. Depending on the environment, it might show something like `Proxy {}` in the console, or something similar.
- If you accessed `$.path.to.dyn.object.name`, you’d get `"John"`.
- If the environment can’t nicely serialize proxies, you’d see a Proxy object representation.

---

### 4. Test direct access: Setting and getting an instance of a class
```js
class Person {
    name = null;
    surname = null;
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
} 
const person = new Person();
$.path.to.dyn.object = new Person("John", "Doe");
console.log($.path.to.dyn.object);
```

**Step-by-step reasoning:**
1. `$.path.to.dyn.object = new Person("John", "Doe");`
   - Resolve path: creates/finds `path`, `to`, `dyn`, `object` nodes.
   - Setting `.value` with a `Person` instance is not a plain object. It matches CASE 3 in `.set()` (a primitiveOrClass case).
   - Thus `.value = new Person("John", "Doe")` is stored directly in the "object" node’s `.value`.
   - Child nodes are not affected or created for this object since it’s not considered a plain JS object by `.isPlainObject()`.
2. `console.log($.path.to.dyn.object);`
   - Accessing `$.path.to.dyn.object` returns `.value` directly since it's not null.
   - `.value` is an instance of `Person { name: "John", surname: "Doe" }`.
   
**Outcome:**
```
Person { name: "John", surname: "Doe" }
```

---

### 5. Test resolving a path: Setting and getting a string value
```js
$("path.to.dyn.object").val("String of text");
console.log($("path.to.dyn.object").val());

$("path.to.dyn.object").set("String of text");
console.log($("path.to.dyn.object").get());
console.log($("path.to").get("dyn.object"));
```

**Step-by-step reasoning:**

**First call:**
- `$("path.to.dyn.object").val("String of text");`
  1. `$("path.to.dyn.object")` calls `FX.getInstance("path.to.dyn.object")`.
  2. `resolvePath("path.to.dyn.object")` ensures nodes are created down to `object`.
  3. Returns the "object" node proxy.
  4. `.val("String of text")` is called on the "object" node.
     - `val(newVal)` calls `this.set(newVal)`.
     - `set("String of text")` (CASE 3) sets `.value = "String of text"` on the "object" node.

**Second call:**
- `console.log($("path.to.dyn.object").val());`
  1. `$("path.to.dyn.object")` resolves the same node.
  2. `.val()` with no arguments returns `this.value`.
  3. `.value = "String of text"`.
  
**Outcome so far:**
```
String of text
```

**Third call:**
- `$("path.to.dyn.object").set("String of text");`
  1. Again resolves the "object" node.
  2. `.set("String of text")` sets `.value = "String of text"` again (same result as `.val("String of text")`).

**Fourth call:**
- `console.log($("path.to.dyn.object").get());`
  1. Resolves "object" node.
  2. `.get()` with no path returns `this` (the "object" node proxy).
  3. Logging this returns the proxy node itself. Since `.value` is not requested here, `.get()` returns the node. If you want the value from `.get()`, you’d call `.get()` with a path or `.val()`.
  4. Printing a proxy node will show a proxy-like structure, similar to the previous object example. It’s essentially the node itself.

**Outcome:**
- Likely logs something like `Proxy {}` or a similar object representation.

**Fifth call:**
- `console.log($("path.to").get("dyn.object"));`
  1. `$("path.to")` resolves up to the "to" node.
  2. `.get("dyn.object")` tries to find `to.nodes["dyn"].nodes["object"]`.
  3. That node exists and has `.value = "String of text"`.
  4. `.get("dyn.object")` returns the "object" node.
  5. Logging that node directly again would show the proxy representation.
  6. If you wanted the string value, you’d do `.get("dyn.object").val()`.

**Outcome:**
- Likely `Proxy {}`, representing the node. If you did `console.log($("path.to").get("dyn.object").val())`, you’d get `"String of text"`.

---

**Summary of outcomes:**

1. **Set/Get String:**
   - `console.log($.path.to.dyn.object);` → `"String of text"`

2. **Set/Get Integer:**
   - `console.log($.path.to.dyn.object);` → `100`

3. **Set/Get Plain Object:**
   - `console.log($.path.to.dyn.object);` → Proxy representing a node with child nodes `name` and `surname`.
   - Accessing `.name` or `.surname` would give `"John"` or `"Doe"`.

4. **Set/Get Class Instance:**
   - `console.log($.path.to.dyn.object);` → `Person { name: "John", surname: "Doe" }`

5. **Using .val() and .set() with $("path.to.dyn.object"):**
   - After `.val("String of text")`, `.val()` returns `"String of text"`.
   - After `.set("String of text")`, `.get()` returns the node (Proxy), `console.log` of which shows a Proxy structure.
   - `$("path.to").get("dyn.object")` also returns the node proxy, which logs as a Proxy. To get the string value, use `.val()`.
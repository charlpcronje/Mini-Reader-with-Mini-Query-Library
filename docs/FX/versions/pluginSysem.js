class Systemic {
  constructor() {
    this.plugins = [];
    this.routingTable = new Map();
  }

  /**
   * Register a plugin to extend dynamic object functionality.
   * @param {Object} plugin - A plugin object with a `name` and `apply` method.
   */
  registerPlugin(plugin) {
    if (typeof plugin.name !== 'string' || typeof plugin.apply !== 'function') {
      throw new Error('Plugin must have a "name" and "apply" method');
    }
    this.plugins.push(plugin);
  }

  /**
   * Create a new dynamic object with the base structure and apply plugins.
   * @param {Object} params - Initial parameters for the dynamic object.
   * @returns {Proxy} - A proxy-wrapped dynamic object.
   */
  createDynamicObject(params = {}) {
    const core = {
      value: null,
      type: 'Static',
      proxy: null,
      ...params,
    };

    // Apply plugins
    for (const plugin of this.plugins) {
      if (typeof plugin.apply === 'function') {
        plugin.apply(core);
      }
    }

    return this.wrapWithProxy(core);
  }

  /**
   * Wrap a dynamic object with a Proxy for property interception.
   * @param {Object} object - The dynamic object to wrap.
   * @returns {Proxy} - A proxy-wrapped dynamic object.
   */
  wrapWithProxy(object) {
    const proxy = new Proxy(object, {
      get: (target, prop) => {
        if (prop === 'proxy') return proxy;
        if (prop === 'value') return target.value;
        if (typeof target[prop] === 'undefined') {
          target[prop] = this.createDynamicObject();
        }
        return target[prop].proxy || target[prop];
      },
      set: (target, prop, value) => {
        target[prop] = value;
        return true;
      },
    });

    object.proxy = proxy;
    return proxy;
  }

  /**
   * Resolve a path into a dynamic object, creating intermediate objects if necessary.
   * @param {string} path - The path to resolve.
   * @returns {Proxy} - The resolved dynamic object.
   */
  resolvePath(path) {
    const segments = path.split('.');
    let current = this;
    for (const segment of segments) {
      if (!current[segment]) {
        current[segment] = this.createDynamicObject();
      }
      current = current[segment].proxy || current[segment];
    }
    return current;
  }
}

// Export an instance of the Systemic class
const systemic = new Systemic();
export default systemic;
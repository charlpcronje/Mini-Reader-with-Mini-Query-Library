/**
 * @fileoverview This file contains the implementation of the FX class,
 * which provides a dynamic object creation system with plugin support.
 */

import litPlugin from "./litPlugin.js";

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
     * @type {Object<string, {name: string, types: string[], apply: function}>}
     */
    this.plugins = {};
    this.root = this.createDynamicObject();
    this.registerPlugin(litPlugin);
  }

  /**
   * Registers a plugin to extend the functionality of dynamic objects.
   * @param {{name: string, types: string[], apply: function}} plugin - The plugin to register.
   */
  registerPlugin(plugin) {
    if (!plugin || !plugin.name || !plugin.apply || !plugin.types) {
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
  createDynamicObject(type = "Static") {
    const core = {
      value: null,
      type: type,
      proxy: null,
      nodes: {},
      onCreate: [],
      onReady: [],
      val: function(value) {
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
        plugin.apply(core);
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
          if(!target[prop].value) {
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
      if(!target.value) {
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
export default fx;

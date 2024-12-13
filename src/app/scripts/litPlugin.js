/**
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
  types: ["Static", "Component"],
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
      render: () => {},
      /**
       * @type {function}
       */
      connectedCallback: () => {},
      /**
       * @type {function}
       */
      disconnectedCallback: () => {},
      /**
       * @type {function}
       */
      attributeChangedCallback: () => {},
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

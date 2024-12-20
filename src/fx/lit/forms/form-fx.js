/**
 * @file src/fx/lit/forms/form-fx.js
 * @fileoverview This file contains the implementation of the form component.
 */
import { LitElement, html, css } from 'lit';

/**
 * @class FormFx
 * @classdesc A custom form component for handling forms.
 */
export class FormFx extends LitElement {
    static get properties() {
        return {
            name: { type: String },
        };
    }

    constructor() {
        super();
        this.name = '';
    }

    render() {
        return html`
            <form @submit=${this._handleSubmit}>
                <slot></slot>
            </form>
        `;
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      const formElements = Array.from(this.querySelectorAll('input-fx'));
        const formData = {};
        let hasError = false;
        formElements.forEach((el) => {
          el.validate();
          if(el.error) {
            hasError = true;
          }
            formData[el.name] = el.value;
        });
        if(!hasError) {
          this.dispatchEvent(new CustomEvent('form-submitted', { detail: formData }));
        } else {
          this.dispatchEvent(new CustomEvent('form-invalid', { detail: "Please fill in all required fields correctly" }));
        }
    }

    static get styles() {
        return css`
            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        `;
    }
}

customElements.define('form-fx', FormFx);
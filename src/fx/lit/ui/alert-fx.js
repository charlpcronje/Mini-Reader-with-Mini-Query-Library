/**
 * @file src/fx/lit/ui/alert-fx.js
 * @fileoverview This file contains the implementation of the alert component.
 */
import { LitElement, html, css } from 'lit';

/**
 * @class AlertFx
 * @classdesc A custom alert component for displaying messages.
 */
export class AlertFx extends LitElement {
    static get properties() {
        return {
            message: { type: String },
            type: { type: String },
            visible: { type: Boolean, reflect: true },
        };
    }

    constructor() {
        super();
        this.message = '';
        this.type = 'info'; // info, warning, error, success
        this.visible = false;
    }

    render() {
        return this.visible
            ? html`
                  <div class="alert ${this.type}">
                      ${this.message}
                  </div>
              `
            : '';
    }

    static get styles() {
        return css`
            .alert {
                padding: 15px;
                margin: 10px 0;
                border-radius: 4px;
                color: white;
            }
            .info {
                background-color: #17a2b8;
            }
            .warning {
                background-color: #ffc107;
                color: #000;
            }
            .error {
                background-color: #dc3545;
            }
            .success {
                background-color: #28a745;
            }
        `;
    }
}
customElements.define('alert-fx', AlertFx);
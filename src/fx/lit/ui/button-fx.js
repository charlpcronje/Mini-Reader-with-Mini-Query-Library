/**
 * @file src/fx/lit/ui/button-fx.js
 * @fileoverview This file contains the implementation of the button component.
 */
import { LitElement, html, css } from 'lit';

/**
 * @class ButtonFx
 * @classdesc A custom button component.
 */
export class ButtonFx extends LitElement {
    static get properties() {
        return {
            text: { type: String },
            type: { type: String },
        };
    }

    constructor() {
        super();
        this.text = 'Button';
        this.type = 'button';
    }

    render() {
        return html`
            <button type="${this.type}">
                ${this.text}
            </button>
        `;
    }

    static get styles() {
        return css`
            button {
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                background-color: #007bff;
                color: white;
                cursor: pointer;
                font-size: 1rem;
            }
            button:hover {
                background-color: #0056b3;
            }
        `;
    }
}

customElements.define('button-fx', ButtonFx);
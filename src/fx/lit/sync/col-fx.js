// File: src/fx/lit/col-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class ColFx
 * @classdesc A column component designed to fit inside a RowFx grid.
 */
export class ColFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      span: { type: Number, reflect: true }, // Number of grid columns to span
    };
  }

  constructor() {
    super();
    this.span = 1; // Default span is 1 column
  }

  render() {
    return html`
      <div class="col">
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          grid-column: span var(--span, 1);
        }
        .col {
          padding: 8px;
          box-sizing: border-box;
        }
      `,
    ];
  }

  firstUpdated() {
    super.firstUpdated();
    this.style.setProperty('--span', this.span);
  }
}

customElements.define('col-fx', ColFx);

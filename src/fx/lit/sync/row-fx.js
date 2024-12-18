// File: src/fx/lit/row-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class RowFx
 * @classdesc A grid-based row container with a configurable number of columns.
 */
export class RowFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      columns: { type: Number, reflect: true }, // Number of columns
    };
  }

  constructor() {
    super();
    this.columns = 3; // Default number of columns
  }

  render() {
    const slots = Array.from({ length: this.columns }, (_, i) => html`<slot name="col-${i + 1}"></slot>`);

    return html`
      <div class="row">
        ${slots}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
        }
        .row {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(var(--columns, 3), 1fr);
        }
      `,
    ];
  }

  firstUpdated() {
    super.firstUpdated();
    this.style.setProperty('--columns', this.columns);
  }
}

customElements.define('row-fx', RowFx);

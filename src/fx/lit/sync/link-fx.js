// File: src/fx/lit/link-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class LinkFx
 * @classdesc A customizable link component with dynamic styling.
 */
export class LinkFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      href: { type: String, reflect: true },
      target: { type: String, reflect: true }, // e.g., _blank, _self
      text: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.href = '#';
    this.target = '_self';
    this.text = 'Click here';
  }

  render() {
    return html`
      <a class="link" href="${this.href}" target="${this.target}">
        <slot>${this.text}</slot>
      </a>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .link {
          color: var(--style-color, #0077cc);
          text-decoration: none;
          font-size: var(--style-font-size, 1rem);
          font-family: var(--style-font, inherit);
          font-weight: var(--style-font-weight, normal);
          transition: color 0.3s ease;
        }

        .link:hover {
          color: var(--style-hover-color, #005fa3);
          text-decoration: underline;
        }
      `,
    ];
  }
}

customElements.define('link-fx', LinkFx);

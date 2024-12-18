// File: src/fx/lit/image-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class ImageFx
 * @classdesc A responsive image component with optional caption support.
 */
export class ImageFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      src: { type: String, reflect: true },
      alt: { type: String, reflect: true },
      caption: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.src = '';
    this.alt = 'Image';
    this.caption = '';
  }

  render() {
    return html`
      <figure class="image-container">
        <img src="${this.src}" alt="${this.alt}" />
        ${this.caption ? html`<figcaption>${this.caption}</figcaption>` : ''}
      </figure>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .image-container {
          margin: 0;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        figcaption {
          font-size: 0.9rem;
          color: var(--style-color, #555);
          margin-top: 8px;
        }
      `,
    ];
  }
}

customElements.define('image-fx', ImageFx);

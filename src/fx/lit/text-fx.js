// File: src/fx/lit/text-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class TextFx
 * @classdesc Renders Markdown to HTML using the Marked library.
 */
export class TextFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      markdown: { type: String, reflect: true }, // Input Markdown
    };
  }

  constructor() {
    super();
    this.markdown = '';
  }

  render() {
    // Use the global `marked` object loaded via CDN
    const htmlContent = window.marked ? window.marked(this.markdown || '') : '';
    return html`<div class="markdown" .innerHTML=${htmlContent}></div>`;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .markdown {
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }
      `,
    ];
  }
}

customElements.define('text-fx', TextFx);

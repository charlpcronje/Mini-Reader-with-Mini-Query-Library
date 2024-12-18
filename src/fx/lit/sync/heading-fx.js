import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';

/**
 * @class HeadingFx
 * @classdesc A heading component with configurable size, margins, and inherited color.
 */
export class HeadingFx extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      size: { type: Number, reflect: true },
      marginTop: { type: String, attribute: 'margin-top', reflect: true },
      marginBottom: { type: String, attribute: 'margin-bottom', reflect: true },
    };
  }

  constructor() {
    super();
    this.size = 1;
    this.marginTop = '0px';
    this.marginBottom = '0px';
  }

  render() {
    const headingTag = `h${Math.min(Math.max(this.size, 1), 6)}`;
    return html`
      <${headingTag}
        class="heading"
        style="
          margin-top: ${this.marginTop};
          margin-bottom: ${this.marginBottom};
          color: ${this.styleColor || 'inherit'};
        "
      >
        <slot></slot>
      </${headingTag}>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .heading {
        font-family: inherit;
        font-weight: inherit;
      }
    `;
  }
}

customElements.define('heading-fx', HeadingFx);

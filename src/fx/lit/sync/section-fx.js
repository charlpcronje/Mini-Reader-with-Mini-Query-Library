// src/fx/lit/sync/section-fx.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html } from 'lit';

/**
 * @class SectionFx
 * @classdesc A section container extending BaseComponent.
 */
export class SectionFx extends BaseComponent {
  render() {
    return html`<section><slot></slot></section>`;
  }
}

customElements.define('section-fx', SectionFx);

/** 
 * /src/app/components/page-fx.js
 * @file page-fx.js - The PageFx component extending BaseComponent.
 */

import { html, css } from 'lit';
import { BaseComponent } from './BaseComponent.js';
import { Logger } from '../utils/Logger.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

/**
 * @class PageFx
 * @classdesc A LitElement web component representing a page with a header image and icon similar to Notion.
 * Extends BaseComponent to leverage event tracking and attribute management.
 */
export class PageFx extends BaseComponent {
  constructor() {
    super();
    try {
      Logger.logEvent('PageFx.constructor', { message: 'PageFx constructed' }, this.user_id);
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
    }
  }

  /**
   * @protected
   * @method firstUpdated
   * @description Called once the element’s DOM is updated. Additional setup for PageFx.
   * @return {void}
   */
  firstUpdated() {
    try {
      super.firstUpdated();
      Logger.logEvent('PageFx.firstUpdated', { message: 'PageFx first updated' }, this.user_id);
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
    }
  }

  /**
   * @protected
   * @method render
   * @description Renders the page layout.
   * @return {import('lit').TemplateResult}
   */
  render() {
    try {
      Logger.logEvent('PageFx.render', {}, this.user_id);
      const bgImageStyle = this.headerSrc ? `background-image: url(${this.headerSrc});` : '';
      const containerStyle = `
        max-width: ${this.styleWidth};
        margin: ${this.styleMargin};
        padding: ${this.stylePadding};
        border: ${this.styleBorder};
        box-shadow: ${this.styleShadow};
        background: ${this.styleBgGradient || this.styleBgColor};
        font-family: ${this.styleFont};
        font-size: ${this.styleFontSize};
        font-weight: ${this.styleFontWeight};
        color: ${this.styleColor};
      `;
      const headerStyle = `
        width: 100%;
        height: 200px;
        ${bgImageStyle}
        background-size: cover;
        background-position: center;
      `;
      const iconStyle = `
        width: 50px;
        height: 50px;
        display: inline-block;
        vertical-align: middle;
        background-image: url(${this.iconSrc});
        background-size: cover;
        background-position: center;
      `;
      return html`
        <div class="header" style="${headerStyle}"></div>
        <div class="content-container" style="${containerStyle}">
          <h1><span class="icon" style="${iconStyle}"></span> ${this.title}</h1>
          <slot></slot>
        </div>
      `;
    } catch (error) {
      ErrorHandler.handleError(error, this.user_id);
      return html``;
    }
  }

  /**
   * @static
   * @method styles
   * @description Component's scoped styles.
   * @return {import('lit').CSSResult}
   */
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      .header {
        display: block;
      }
      .content-container {
        position: relative;
      }
      h1 {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .icon {
        background-repeat: no-repeat;
      }
    `;
  }
}

customElements.define('page-fx', PageFx);

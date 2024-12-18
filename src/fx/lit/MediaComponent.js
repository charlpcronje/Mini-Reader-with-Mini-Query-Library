// File: src/fx/lit/media-component.js

import { BaseComponent } from '@fx/lit/BaseComponent.js';
import { html, css } from 'lit';
import { debounce } from '@fx/utils/debounce.js';

/**
 * @class MediaComponent
 * @classdesc Base class for media components like AudioFx and VideoFx with detailed event tracking.
 */
export class MediaComponent extends BaseComponent {
  static get properties() {
    return {
      ...super.properties,
      src: { type: String, reflect: true },
      autoplay: { type: Boolean, reflect: true },
      loop: { type: Boolean, reflect: true },
      muted: { type: Boolean, reflect: true },
      controls: { type: Boolean, reflect: true },
      caption: { type: String, reflect: true }, // Media caption
    };
  }

  constructor() {
    super();
    this.src = '';
    this.autoplay = false;
    this.loop = false;
    this.muted = false;
    this.controls = true;
    this.caption = '';
    this._lastPlaybackLogTime = 0;
  }

  firstUpdated() {
    super.firstUpdated();
    this._setupMediaEventListeners();
  }

  /**
   * @private
   * @method _setupMediaEventListeners
   * @description Sets up event listeners for media-specific events and tracks playback progress.
   */
  _setupMediaEventListeners() {
    try {
      const mediaElement = this.shadowRoot.querySelector('video, audio');
      if (!mediaElement) return;

      // List of media-specific events to track
      const events = [
        'play', 'pause', 'ended', 'volumechange',
        'seeked', 'seeking', 'loadeddata', 'loadedmetadata',
      ];

      events.forEach((eventName) => {
        mediaElement.addEventListener(eventName, (e) =>
          this._logEvent(eventName, { currentTime: mediaElement.currentTime })
        );
      });

      // Debounced logging for every second of playback
      const logPlayback = debounce(() => {
        const now = Math.floor(mediaElement.currentTime);
        if (now !== this._lastPlaybackLogTime) {
          this._lastPlaybackLogTime = now;
          this._logEvent('playback-second', { currentTime: now });
        }
      }, 1000);

      mediaElement.addEventListener('timeupdate', logPlayback);
    } catch (error) {
      console.error('Error setting up media event listeners:', error);
    }
  }

  /**
   * Renders the media element.
   * @param {string} tagName - The tag name (e.g., 'audio', 'video') for the media element.
   * @returns {import('lit').TemplateResult}
   */
  renderMediaElement(tagName) {
    return html`
      <div class="media">
        <${tagName}
          .src=${this.src}
          ?autoplay=${this.autoplay}
          ?loop=${this.loop}
          ?muted=${this.muted}
          ?controls=${this.controls}
        ></${tagName}>
        ${this.caption ? html`<div class="caption">${this.caption}</div>` : ''}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .media {
          display: block;
          width: 100%;
        }
        .caption {
          font-size: 14px;
          text-align: center;
          color: gray;
          margin-top: 8px;
        }
      `,
    ];
  }
}

customElements.define('media-component', MediaComponent);

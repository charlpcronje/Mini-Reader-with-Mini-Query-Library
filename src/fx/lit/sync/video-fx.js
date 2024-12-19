// src/fx/lit/sync/video-fx.js

import { MediaComponent } from '@fx/lit/MediaComponent.js';

/**
 * @class VideoFx
 * @classdesc A custom video player with enhanced tracking and captions.
 */
export class VideoFx extends MediaComponent {
  render() {
    return this.renderMediaElement('video');
  }
}

customElements.define('video-fx', VideoFx);

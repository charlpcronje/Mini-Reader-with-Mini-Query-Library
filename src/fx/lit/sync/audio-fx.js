// File: src/fx/lit/sync/audio-fx.js

import { MediaComponent } from '@fx/lit/MediaComponent.js';

/**
 * @class AudioFx
 * @classdesc A custom audio player extending MediaComponent.
 */
export class AudioFx extends MediaComponent {
  render() {
    return this.renderMediaElement('audio');
  }
}

customElements.define('audio-fx', AudioFx);

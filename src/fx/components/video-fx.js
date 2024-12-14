import {LitElement, html} from 'lit';

export class VideoFx extends LitElement {
    render() {
      return html`
        <div>Hello from VideoFx!</div>
      `;
    }
}

customElements.define('video-fx', VideoFx);
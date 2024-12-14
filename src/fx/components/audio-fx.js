import {LitElement, html} from 'lit';

export class AudioFx extends LitElement {
    render() {
      return html`
        <div>Hello from AudioFx!</div>
      `;
    }
}

customElements.define('audio-fx', AudioFx);
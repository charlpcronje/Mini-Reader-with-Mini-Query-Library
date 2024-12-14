import {LitElement, html} from 'lit';

export class SectionFx extends LitElement {
    render() {
      return html`
        <div>Hello from SectionFx!</div>
      `;
    }
}

customElements.define('section-fx', SectionFx);
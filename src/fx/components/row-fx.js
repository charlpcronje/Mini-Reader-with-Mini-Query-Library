import {LitElement, html} from 'lit';

export class RowFx extends LitElement {
    render() {
      return html`
        <div>Hello from RowFx!</div>
      `;
    }
}

customElements.define('row-fx', RowFx);
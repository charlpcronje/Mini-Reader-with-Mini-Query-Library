class PanelComponent extends LitElement {
    static get properties() {
        return {
            title: { type: String },
        };
    }

    constructor() {
        super();
        this.title = '';
    }

    render() {
        return html`
            <div class="panel">
                <h2>${this.title}</h2>
                <slot></slot>
            </div>
        `;
    }

    static get styles() {
        return css`
            .panel {
                background: #333;
                color: #fff;
                border-radius: 8px;
                padding: 20px;
                margin: 10px 0;
            }
            h2 {
                margin-top: 0;
            }
        `;
    }
}
customElements.define('panel-component', PanelComponent);
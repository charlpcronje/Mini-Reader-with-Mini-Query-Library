class InputField extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            type: { type: String },
            name: { type: String },
            value: { type: String },
            error: { type: String },
            required: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.label = '';
        this.type = 'text';
        this.name = '';
        this.value = '';
        this.error = '';
        this.required = false;
    }

    render() {
        return html`
            <div class="input-field">
                <label>${this.label}</label>
                <input type="${this.type}" name="${this.name}" .value=${this.value} @input=${this.handleInput} />
                ${this.error ? html`<div class="error">${this.error}</div>` : ''}
            </div>
        `;
    }

    handleInput(e) {
        this.value = e.target.value;
        this.validate();
    }

    validate() {
        if (this.required && !this.value) {
            this.error = `${this.label} is required.`;
        } else {
            this.error = '';
        }
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: { value: this.value, name: this.name, error: this.error },
        }));
    }

    static get styles() {
        return css`
            .input-field {
                margin: 10px 0;
            }
            label {
                display: block;
                margin-bottom: 5px;
                color: #fff;
            }
            input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .error {
                color: #e57373;
                font-size: 12px;
                margin-top: 5px;
            }
        `;
    }
}
customElements.define('input-field', InputField);
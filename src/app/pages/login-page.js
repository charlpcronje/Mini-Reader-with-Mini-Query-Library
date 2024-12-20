/**
 * @file src/app/pages/login-page.js
 * @fileoverview This file contains the implementation of the login page component.
 */
import { LitElement, html, css } from 'lit';
import { $ } from '@fx/boot.js';

/**
 * @class LoginPage
 * @classdesc A login page component using LitElement.
 */
export class LoginPage extends LitElement {
    static get properties() {
        return {
            error: { type: String },
             alertMessage: { type: String },
            alertType: {type: String},
            showAlert: {type: Boolean}
        };
    }

    constructor() {
        super();
        this.error = '';
        this.alertMessage = "";
        this.alertType = "";
        this.showAlert = false;
    }

     _showAlert(message, type) {
        this.alertMessage = message;
        this.alertType = type;
        this.showAlert = true;
         setTimeout(() => {
           this.showAlert = false;
         }, 3000);
    }
    
  async _handleLogin(e) {
        try {
          const { username, password } = e.detail;
           const success = await $.auth.login(username, password);
            if(success) {
              this._showAlert("Logged in successfully", "success");
               setTimeout(() => {
                 window.location.href = "/admin";
               }, 1000);
            } else {
             this._showAlert("Invalid username or password", "error");
            }
        } catch (error) {
             this._showAlert("Error trying to login", "error");
            console.error('Login error:', error);
        }
    }

    render() {
        return html`
           <alert-fx  ?visible=${this.showAlert} type="${this.alertType}" message="${this.alertMessage}"></alert-fx>
            <panel-fx title="Sign In">
                <form-fx @form-submitted=${(e) => this._handleLogin(e)} @form-invalid=${(e) => this._showAlert(e.detail, "warning")}>
                    <input-fx
                        label="Email"
                        type="text"
                        name="username"
                        required
                    ></input-fx>
                     <input-fx
                        label="Password"
                        type="password"
                        name="password"
                         required
                    ></input-fx>
                    <button-fx text="Sign In" type="submit"></button-fx>
                </form-fx>
            </panel-fx>
        `;
    }

    static get styles() {
        return css`
           :host {
            display: flex;
             justify-content: center;
             align-items: center;
             height: 100vh;
          }
          panel-fx {
              padding: 20px;
                width: 400px;
          }
        `;
    }
}

customElements.define('login-page', LoginPage);
/**
 * @file src/app/router.js
 * @fileoverview This file contains the implementation of the router component.
 */
import { Router } from '@lit-labs/router';
import { html, LitElement } from 'lit';
import { $ } from '@fx/boot.js';

/**
 * @class AppRouter
 * @classdesc A custom router component using @lit-labs/router.
 */
export class AppRouter extends LitElement {
    constructor() {
        super();
        this.router = new Router(this, [
            { path: '/admin/login', render: () => this._renderLoginPage() },
            { path: '/admin', render: () => this._renderAdminPage() },
            { path: '*', render: () => this._renderNotFound() },
        ]);
    }

    /**
     * @private
     * @method _renderLoginPage
     * @description Renders the login page if the user is not authenticated.
     * @return {TemplateResult} The rendered login page.
     */
    _renderLoginPage() {
        const auth = $.auth.get('isAuthenticated').val();
        if (auth) {
            window.location.href = "/admin";
        }
       return html`
         <login-page></login-page>
       `;
    }

    /**
     * @private
     * @method _renderAdminPage
     * @description Renders the admin page or redirects to login if the user is not authenticated or does not have the admin role.
     * @return {TemplateResult} The rendered admin page or a redirect to login.
     */
   _renderAdminPage() {
        const auth = $.auth.get('isAuthenticated').val();
        const role = $.auth.get('role').val();

        if (!auth || role !== 'admin') {
           window.location.href = "/admin/login";
           return;
        }
         return html `
            <h1>Admin</h1>
            <p>Welcome to the admin area</p>
         `;
    }

     /**
      * @private
     * @method _renderNotFound
     * @description Renders the not found page.
     * @return {TemplateResult} The rendered not found page.
      */
    _renderNotFound() {
        return html`<h1>404 Not Found</h1>`;
    }

    render() {
        return html`
          <main>${this.router.outlet()}</main>
        `;
    }
}

customElements.define('app-router', AppRouter);
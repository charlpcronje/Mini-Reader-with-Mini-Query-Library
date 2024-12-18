/** 
 * /src/app/components/BaseComponent.js
 * @file BaseComponent.js - The base LitElement web component class with shared attributes and functionality.
 */

import { LitElement, html, css } from 'lit';
import { Logger } from '@fx/utils/Logger.js';
import { ErrorHandler } from '@fx/utils/ErrorHandler.js';
import { LocalStorageManager } from '@fx/utils/localStorageManager.js';
import { debounce } from '@fx/utils/debounce.js';
import { IDBManager } from '@fx/utils/IDBManager.js';

export class BaseComponent extends LitElement {
    /**
     * @static
     * @type {Object}
     * @description LitElement property definitions for attributes.
     */
    static get properties() {
        return {
            user_id: { type: String, reflect: true },
            session_id: { type: String, reflect: true },
            componentSlug: { type: String, attribute: 'component-slug', reflect: true },
            title: { type: String, reflect: true },
            slug: { type: String, reflect: true },
            topicSlug: { type: String, attribute: 'topic-slug', reflect: true },
            headerSrc: { type: String, attribute: 'header-src', reflect: true },
            iconSrc: { type: String, attribute: 'icon-src', reflect: true },
            styleBorder: { type: String, attribute: 'style-border', reflect: true },
            styleShadow: { type: String, attribute: 'style-shadow', reflect: true },
            styleBgColor: { type: String, attribute: 'style-bg-color', reflect: true },
            styleBgGradient: { type: String, attribute: 'style-bg-gradient', reflect: true },
            styleColor: { type: String, attribute: 'style-color', reflect: true },
            styleFont: { type: String, attribute: 'style-font', reflect: true },
            styleFontSize: { type: String, attribute: 'style-font-size', reflect: true },
            styleFontWeight: { type: String, attribute: 'style-font-weight', reflect: true },
            stylePadding: { type: String, attribute: 'style-padding', reflect: true },
            styleMargin: { type: String, attribute: 'style-margin', reflect: true },
            styleWidth: { type: String, attribute: 'style-width', reflect: true },
            styleGutterWidth: { type: String, attribute: 'style-gutter-width', reflect: true },
            styleTabletWidth: { type: String, attribute: 'style-tablet-width', reflect: true },
            styleMobileWidth: { type: String, attribute: 'style-mobile-width', reflect: true },
            layoutColumns: { type: Number, attribute: 'layout-columns', reflect: true },
            showComments: { type: Boolean, attribute: 'show-comments', reflect: true },
            showInfo: { type: Boolean, attribute: 'show-info', reflect: true },
            protected: { type: Boolean, reflect: true },
            passcode: { type: String, reflect: true },
            author: { type: String, reflect: true },
            createdAt: { type: String, attribute: 'created-at', reflect: true },
            publishAt: { type: String, attribute: 'publish-at', reflect: true },
            updatedAt: { type: String, attribute: 'updated-at', reflect: true },
            status: { type: String, reflect: true },
            apiHost: { type: String, attribute: 'api-host', reflect: true },
            apiKey: { type: String, attribute: 'api-key', reflect: true },
            apiEndpoint: { type: String, attribute: 'api-endpoint', reflect: true },
            apiInterval: { type: Number, attribute: 'api-interval', reflect: true },
            apiSlug: { type: String, attribute: 'api-slug', reflect: true },
            onLoad: { type: String, attribute: 'on-load', reflect: true },
            onReady: { type: String, attribute: 'on-ready', reflect: true },
            onScroll: { type: String, attribute: 'on-scroll', reflect: true },
            onClose: { type: String, attribute: 'on-close', reflect: true },
            onResize: { type: String, attribute: 'on-resize', reflect: true },
            debounceTime: { type: Number, attribute: 'debounce-time', reflect: true },
            node_id: { type: String, reflect: true, attribute: 'node_id' },
            parent_id: { type: String, reflect: true, attribute: 'parent_id' },
            page_id: { type: String, reflect: true, attribute: 'page_id' },
            topic_id: { type: String, reflect: true, attribute: 'topic_id' },
        };
    }

    /**
     * @constructor
     */
    constructor() {
        super();
        try {
            // Default values
            this.user_id = '';
            this.session_id = this._generateSessionId();
            this.componentSlug = '';
            this.title = '';
            this.slug = '';
            this.topicSlug = '';
            this.headerSrc = '';
            this.iconSrc = '';
            this.styleBorder = 'none';
            this.styleShadow = 'none';
            this.styleBgColor = '#ffffff';
            this.styleBgGradient = '';
            this.styleColor = '#000000';
            this.styleFont = 'Arial, sans-serif';
            this.styleFontSize = '16px';
            this.styleFontWeight = '400';
            this.stylePadding = '0';
            this.styleMargin = '0 auto';
            this.styleWidth = '900px';
            this.styleGutterWidth = '20px';
            this.styleTabletWidth = '100%';
            this.styleMobileWidth = '100%';
            this.layoutColumns = 1;
            this.showComments = false;
            this.showInfo = false;
            this.protected = false;
            this.passcode = '';
            this.author = '';
            this.createdAt = '';
            this.publishAt = '';
            this.updatedAt = '';
            this.status = 'draft';
            this.apiHost = '';
            this.apiKey = '';
            this.apiEndpoint = '';
            this.apiInterval = 60000;
            this.apiSlug = '';
            this.onLoad = '';
            this.onReady = '';
            this.onScroll = '';
            this.onClose = '';
            this.onResize = '';
            this.debounceTime = 300;
            this.node_id = '';
            this.parent_id = '';
            this.page_id = '';
            this.topic_id = '';

            this._visibilityRatio = 0;
            this._intersectionObserver = null;
            this._lastEventTime = performance.now();

            IDBManager.init(this.user_id);
            Logger.logEvent('BaseComponent.constructor', { message: 'Base component constructed' }, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _generateSessionId
     * @description Generates a random session ID.
     * @return {string}
     */
    _generateSessionId() {
        try {
            const sid = 'session-' + Math.random().toString(36).substr(2, 9);
            Logger.logEvent('BaseComponent._generateSessionId', { session_id: sid }, this.user_id);
            return sid;
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
            return 'session-error';
        }
    }

    /**
     * @protected
     * @method firstUpdated
     * @description Lit lifecycle method called after the component’s DOM has been updated.
     * @return {void}
     */
    firstUpdated() {
        try {
            Logger.logEvent('BaseComponent.firstUpdated', { message: 'Component first updated' }, this.user_id);
            this._setupEventListeners();
            this._setupIntersectionObserver();
            this._logVisibilityChange();
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    _setupEventListeners() {
        this.addEventListener('click', (e) => this._logEvent('click', e));
        this.addEventListener('mouseover', (e) => this._logEvent('mouseover', e));
        this.addEventListener('mouseout', (e) => this._logEvent('mouseout', e));
    }

    /**
     * @private
     * @method _setupEventListeners
     * @description Sets up event listeners for clicks, mouseovers, scroll, resize, and visibility changes.
     * @return {void}
     */
    _setupEventListeners() {
        try {
            this.addEventListener('click', (e) => this._handleEvent('click', e));
            this.addEventListener('mouseover', (e) => this._handleEvent('mouseover', e));

            const debouncedScroll = debounce(() => this._handleWindowEvent('scroll'), this.debounceTime);
            const debouncedResize = debounce(() => this._handleWindowEvent('resize'), this.debounceTime);

            window.addEventListener('scroll', debouncedScroll);
            window.addEventListener('resize', debouncedResize);

            document.addEventListener('visibilitychange', () => {
                this._handleVisibilityChange(document.visibilityState);
            });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _setupIntersectionObserver
     * @description Sets up an IntersectionObserver to track visibility of the component.
     * @return {void}
     */
    _setupIntersectionObserver() {
        try {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: Array.from({ length: 101 }, (_, i) => i / 100)
            };
            this._intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this._visibilityRatio = Math.ceil(entry.intersectionRatio * 10) * 10;
                    this._logVisibilityChange();
                });
            }, options);
            this._intersectionObserver.observe(this);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _logVisibilityChange
     * @description Logs a visibility change event.
     * @return {void}
     */
    _logVisibilityChange() {
        try {
            this._logEvent('visibilitychange', { visibility: this._visibilityRatio + '%' });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleVisibilityChange
     * @description Handles document visibility changes (tab switching).
     * @param {string} state - The current visibility state of the document.
     * @return {void}
     */
    _handleVisibilityChange(state) {
        try {
            this._logEvent('documentVisibilityChange', { state });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleEvent
     * @description Handles component-level events like click and mouseover.
     * @param {string} eventName - The name of the event.
     * @param {Event} e - The event object.
     * @return {void}
     */
    _handleEvent(eventName, e) {
        try {
            this._logEvent(eventName, { target: e.composedPath()[0].tagName });
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _handleWindowEvent
     * @description Handles window-level events like scroll and resize.
     * @param {string} eventName - The name of the event.
     * @return {void}
     */
    _handleWindowEvent(eventName) {
        try {
            this._logEvent(eventName, {});
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @private
     * @method _logEvent
     * @description Logs an event with the specified name and data.
     * @param {string} eventName - Name of the event.
     * @param {Object} data - Additional event data.
     * @return {void}
     */
    _logEvent(eventName, data) {
        try {
            const now = performance.now();
            const ms_since_session_start = Math.floor(now);
            const previousEventTime = this._lastEventTime;
            this._lastEventTime = now;

            const ms_since_prev_event = Math.floor(now - previousEventTime);

            const eventObj = {
                session_id: this.session_id,
                user_id: this.user_id,
                event: eventName,
                event_slug: `${eventName}_${this.componentSlug}`,
                component_id: this.componentSlug,
                component_slug: this.componentSlug,
                node_id: this.node_id,
                parent_id: this.parent_id,
                page_id: this.page_id,
                topic_id: this.topic_id,
                data: JSON.stringify(data),
                value: data.value || '',
                datetime: new Date().toISOString(),
                ms_since_session_start,
                ms_since_prev_event
            };

            LocalStorageManager.saveEvent(eventObj, this.user_id);
            Logger.logEvent(eventName, eventObj, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method updated
     * @description Lit lifecycle method called after updating properties.
     * @param {Map<string, any>} changedProps - The properties that changed.
     * @return {void}
     */
    updated(changedProps) {
        try {
            Logger.logEvent('BaseComponent.updated', { changed: Array.from(changedProps.keys()) }, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method connectedCallback
     * @description Called when the element is connected to the DOM.
     * @return {void}
     */
    connectedCallback() {
        try {
            super.connectedCallback();
            Logger.logEvent('BaseComponent.connectedCallback', {}, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method disconnectedCallback
     * @description Called when the element is disconnected from the DOM.
     * @return {void}
     */
    disconnectedCallback() {
        try {
            super.disconnectedCallback();
            if (this._intersectionObserver) {
                this._intersectionObserver.disconnect();
            }
            Logger.logEvent('BaseComponent.disconnectedCallback', {}, this.user_id);
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
        }
    }

    /**
     * @protected
     * @method render
     * @description LitElement render method.
     * @return {import('lit').TemplateResult}
     */
    render() {
        try {
            Logger.logEvent('BaseComponent.render', {}, this.user_id);
            return html`<slot></slot>`;
        } catch (error) {
            ErrorHandler.handleError(error, this.user_id);
            return html``;
        }
    }

    /**
     * @static
     * @method styles
     * @description Component's scoped styles.
     * @return {import('lit').CSSResult}
     */
    static get styles() {
        return css`f
      :host {
        display: block;
      }
    `;
    }
}

customElements.define('base-component', BaseComponent);

// src/fx/utils/BaseClass.js
import { LitElement, html, css } from 'lit';

export class BaseClass {
    static storageKey = 'error-panel-storage';
    static maxLogs = 100;
    static enableNotifications = false; // Toggle notifications on or off

    constructor() {
        const proxy = new Proxy(this, {
            get(target, prop, receiver) {
                const original = Reflect.get(target, prop, receiver);
                if (typeof original === 'function') {
                    return function (...args) {
                        try {
                            return original.apply(target, args);
                        } catch (error) {
                            BaseClass.log('error', `Error in ${prop}: ${error.message}`);
                            throw error; // Re-throw if needed
                        }
                    };
                }
                return original;
            },
        });
        return proxy;
    }

    static log(type, message) {
        console[type]?.(`[${type.toUpperCase()}]: ${message}`);

        // Save to localStorage
        const logs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        logs.push({ type, message, timestamp: new Date().toISOString() });
        if (logs.length > this.maxLogs) logs.shift(); // FIFO for last 100
        localStorage.setItem(this.storageKey, JSON.stringify(logs));

        // Dispatch custom event to notify panel
        window.dispatchEvent(new CustomEvent('error-panel-update', { detail: logs }));

        // Placeholder for future notifications
        if (this.enableNotifications) {
            // Uncomment to enable notifications
            // window.dispatchEvent(new CustomEvent('show-notification', { detail: { type, message } }));
        }
    }

    static warn(message) {
        this.log('warn', message);
    }

    static error(message) {
        this.log('error', message);
    }

    static success(message) {
        this.log('log', message); // log for success
    }

    static info(message) {
        this.log('info', message);
    }
}

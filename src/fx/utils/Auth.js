/**
 * @file src/fx/utils/Auth.js
 * @fileoverview This file contains the implementation of the authentication logic.
 */
import { $, fx } from '@fx/boot.js';
import { ErrorHandler } from './ErrorHandler.js';
import { Logger } from './Logger.js';
import { env } from '@src/env.js';


/**
 * @class Auth
 * @classdesc A utility class for handling authentication.
 */
export class Auth {
  constructor() {
    this.storageKey = 'auth-tokens';
    // Initialize dynamic object in FX.
        fx('auth').set({
          isAuthenticated: false,
          token: null,
          role: null,
        });
  }
   
    /**
     * @method generateToken
     * @description Generates a JWT token.
     * @param {object} payload - The payload of the token.
     * @return {string} The generated JWT token.
     */
  generateToken(payload) {
    try {
        const header = { alg: 'HS256', typ: 'JWT' };
        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));

        const signature = this.hash(encodedHeader + '.' + encodedPayload);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    } catch (error) {
        ErrorHandler.handleError(error, 'auth');
        return null;
    }
}
    /**
     * @method hash
     * @description A simple hashing function.
     * @param {string} str - The string to hash.
     * @return {string} The hashed string.
     */
    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
    }

    /**
     * @method login
     * @description Logs in a user and sets authentication data.
     * @param {string} username - The username of the user logging in.
     * @param {string} password - The password of the user logging in.
     * @return {Promise<boolean>} True if the login was successful, false otherwise.
     */
  async login(username, password) {
    try {
        const users = await $.load({ url: '/api/getUsers.json' });
      const user = users.users.find(u => u.email === username);
        if (user && password == "password") {
           const token = this.generateToken({
             userId: user.id,
             username: user.name,
             role: "admin",
             exp: Date.now() + (1000 * 60 * 60),
           });

            localStorage.setItem(this.storageKey, JSON.stringify({
                 token: token,
                 role: "admin",
             }));
            $.auth.set({
               isAuthenticated: true,
               token: token,
               role: 'admin'
             });
          Logger.logEvent("Auth.login", { user_id: user.id, role: "admin", success: true}, 'auth');
          return true;
        } else {
            Logger.logEvent("Auth.login", { success: false }, 'auth');
            return false;
        }
    } catch (error) {
          ErrorHandler.handleError(error, 'auth');
          return false;
      }
  }

    /**
     * @method logout
     * @description Logs out the current user and clears authentication data.
     * @return {void}
     */
    logout() {
        try {
            localStorage.removeItem(this.storageKey);
            $.auth.set({
                isAuthenticated: false,
                token: null,
                role: null,
            });
            Logger.logEvent('Auth.logout', {}, 'auth');
             window.location.href = "/admin/login";
        } catch (error) {
            ErrorHandler.handleError(error, 'auth');
        }
    }


    /**
     * @method checkAuthentication
     * @description Middleware to check authentication status.
     * @return {boolean} True if the user is authenticated, false otherwise.
     */
    checkAuthentication() {
          try {
            const storedAuth = localStorage.getItem(this.storageKey);
            if (storedAuth) {
              const { token, role } = JSON.parse(storedAuth);
               const parts = token.split('.');
               if(parts.length === 3) {
                  const payload = JSON.parse(atob(parts[1]));
                  if(payload && payload.exp > Date.now()) {
                     $.auth.set({
                        isAuthenticated: true,
                        token: token,
                        role: role,
                      });
                    return true
                  }
                }
                 this.logout();
                return false;
            } else {
               $.auth.set({
                isAuthenticated: false,
                token: null,
                role: null
              });
              return false;
            }
        } catch (error) {
              ErrorHandler.handleError(error, 'auth');
            return false;
        }
    }
}
const auth = new Auth();
$.auth = fx('auth');
$.auth.check = auth.checkAuthentication.bind(auth);
$.auth.login = auth.login.bind(auth);
$.auth.logout = auth.logout.bind(auth);
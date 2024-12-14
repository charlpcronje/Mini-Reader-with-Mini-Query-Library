/** 
 * src/app/utils/Logger.js
 * @file Logger.js - Logging utility class.
 */

import { IDBManager } from './IDBManager.js';
import { ErrorHandler } from './ErrorHandler.js';

/**
 * @class Logger
 * @classdesc Handles logging of events and errors to console and IndexedDB.
 */
export class Logger {
  /**
   * @method logEvent
   * @description Logs an event to the console and to IndexedDB.
   * @param {string} eventName - Name of the event.
   * @param {Object} data - Additional data related to the event.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async logEvent(eventName, data, userId) {
    try {
      console.log(`User: ${userId} | Event: ${eventName}`, data);
      await IDBManager.addLog({ 
        event: eventName, 
        user_id: userId,
        datetime: new Date().toISOString(), 
        ...data
      }, userId);
    } catch (error) {
      ErrorHandler.handleError(error, userId);
    }
  }

  /**
   * @method logError
   * @description Logs an error to the console and to IndexedDB.
   * @param {string} source - The source or method name where the error occurred.
   * @param {Object} errorData - Additional error data.
   * @param {string} userId - The current user's ID.
   * @return {Promise<void>}
   */
  static async logError(source, errorData, userId) {
    try {
      console.error(`User: ${userId} | Error in ${source}:`, errorData);
      await IDBManager.addLog({
        event: 'error',
        user_id: userId,
        datetime: new Date().toISOString(),
        source,
        error: errorData
      }, userId);
    } catch (error) {
      console.error(`User: ${userId} | Failed to log error in Logger.logError:`, error);
    }
  }
}

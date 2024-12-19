/** 
 * src/fx/utils/debounce.js
 * @file debounce.js - A debounce utility function.
 */

/**
 * @function debounce
 * @description Debounces a given function by a specified delay.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The time in milliseconds to wait before invoking the function.
 * @returns {Function} A debounced function.
 */
export function debounce(func, wait) {
    let timeout;
    return function debouncedFunction(...args) {
      try {
        const later = () => {
          timeout = null;
          func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      } catch (error) {
        console.error('Error in debounced function:', error);
      }
    };
  }
  
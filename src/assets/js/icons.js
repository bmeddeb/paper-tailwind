/**
 * Icon Helper Functions
 * Makes working with icons simpler throughout the codebase
 */

// Import heroicons collection
import heroicons from '../icons/heroicons.js';

/**
 * Create an icon element with specified classes
 * @param {string} name - Icon name from the heroicons collection
 * @param {string} additionalClasses - Optional additional CSS classes to apply
 * @returns {HTMLElement} - The generated icon element
 */
export function createIcon(name, additionalClasses = '') {
  if (!heroicons[name]) {
    console.warn(`Icon "${name}" not found in the heroicons collection`);
    return null;
  }
  
  // Create a wrapper div and set its innerHTML to the icon SVG
  const wrapper = document.createElement('div');
  wrapper.innerHTML = heroicons[name];
  
  // Get the SVG element from the wrapper
  const svgElement = wrapper.firstChild;
  
  // Add additional classes if provided
  if (additionalClasses) {
    svgElement.classList.add(...additionalClasses.split(' '));
  }
  
  return svgElement;
}

/**
 * Get the HTML string for an icon with specified classes
 * @param {string} name - Icon name from the heroicons collection
 * @param {string} additionalClasses - Optional additional CSS classes to apply
 * @returns {string} - HTML string for the icon
 */
export function getIconHtml(name, additionalClasses = '') {
  if (!heroicons[name]) {
    console.warn(`Icon "${name}" not found in the heroicons collection`);
    return '';
  }
  
  // Parse the SVG string
  const wrapper = document.createElement('div');
  wrapper.innerHTML = heroicons[name];
  const svgElement = wrapper.firstChild;
  
  // Add additional classes if provided
  if (additionalClasses) {
    additionalClasses.split(' ').forEach(cls => {
      if (cls) svgElement.classList.add(cls);
    });
  }
  
  return wrapper.innerHTML;
}

// Make functions available globally if needed
if (typeof window !== 'undefined') {
  window.createIcon = createIcon;
  window.getIconHtml = getIconHtml;
}
/**
 * General utility functions
 */

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Clamp a number between min and max
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Linear interpolation
export const lerp = (start, end, factor) => start + (end - start) * factor;

// Map a value from one range to another
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Check if device supports touch
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get scroll percentage
export const getScrollPercentage = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// Smooth scroll to element
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate unique ID
export const generateId = () => {
  return `id-${Math.random().toString(36).substr(2, 9)}`;
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncateText = (text, maxLength, suffix = '...') => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + suffix;
};

export default {
  debounce,
  throttle,
  clamp,
  lerp,
  mapRange,
  isMobile,
  isTouchDevice,
  getScrollPercentage,
  smoothScrollTo,
  formatPhoneNumber,
  isValidEmail,
  generateId,
  capitalize,
  truncateText,
};

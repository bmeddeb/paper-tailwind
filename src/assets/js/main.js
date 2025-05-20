/**
 * Main JavaScript entry point
 * Initializes Alpine.js, Flowbite components, and provides theme control
 */

import Alpine from 'alpinejs';
import { initFlowbite } from 'flowbite';
import Plotly from 'plotly.js-dist-min';

// Make libraries available globally
window.Alpine = Alpine;
window.Plotly = Plotly;

/**
 * Theme system implementation
 * Supports light, dark, and system preference modes
 */

// Theme utility functions
const ThemeUtil = {
  // Available themes
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
  
  // Get user's system preference
  getSystemThemePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 
      this.THEMES.DARK : 
      this.THEMES.LIGHT;
  },
  
  // Get saved theme from local storage or default to system
  getSavedTheme() {
    return localStorage.getItem('theme') || this.THEMES.SYSTEM;
  },
  
  // Save theme to local storage
  saveTheme(theme) {
    localStorage.setItem('theme', theme);
  },
  
  // Apply theme to document
  applyTheme(theme) {
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark', 'theme-system');
    
    if (theme === this.THEMES.SYSTEM) {
      // Add system theme class and apply current system preference
      document.documentElement.classList.add('theme-system');
      
      // Apply appropriate theme based on system preference
      const systemTheme = this.getSystemThemePreference();
      document.documentElement.classList.add(systemTheme);
    } else {
      // Apply specific theme
      document.documentElement.classList.add(theme);
    }
  }
};

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = ThemeUtil.getSavedTheme();
  ThemeUtil.applyTheme(savedTheme);
});

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (ThemeUtil.getSavedTheme() === ThemeUtil.THEMES.SYSTEM) {
    ThemeUtil.applyTheme(ThemeUtil.THEMES.SYSTEM);
  }
});

// Custom Alpine.js components
document.addEventListener('alpine:init', () => {
  // Theme controller component
  Alpine.data('themeController', () => ({
    currentTheme: ThemeUtil.getSavedTheme(),
    
    init() {
      this.$watch('currentTheme', (value) => {
        ThemeUtil.saveTheme(value);
        ThemeUtil.applyTheme(value);
      });
    },
    
    // Toggle between light and dark (preserves system setting)
    toggleLightDark() {
      if (this.currentTheme === ThemeUtil.THEMES.SYSTEM) {
        // If set to system, switch to explicit light/dark based on current appearance
        this.currentTheme = ThemeUtil.getSystemThemePreference() === ThemeUtil.THEMES.DARK 
          ? ThemeUtil.THEMES.LIGHT 
          : ThemeUtil.THEMES.DARK;
      } else {
        // Toggle between light and dark
        this.currentTheme = this.currentTheme === ThemeUtil.THEMES.DARK 
          ? ThemeUtil.THEMES.LIGHT 
          : ThemeUtil.THEMES.DARK;
      }
    },
    
    // Set a specific theme
    setTheme(theme) {
      if (Object.values(ThemeUtil.THEMES).includes(theme)) {
        this.currentTheme = theme;
      }
    },
    
    // Check if specific theme is active
    isTheme(theme) {
      if (theme === ThemeUtil.THEMES.SYSTEM) {
        return this.currentTheme === ThemeUtil.THEMES.SYSTEM;
      }
      
      if (this.currentTheme === ThemeUtil.THEMES.SYSTEM) {
        return ThemeUtil.getSystemThemePreference() === theme;
      }
      
      return this.currentTheme === theme;
    }
  }));
  
  // Dropdown component
  Alpine.data('dropdown', () => ({
    open: false,
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    }
  }));
  
  // Modal component
  Alpine.data('modal', () => ({
    visible: false,
    show() {
      this.visible = true;
      document.body.classList.add('overflow-hidden');
    },
    hide() {
      this.visible = false;
      document.body.classList.remove('overflow-hidden');
    }
  }));
  
  // Tabs component
  Alpine.data('tabs', () => ({
    activeTab: 0,
    setActiveTab(index) {
      this.activeTab = index;
    }
  }));
  
  // Toast/notification component
  Alpine.data('notification', () => ({
    visible: false,
    message: '',
    type: 'info', // 'info', 'success', 'warning', 'error'
    timeout: null,
    
    show(message, type = 'info', duration = 3000) {
      this.visible = true;
      this.message = message;
      this.type = type;
      
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      this.timeout = setTimeout(() => {
        this.hide();
      }, duration);
    },
    
    hide() {
      this.visible = false;
    }
  }));
});

// Initialize Alpine.js
Alpine.start();

// Initialize Flowbite
initFlowbite();

// Initialize any chart placeholders on the page after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.Plotly && document.getElementById('main-chart')) {
    const data = [{
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      y: [65, 59, 80, 81, 56, 55, 40],
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: '#3b82f6'}
    }];
    
    const layout = {
      autosize: true,
      margin: {l: 40, r: 20, t: 10, b: 40},
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      xaxis: {
        showgrid: true,
        gridcolor: '#edf2f7',
        automargin: true
      },
      yaxis: {
        showgrid: true,
        gridcolor: '#edf2f7',
        automargin: true
      }
    };
    
    const config = {
      responsive: true,
      displayModeBar: false,
      scrollZoom: false,
      staticPlot: false
    };
    
    Plotly.newPlot('main-chart', data, layout, config);
  }
});
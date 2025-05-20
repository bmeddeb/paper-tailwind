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
 * Also supports white-label themes via URL parameters
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
    document.body.classList.remove('dark', 'dark-forced');
    
    if (theme === this.THEMES.SYSTEM) {
      // Add system theme class and apply current system preference
      document.documentElement.classList.add('theme-system');
      
      // Apply appropriate theme based on system preference
      const systemTheme = this.getSystemThemePreference();
      document.documentElement.classList.add(systemTheme);
      
      // Debug log
      console.log('System preference theme applied:', systemTheme);
      
      // Force body class for better CSS specificity
      if (systemTheme === 'dark') {
        document.body.classList.add('dark', 'dark-forced');
      }
    } else {
      // Apply specific theme
      document.documentElement.classList.add(theme);
      
      // Debug log
      console.log('Theme applied:', theme);
      
      // Force body class for better CSS specificity
      if (theme === 'dark') {
        document.body.classList.add('dark', 'dark-forced');
      }
    }
    
    // Force refresh of background colors
    if (document.documentElement.classList.contains('dark')) {
      document.querySelectorAll('.main-bg, .bg-gray-50').forEach(el => {
        el.style.backgroundColor = '#111827';
      });
      document.body.classList.add('dark-forced');
      document.body.style.backgroundColor = '#111827';
    } else {
      document.querySelectorAll('.main-bg').forEach(el => {
        el.style.backgroundColor = '';
      });
      document.body.style.backgroundColor = '';
    }
    
    console.log('Dark mode state:', document.documentElement.classList.contains('dark'));
  },
  
  // Get white-label theme from URL parameter or localStorage
  getWhiteLabelTheme() {
    // First check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    
    // If URL parameter exists, save it and return it
    if (themeParam) {
      localStorage.setItem('white-label-theme', themeParam);
      return themeParam;
    }
    
    // Otherwise check localStorage
    return localStorage.getItem('white-label-theme');
  },
  
  // Apply white-label theme by loading CSS
  applyWhiteLabelTheme(themeName) {
    // Remove any existing white-label theme
    const existingTheme = document.querySelector('link[data-white-label-theme]');
    if (existingTheme) {
      existingTheme.remove();
    }
    
    // If no theme name provided or 'default', don't add a new stylesheet
    if (!themeName || themeName === 'default') {
      localStorage.removeItem('white-label-theme');
      return;
    }
    
    // Add the new theme stylesheet
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/src/assets/css/themes/${themeName}-theme.css`;
    themeLink.setAttribute('data-white-label-theme', themeName);
    document.head.appendChild(themeLink);
  }
};

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
  // Apply light/dark theme
  const savedTheme = ThemeUtil.getSavedTheme();
  ThemeUtil.applyTheme(savedTheme);
  
  // Apply white-label theme if specified in URL or localStorage
  const whiteLabelTheme = ThemeUtil.getWhiteLabelTheme();
  if (whiteLabelTheme) {
    ThemeUtil.applyWhiteLabelTheme(whiteLabelTheme);
  }
});

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (ThemeUtil.getSavedTheme() === ThemeUtil.THEMES.SYSTEM) {
    ThemeUtil.applyTheme(ThemeUtil.THEMES.SYSTEM);
    
    // Update charts when system preference changes
    setTimeout(() => {
      if (window.Plotly && document.getElementById('main-chart')) {
        const isDark = document.documentElement.classList.contains('dark');
        togglePlotlyTheme(document.getElementById('main-chart'), 
          isDark ? 'plotly_dark' : 'plotly_white');
      }
    }, 100);
  }
});

// Function to toggle Plotly chart themes - make it globally available
window.togglePlotlyTheme = function(chartElement, themeTemplate) {
  if (window.Plotly && chartElement) {
    const backgroundColor = themeTemplate === 'plotly_dark' ? '#1f2937' : 'rgba(255,255,255,0)';
    Plotly.relayout(chartElement, {
      template: themeTemplate,
      paper_bgcolor: backgroundColor,
      plot_bgcolor: backgroundColor
    });
    console.log('Plotly theme toggled to:', themeTemplate);
  }
}

// Custom Alpine.js components
document.addEventListener('alpine:init', () => {
  // Theme controller component
  Alpine.data('themeController', () => ({
    currentTheme: ThemeUtil.getSavedTheme(),
    whiteLabelTheme: ThemeUtil.getWhiteLabelTheme() || 'default',
    
    init() {
      this.$watch('currentTheme', (value) => {
        ThemeUtil.saveTheme(value);
        ThemeUtil.applyTheme(value);
        
        // Update Plotly charts with the new theme
        setTimeout(() => {
          if (window.Plotly && document.getElementById('main-chart')) {
            const isDark = document.documentElement.classList.contains('dark');
            togglePlotlyTheme(document.getElementById('main-chart'), 
              isDark ? 'plotly_dark' : 'plotly_white');
          }
        }, 100);
      });
      
      this.$watch('whiteLabelTheme', (value) => {
        ThemeUtil.applyWhiteLabelTheme(value);
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
    
    // Set a white-label theme
    setWhiteLabelTheme(theme) {
      this.whiteLabelTheme = theme;
      
      // Update URL with theme parameter without reloading the page
      const url = new URL(window.location);
      if (theme && theme !== 'default') {
        url.searchParams.set('theme', theme);
      } else {
        url.searchParams.delete('theme');
      }
      window.history.pushState({}, '', url);
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
    },
    
    // Check if specific white-label theme is active
    isWhiteLabelTheme(theme) {
      return this.whiteLabelTheme === theme;
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
    // Function to get CSS variable value
    const getCssVariable = (variableName) => {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };
    
    // Function to create and update chart with current theme colors
    const createChart = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const primaryColor = getCssVariable('--color-primary') || '#3b82f6';
      
      console.log('Chart theme applied:', isDark ? 'dark' : 'light');
      
      // Create the data
      const data = [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        y: [65, 59, 80, 81, 56, 55, 40],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: primaryColor},
        line: {color: primaryColor}
      }];
      
      // Set layout options based on theme
      const layout = {
        autosize: true,
        margin: {l: 40, r: 20, t: 10, b: 40},
        template: isDark ? 'plotly_dark' : 'plotly_white'
      };
      
      // Additional custom theme settings
      if (isDark) {
        layout.paper_bgcolor = '#1f2937'; // gray-800
        layout.plot_bgcolor = '#1f2937';  // gray-800
      } else {
        layout.paper_bgcolor = 'rgba(255,255,255,0)';
        layout.plot_bgcolor = 'rgba(255,255,255,0)';
      }
      
      const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
        staticPlot: false
      };
      
      // If chart already exists, update it
      if (document.getElementById('main-chart') && document.getElementById('main-chart').data) {
        Plotly.react('main-chart', data, layout, config);
      } else {
        // Create new chart
        Plotly.newPlot('main-chart', data, layout, config);
      }
    };
    
    // Create chart initially
    createChart();
    
    // Update chart when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && 
            (mutation.target.classList.contains('dark') || 
             mutation.target.classList.contains('light'))) {
          createChart();
        }
      });
    });
    
    // Watch for changes in the document's classes (dark/light mode toggle)
    observer.observe(document.documentElement, { attributes: true });
    
    // Watch for theme stylesheet changes
    const linkObserver = new MutationObserver(() => {
      setTimeout(createChart, 100); // Small delay to ensure CSS has loaded
    });
    
    linkObserver.observe(document.head, { childList: true, subtree: false });
  }
});
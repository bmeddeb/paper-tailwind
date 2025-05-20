// Entry point for custom JavaScript (e.g., Alpine.js components)
import Alpine from 'alpinejs';
import { initFlowbite } from 'flowbite';
import Plotly from 'plotly.js-dist-min';

// Make libraries available globally
window.Alpine = Alpine;
window.Plotly = Plotly;

// Custom Alpine.js components
document.addEventListener('alpine:init', () => {
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
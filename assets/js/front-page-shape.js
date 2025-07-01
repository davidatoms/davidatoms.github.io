// Gentle Waves - Vanilla JavaScript Version
// Themes: natural reverence, teaching without teaching, self-trust
// Visualization: Lines that flow and interweave naturally, showing how patterns emerge without instruction

class GentleWaves {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.dimensions = { width: 500, height: 500 };
    this.time = 0;
    this.animationId = null;
    this.resizeObserver = null;
    
    this.init();
  }

  init() {
    if (!this.container) return;

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Set initial dimensions
    this.handleResize();
    
    // Setup resize handling
    this.setupResize();
    
    // Start animation
    this.animate();
  }

  handleResize = () => {
    if (!this.container || !this.canvas) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.dimensions = { width, height };
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setupResize() {
    window.addEventListener('resize', this.handleResize);
    
    // Use ResizeObserver for container changes if available
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.container);
    }
  }

  animate = () => {
    if (!this.canvas || !this.ctx) return;
    
    const { width, height } = this.dimensions;
    
    // Clear canvas with soft background color
    this.ctx.fillStyle = '#F0EEE6';
    this.ctx.fillRect(0, 0, width, height);
    
    // Update time
    this.time += 0.005;
    
    // The underlying structure reveals itself
    this.ctx.strokeStyle = 'rgba(80, 80, 80, 0.033)';
    this.ctx.lineWidth = 0.3;
    
    // Each line finds its own path
    for (let y = 0; y < height; y += 40) {
      const offsetY = 5 * Math.sin(this.time + y * 0.01);  // Natural movement
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + offsetY);
      this.ctx.lineTo(width, y + offsetY);
      this.ctx.stroke();
    }
    
    // Vertical lines with subtle wave
    for (let x = 0; x < width; x += 40) {
      const offsetX = 5 * Math.sin(this.time + x * 0.01);
      
      this.ctx.beginPath();
      this.ctx.moveTo(x + offsetX, 0);
      this.ctx.lineTo(x + offsetX, height);
      this.ctx.stroke();
    }
    
    // Long horizontal flowing lines - "the formless"
    const numHorizontalLines = 30;
    
    for (let i = 0; i < numHorizontalLines; i++) {
      const yPos = (i / numHorizontalLines) * height;
      const amplitude = 40 + 20 * Math.sin(this.time * 0.2 + i * 0.1);
      const frequency = 0.008 + 0.004 * Math.sin(this.time * 0.1 + i * 0.05);
      const speed = this.time * (0.5 + 0.3 * Math.sin(i * 0.1));
      const thickness = 0.8 + 0.6 * Math.sin(this.time + i * 0.2);
      const opacity = 0.132 + 0.088 * Math.abs(Math.sin(this.time * 0.3 + i * 0.15));
      
      this.ctx.beginPath();
      this.ctx.lineWidth = thickness;
      this.ctx.strokeStyle = `rgba(60, 60, 60, ${opacity})`;
      
      // Draw a flowing line
      for (let x = 0; x < width; x += 2) {
        const y = yPos + amplitude * Math.sin(x * frequency + speed);
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
    }
    
    // Long diagonal flowing lines - "crossing patterns"
    const numDiagonalLines = 35;
    
    for (let i = 0; i < numDiagonalLines; i++) {
      const offset = (i / numDiagonalLines) * width * 2 - width * 0.5;
      const amplitude = 30 + 20 * Math.cos(this.time * 0.25 + i * 0.1);
      const frequency = 0.01 + 0.005 * Math.sin(this.time * 0.15 + i * 0.08);
      const phase = this.time * (0.3 + 0.2 * Math.sin(i * 0.1));
      const thickness = 0.7 + 0.5 * Math.sin(this.time + i * 0.25);
      const opacity = 0.11 + 0.077 * Math.abs(Math.sin(this.time * 0.2 + i * 0.1));
      
      this.ctx.beginPath();
      this.ctx.lineWidth = thickness;
      this.ctx.strokeStyle = `rgba(50, 50, 50, ${opacity})`;
      
      // Draw diagonal flowing line
      const steps = 100;
      for (let j = 0; j <= steps; j++) {
        const progress = j / steps;
        const x = offset + progress * width;
        const y = progress * height + amplitude * Math.sin(progress * 8 + phase);
        
        if (j === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
    }
    
    // Long vertical flowing lines
    const numVerticalLines = 25;
    
    for (let i = 0; i < numVerticalLines; i++) {
      const xPos = (i / numVerticalLines) * width;
      const amplitude = 35 + 15 * Math.sin(this.time * 0.15 + i * 0.12);
      const frequency = 0.009 + 0.004 * Math.cos(this.time * 0.12 + i * 0.07);
      const speed = this.time * (0.4 + 0.25 * Math.cos(i * 0.15));
      const thickness = 0.6 + 0.4 * Math.sin(this.time + i * 0.3);
      const opacity = 0.099 + 0.066 * Math.abs(Math.sin(this.time * 0.25 + i * 0.18));
      
      this.ctx.beginPath();
      this.ctx.lineWidth = thickness;
      this.ctx.strokeStyle = `rgba(70, 70, 70, ${opacity})`;
      
      // Draw a flowing vertical line
      for (let y = 0; y < height; y += 2) {
        const x = xPos + amplitude * Math.sin(y * frequency + speed);
        
        if (y === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
    }
    
    // Request next frame
    this.animationId = requestAnimationFrame(this.animate);
  }

  dispose() {
    // Cancel animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    
    // Dispose ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Remove canvas
    if (this.container && this.canvas) {
      this.container.removeChild(this.canvas);
    }

    // Clear canvas
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Clear references
    this.canvas = null;
    this.ctx = null;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the middle pane and search bar
  const middlePane = document.querySelector('.middle-pane');
  const searchBar = document.querySelector('.search-bar');
  
  if (middlePane && searchBar) {
    // Create container for the gentle waves
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '300px'; // Fixed height above search bar
    container.style.marginBottom = '2rem';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.borderRadius = '8px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.background = '#F0EEE6';
    
    // Insert the container just before the search bar
    middlePane.insertBefore(container, searchBar);
    
    // Initialize the gentle waves
    window.gentleWaves = new GentleWaves(container);
  }
}); 
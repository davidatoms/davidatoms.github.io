import React, { useRef, useEffect } from 'react';

// Themes: inner rootedness, genuine cultivation, universal harmony
// Visualization: Lines that follow invisible force fields, showing how deep patterns emerge from firmly established principles

const VectorFieldLines = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Core parameters that shape the field's behavior
    const numLines = 300;  // The many that arise from the one
    const linePoints = 200;  // Memory of the path
    const noiseScale = 0.005;  // Subtlety of influence
    const noiseTimeScale = 0.000125;  // Natural rhythm of change
    const lineAlpha = 0.4;  // Balance of presence
    const lineWidth = 0.5;
    
    let animationFrameId;
    let time = 0;
    
    // Simple noise function
    const noise = (x, y, z) => {
      return Math.sin(x * 7 + z * 3) * 0.5 + 
             Math.sin(y * 8 + z * 4) * 0.5;
    };
    
    // The underlying force that guides all movement
    const vectorField = (x, y, t) => {
      // Transform coordinates to the field's natural space
      const nx = (x - width / 2) * 0.01;
      const ny = (y - height / 2) * 0.01;
      
      // Get noise value
      const n = noise(nx, ny, t * noiseTimeScale);
      
      // Create form boundary (mask)
      const cx = x - width / 2;
      const cy = y - height / 2;
      const r = Math.sqrt(cx * cx + cy * cy);
      const mask = Math.max(0, 1 - r / 200);
      
      // Create directional vector based on mask and noise
      const angle = n * Math.PI * 4 + Math.atan2(cy, cx);
      
      return {
        x: Math.cos(angle) * mask,
        y: Math.sin(angle) * mask
      };
    };
    
    // Create a line
    class Line {
      constructor() {
        this.reset();
      }
      
      reset() {
        // Start at random position
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        
        this.x = width / 2 + Math.cos(angle) * distance;
        this.y = height / 2 + Math.sin(angle) * distance;
        
        this.points = [];
        this.age = 0;
        this.lifespan = 400 + Math.random() * 600;  // Quadruple lifespan for smoother transitions
        this.opacity = 0;
        this.fadeIn = true;
        this.width = 0.2 + Math.random() * 0.8;
      }
      
      update(t) {
        // Update age
        this.age += 1;
        
        // Reset when too old
        if (this.age >= this.lifespan) {
          this.reset();
          return;
        }
        
        // Update opacity - fade in and out
        const progress = this.age / this.lifespan;
        if (progress < 0.1) {
          this.opacity = progress / 0.1 * lineAlpha;
        } else if (progress > 0.9) {
          this.opacity = (1 - (progress - 0.9) / 0.1) * lineAlpha;
        } else {
          this.opacity = lineAlpha;
        }
        
        // Get vector at current position
        const vector = vectorField(this.x, this.y, t);
        
        // Add current position to points array
        this.points.push({ x: this.x, y: this.y });
        
        // Limit the number of points
        if (this.points.length > linePoints) {
          this.points.shift();
        }
        
        // Move to next position
        this.x += vector.x * 0.5;  // Quarter speed movement
        this.y += vector.y * 0.5;
        
        // Check if out of bounds or vector is too small
        const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || magnitude < 0.01) {
          this.reset();
        }
      }
      
      draw(ctx) {
        if (this.points.length < 2) return;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(51, 51, 51, ${this.opacity})`;
        ctx.lineWidth = this.width * lineWidth;
        
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        
        ctx.stroke();
      }
    }
    
    // Create lines
    const lines = Array.from({ length: numLines }, () => new Line());
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#F0EEE6';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw all lines
      lines.forEach(line => {
        line.update(time);
        line.draw(ctx);
      });
      
      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
      
      // Clear lines array to prevent memory leaks
      lines.length = 0;
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center bg-[#F0EEE6] w-full h-full">
      <canvas ref={canvasRef} width={550} height={550} />
    </div>
  );
};

export default VectorFieldLines;
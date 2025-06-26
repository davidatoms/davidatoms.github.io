// Digital Clock Web Component
class DigitalClock extends HTMLElement {
    constructor() {
        super();
        this.updateInterval = null;
    }

    connectedCallback() {
        this.startClock();
    }

    disconnectedCallback() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    startClock() {
        this.updateTime();
        this.updateInterval = setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    updateTime() {
        const now = new Date();
        const padHour = this.getAttribute('pad-hour') === 'true';
        const twentyFourHour = this.getAttribute('twentyfour-hour') === 'true';
        
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        // Handle 12/24 hour format
        if (!twentyFourHour) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            const hoursStr = padHour ? hours.toString().padStart(2, '0') : hours.toString();
            this.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
        } else {
            const hoursStr = padHour ? hours.toString().padStart(2, '0') : hours.toString();
            this.textContent = `${hoursStr}:${minutes}:${seconds}`;
        }
    }
}

// Register the custom element
customElements.define('digital-clock', DigitalClock); 
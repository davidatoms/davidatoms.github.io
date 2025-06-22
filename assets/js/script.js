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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital clock component loaded');
    // Inject toggles if missing
    function ensureToggle(id, labelText, className) {
        if (!document.getElementById(id)) {
            const label = document.createElement('label');
            label.className = className;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            label.appendChild(input);
            label.appendChild(document.createTextNode(' ' + labelText));

            // insert into left pane
            const leftPane = document.querySelector('.left-pane');
            if (leftPane) {
                leftPane.insertBefore(label, leftPane.children[ leftPane.children.length > 2 ? 2 : leftPane.firstChild]);
            }
            return input;
        }
        return document.getElementById(id);
    }

    const darkInput = ensureToggle('dark-toggle', 'Dark mode', 'dark-mode-toggle');
    const aiInput   = ensureToggle('ai-toggle', 'Enable AI', 'ai-mode-toggle');

    // Apply initial stored states
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (darkInput) darkInput.checked = true;
    }

    if (localStorage.getItem('aiEnabled') === 'true') {
        document.body.classList.add('ai-enabled');
        if (aiInput) aiInput.checked = true;
    }

    // apply listeners if newly created
    if (darkInput && !darkInput.dataset.initialised) {
        darkInput.dataset.initialised = 'true';
        darkInput.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('darkMode', this.checked);
        });
    }

    if (aiInput && !aiInput.dataset.initialised) {
        aiInput.dataset.initialised = 'true';
        aiInput.addEventListener('change', function() {
            document.body.classList.toggle('ai-enabled', this.checked);
            localStorage.setItem('aiEnabled', this.checked);
        });
    }
});

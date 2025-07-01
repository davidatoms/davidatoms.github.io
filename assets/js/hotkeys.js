// Standalone Hotkeys System
// Extracted from template-engine.js for use in simple HTML pages

class HotkeySystem {
    constructor() {
        this.hotkeysEnabled = false;
        this.currentPanel = 'middle';
        this.init();
    }

    init() {
        // Initialize hotkeys when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeHotkeys());
        } else {
            this.initializeHotkeys();
        }
    }

    initializeHotkeys() {
        const toggle = document.getElementById('hotkey-toggle');
        if (!toggle) {
            console.warn('Hotkey toggle not found');
            return;
        }

        if (toggle.hasAttribute('data-hotkey-initialized')) {
            return; // Already initialized
        }
        toggle.setAttribute('data-hotkey-initialized', 'true');
        
        // Apply stored state
        const hotkeysEnabled = localStorage.getItem('hotkeysEnabled') !== 'false'; // Default to true
        toggle.checked = hotkeysEnabled;
        this.hotkeysEnabled = hotkeysEnabled;
        
        // Add toggle event listener
        toggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('hotkeysEnabled', enabled);
            this.hotkeysEnabled = enabled;
            
            if (enabled) {
                this.showMessage("Hotkeys enabled! CTRL+K=search, CTRL+arrows=navigate, ESC=clear");
                this.updateActivePanel();
            } else {
                this.showMessage("Hotkeys disabled");
                this.clearActivePanel();
            }
        });
        
        // Add keyboard event listeners
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Initialize active panel if hotkeys are enabled
        if (this.hotkeysEnabled) {
            this.updateActivePanel();
            setTimeout(() => {
                this.showMessage("Hotkeys active: CTRL+K=search, CTRL+arrows=navigate, ESC=clear");
            }, 1000);
        }
        
        console.log('Hotkeys initialized');
    }

    handleKeydown(e) {
        if (!this.hotkeysEnabled) return;
        
        // CTRL + K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            this.focusSearchInput();
            return;
        }
        
        // CTRL + D for dark mode toggle
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            this.toggleFeature('dark-toggle');
            return;
        }
        
        // CTRL + S for skiing mode toggle
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.toggleFeature('go-skiing-toggle');
            return;
        }
        
        // CTRL + C for cool mode toggle
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            this.toggleFeature('make-me-cool-toggle');
            return;
        }
        
        // CTRL + Arrow keys for panel navigation
        if (e.ctrlKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault();
            this.navigatePanels(e.key);
            return;
        }
        
        // ESC to clear focus/search
        if (e.key === 'Escape') {
            this.clearFocus();
            return;
        }
    }

    toggleFeature(toggleId) {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.checked = !toggle.checked;
            toggle.dispatchEvent(new Event('change', { bubbles: true }));
            
            const featureName = toggleId.replace('-toggle', '').replace('-', ' ');
            this.showMessage(`${this.capitalize(featureName)} ${toggle.checked ? 'enabled' : 'disabled'}`);
        }
    }

    focusSearchInput() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
            this.showMessage("Search activated");
        }
    }

    navigatePanels(direction) {
        const panels = ['left', 'middle', 'right'];
        let currentIndex = panels.indexOf(this.currentPanel);
        
        switch(direction) {
            case 'ArrowLeft':
                currentIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                currentIndex = Math.min(panels.length - 1, currentIndex + 1);
                break;
            case 'ArrowUp':
                this.scrollActivePanel(-100);
                return;
            case 'ArrowDown':
                this.scrollActivePanel(100);
                return;
        }
        
        this.currentPanel = panels[currentIndex];
        this.updateActivePanel();
        this.showMessage(`${this.capitalize(this.currentPanel)} panel active`);
    }

    scrollActivePanel(amount) {
        const panel = document.querySelector(`.${this.currentPanel}-pane`);
        if (panel) {
            panel.scrollTop += amount;
        }
    }

    updateActivePanel() {
        // Remove previous active indicators
        document.querySelectorAll('.left-pane, .middle-pane, .right-pane').forEach(panel => {
            panel.style.outline = 'none';
            panel.style.boxShadow = 'none';
        });
        
        // Add active indicator to current panel
        const activePanel = document.querySelector(`.${this.currentPanel}-pane`);
        if (activePanel && this.hotkeysEnabled) {
            activePanel.style.outline = '2px solid rgba(0, 123, 204, 0.5)';
            activePanel.style.boxShadow = '0 0 10px rgba(0, 123, 204, 0.3)';
        }
    }

    clearActivePanel() {
        document.querySelectorAll('.left-pane, .middle-pane, .right-pane').forEach(panel => {
            panel.style.outline = 'none';
            panel.style.boxShadow = 'none';
        });
    }

    clearFocus() {
        document.activeElement.blur();
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput === document.activeElement) {
            searchInput.value = '';
            // Trigger search clear if search functionality is available
            if (window.clearSearch && typeof window.clearSearch === 'function') {
                window.clearSearch();
            }
        }
        this.showMessage("Focus cleared");
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showMessage(message) {
        // Remove any existing message
        const existingMessage = document.getElementById('hotkey-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.id = 'hotkey-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add CSS animation if not already added
        if (!document.getElementById('hotkey-styles')) {
            const styles = document.createElement('style');
            styles.id = 'hotkey-styles';
            styles.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv) {
                messageDiv.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    if (messageDiv && messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Initialize hotkey system
const hotkeySystem = new HotkeySystem(); 
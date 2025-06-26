// Professional Template Engine with Component Inheritance
class TemplateEngine {
    constructor() {
        this.components = new Map();
        this.templates = new Map();
        this.config = {
            scriptsToLoad: [
                'assets/js/clock.js',
                'assets/js/go-skiing.js',
                'assets/js/david-cool.js',
                'assets/js/dark-mode.js',
                'assets/js/scroll-image-switch.js',
                'assets/js/search.js'
            ]
        };
    }

    async init() {
        console.log('Initializing Professional Template Engine...');
        
        // Load base layout if current page needs it
        if (document.body.hasAttribute('data-template')) {
            await this.loadTemplate();
        }
        
        // Load components first
        await this.loadComponents();
        
        // Load scripts after components are loaded
        await this.loadScripts();
        
        // Initialize all the functionality after everything is loaded
        await this.initializeFeatures();
        
        console.log('Template Engine initialized successfully');
    }

    async loadTemplate() {
        const templateName = document.body.getAttribute('data-template');
        if (!templateName) return;

        try {
            const response = await fetch(`components/base-layout.html`);
            const html = await response.text();
            
            // Replace body content with template
            document.body.innerHTML = html;
            
        } catch (error) {
            console.error('Failed to load template:', error);
        }
    }

    async loadComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        const loadPromises = [];

        componentElements.forEach(element => {
            const componentName = element.getAttribute('data-component');
            loadPromises.push(this.loadComponent(componentName, element));
        });

        await Promise.all(loadPromises);
    }

    async loadComponent(name, targetElement) {
        try {
            // Check cache first
            if (this.components.has(name)) {
                targetElement.innerHTML = this.components.get(name);
                return;
            }

            const response = await fetch(`components/${name}.html`);
            if (!response.ok) {
                throw new Error(`Component ${name} not found`);
            }
            
            const html = await response.text();
            
            // Cache the component
            this.components.set(name, html);
            
            // Inject into target element
            targetElement.innerHTML = html;
            
            console.log(`Component "${name}" loaded successfully`);
            
        } catch (error) {
            console.error(`Failed to load component "${name}":`, error);
            // Fallback: keep existing content
        }
    }

    async loadScripts() {
        // Remove existing script tags to avoid duplicates
        const existingScripts = document.querySelectorAll('script[src]');
        existingScripts.forEach(script => {
            if (this.config.scriptsToLoad.includes(script.src.split('/').slice(-3).join('/'))) {
                script.remove();
            }
        });

        // Load scripts sequentially to maintain dependencies
        for (const scriptPath of this.config.scriptsToLoad) {
            await this.loadScript(scriptPath);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script already exists
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log(`Script "${src}" loaded`);
                resolve();
            };
            script.onerror = () => {
                console.warn(`Script "${src}" failed to load`);
                resolve(); // Continue loading other scripts
            };
            
            document.body.appendChild(script);
        });
    }

    // Method to inject page-specific content
    setMainContent(html) {
        const mainContent = document.querySelector('[data-template="main-content"]');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    }

    // Method to set page title
    setTitle(title) {
        const titleElement = document.querySelector('[data-template="title"]');
        if (titleElement) {
            titleElement.textContent = title;
        }
        document.title = title;
    }

    // Method to add page-specific scripts
    addPageScript(src) {
        return this.loadScript(src);
    }

    // Method to get component by name
    getComponent(name) {
        return this.components.get(name);
    }

    // Method to update component content
    updateComponent(name, html) {
        this.components.set(name, html);
        const elements = document.querySelectorAll(`[data-component="${name}"]`);
        elements.forEach(element => {
            element.innerHTML = html;
        });
    }

    // Initialize all features after components and scripts are loaded
    async initializeFeatures() {
        console.log('Initializing features...');
        
        // Wait a small amount to ensure DOM is fully updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Manually trigger initialization of all features
        this.initializeDarkMode();
        this.initializeSkiing();
        this.initializeCoolMode();
        this.initializeHotkeys();
        this.initializeSearch();
        this.initializeScrollImageSwitch();
        
        console.log('All features initialized');
    }

    initializeDarkMode() {
        const toggle = document.getElementById('dark-toggle');
        if (toggle && !toggle.hasAttribute('data-initialized')) {
            toggle.setAttribute('data-initialized', 'true');
            
            // Apply stored state
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
                toggle.checked = true;
            }
            
            // Add event listener
            toggle.addEventListener('change', function() {
                document.body.classList.toggle('dark-mode', this.checked);
                localStorage.setItem('darkMode', this.checked);
            });
            
            console.log('Dark mode initialized');
        }
    }

    initializeSkiing() {
        const toggle = document.getElementById('go-skiing-toggle');
        if (toggle && !toggle.hasAttribute('data-initialized')) {
            toggle.setAttribute('data-initialized', 'true');
            
            // Apply stored state
            if (localStorage.getItem('goSkiingMode') === 'true') {
                document.body.classList.add('go-skiing-mode');
                toggle.checked = true;
                this.switchToGoSkiingMode(true);
            }
            
            // Add event listener
            toggle.addEventListener('change', function() {
                console.log('Go skiing toggle changed to:', this.checked);
                
                // Check if "Make me cool" is already active
                if (this.checked && localStorage.getItem('coolMode') === 'true') {
                    this.checked = false;
                    window.TemplateEngine.showMessage("I'm already cool when I'm skiing!");
                    return;
                }
                
                document.body.classList.toggle('go-skiing-mode', this.checked);
                localStorage.setItem('goSkiingMode', this.checked);
                window.TemplateEngine.switchToGoSkiingMode(this.checked);
            });
            
            console.log('Go skiing initialized');
        }
    }

    initializeCoolMode() {
        const toggle = document.getElementById('make-me-cool-toggle');
        if (toggle && !toggle.hasAttribute('data-initialized')) {
            toggle.setAttribute('data-initialized', 'true');
            
            // Apply stored state
            if (localStorage.getItem('coolMode') === 'true') {
                document.body.classList.add('cool-mode');
                toggle.checked = true;
                this.switchToCoolMode(true);
            }
            
            // Add event listener
            toggle.addEventListener('change', function() {
                console.log('Cool toggle changed to:', this.checked);
                
                // Check if "Go skiing" is already active
                if (this.checked && localStorage.getItem('goSkiingMode') === 'true') {
                    this.checked = false;
                    window.TemplateEngine.showMessage("I'm already cool when I'm skiing!");
                    return;
                }
                
                document.body.classList.toggle('cool-mode', this.checked);
                localStorage.setItem('coolMode', this.checked);
                window.TemplateEngine.switchToCoolMode(this.checked);
            });
            
            console.log('Make me cool initialized');
        }
    }

    initializeHotkeys() {
        const toggle = document.getElementById('hotkey-toggle');
        if (toggle && !toggle.hasAttribute('data-initialized')) {
            toggle.setAttribute('data-initialized', 'true');
            
            // Apply stored state
            const hotkeysEnabled = localStorage.getItem('hotkeysEnabled') === 'true';
            toggle.checked = hotkeysEnabled;
            
            // Initialize hotkey state
            this.hotkeysEnabled = hotkeysEnabled;
            this.currentPanel = 'middle';
            
            // Add toggle event listener
            toggle.addEventListener('change', (e) => {
                const enabled = e.target.checked;
                localStorage.setItem('hotkeysEnabled', enabled);
                this.hotkeysEnabled = enabled;
                
                if (enabled) {
                    this.showMessage("Hotkeys enabled! CTRL+K to search, CTRL+arrows to navigate");
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
    }

    handleKeydown(e) {
        if (!this.hotkeysEnabled) return;
        
        // CTRL + K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            this.focusSearchInput();
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
            if (window.clearSearch) {
                window.clearSearch();
            }
        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    initializeSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput && !searchInput.hasAttribute('data-initialized')) {
            searchInput.setAttribute('data-initialized', 'true');
            console.log('Search initialized');
        }
    }

    initializeScrollImageSwitch() {
        const profileImg = document.querySelector('.left-pane img');
        if (profileImg && !profileImg.hasAttribute('data-scroll-initialized')) {
            profileImg.setAttribute('data-scroll-initialized', 'true');
            console.log('Scroll image switch initialized');
        }
    }

    // Helper methods for image switching
    switchToGoSkiingMode(isSkiing) {
        const profileImg = document.querySelector('.left-pane img');
        if (profileImg) {
            if (isSkiing) {
                if (profileImg.src.includes('profile.jpg')) {
                    profileImg.src = profileImg.src.replace('/me/profile.jpg', '/gone-skiing.png');
                }
            } else {
                if (profileImg.src.includes('gone-skiing.png')) {
                    profileImg.src = profileImg.src.replace('/gone-skiing.png', '/me/profile.jpg');
                }
            }
        }
    }

    switchToCoolMode(isCool) {
        const profileImg = document.querySelector('.left-pane img');
        if (profileImg) {
            if (isCool) {
                if (profileImg.src.includes('profile.jpg')) {
                    profileImg.src = profileImg.src.replace('/me/profile.jpg', '/me/david-cool.png');
                }
            } else {
                if (profileImg.src.includes('david-cool.png')) {
                    profileImg.src = profileImg.src.replace('/me/david-cool.png', '/me/profile.jpg');
                }
            }
        }
    }

    // Helper method to show messages
    showMessage(message) {
        // Remove any existing message
        const existingMessage = document.getElementById('template-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.id = 'template-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 123, 204, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: 'Karla', sans-serif;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(messageDiv);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// Global template engine instance
window.TemplateEngine = new TemplateEngine();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await window.TemplateEngine.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateEngine;
} 
// Personal Blog JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Show/hide sections based on navigation
    function showSection(targetId) {
        // Hide all sections
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
    
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#page-1';
        showSection(hash);
    });
    
    // Initialize page
    const initialHash = window.location.hash || '#page-1';
    showSection(initialHash);
    
    // Simple slideshow functionality for gallery
    function initSlideshows() {
        const slideshows = document.querySelectorAll('.gallery-slideshow');
        
        slideshows.forEach(slideshow => {
            const items = slideshow.querySelectorAll('.media-item');
            if (items.length <= 1) return;
            
            let currentIndex = 0;
            
            // Hide all items except first
            items.forEach((item, index) => {
                if (index !== 0) {
                    item.style.display = 'none';
                }
            });
            
            // Create navigation buttons
            const navContainer = document.createElement('div');
            navContainer.className = 'slideshow-nav';
            navContainer.style.cssText = 'text-align: center; margin-top: 1rem;';
            
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '← Previous';
            prevBtn.style.cssText = 'margin: 0 0.5rem; padding: 0.5rem 1rem; cursor: pointer;';
            
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next →';
            nextBtn.style.cssText = 'margin: 0 0.5rem; padding: 0.5rem 1rem; cursor: pointer;';
            
            navContainer.appendChild(prevBtn);
            navContainer.appendChild(nextBtn);
            slideshow.appendChild(navContainer);
            
            // Navigation functionality
            function showSlide(index) {
                items.forEach(item => item.style.display = 'none');
                items[index].style.display = 'block';
                currentIndex = index;
            }
            
            prevBtn.addEventListener('click', () => {
                const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
                showSlide(newIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
                showSlide(newIndex);
            });
        });
    }
    
    // Initialize slideshows
    initSlideshows();
    
    // Add smooth fade transition when switching sections
    const style = document.createElement('style');
    style.textContent = `
        .page-section {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        
        .page-section[style*="block"] {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation
    function addLoadingState() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    }
    
    addLoadingState();
});

// Contact form functionality (if needed later)
function handleContactForm() {
    // This can be expanded later for actual contact form handling
    console.log('Contact form functionality ready');
}

// Analytics or other tracking could go here
function initAnalytics() {
    // Placeholder for future analytics integration
    console.log('Blog analytics initialized');
}

initAnalytics();


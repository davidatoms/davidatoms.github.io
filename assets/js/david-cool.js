// Make Me Cool Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const coolInput = document.getElementById('make-me-cool-toggle');
    
    console.log('Make me cool toggle initialized:', !!coolInput);

    // Apply initial stored state
    if (localStorage.getItem('coolMode') === 'true') {
        document.body.classList.add('cool-mode');
        if (coolInput) coolInput.checked = true;
        switchToCoolMode(true);
    }

    // Attach event listener
    if (coolInput) {
        coolInput.addEventListener('change', function() {
            console.log('Cool toggle changed to:', this.checked);
            
            // Check if "Go skiing" is already active
            if (this.checked && localStorage.getItem('goSkiingMode') === 'true') {
                // Prevent the toggle and show message
                this.checked = false;
                showToggleMessage("I'm already cool when I'm skiing! 🎿❄️");
                return;
            }
            
            document.body.classList.toggle('cool-mode', this.checked);
            localStorage.setItem('coolMode', this.checked);
            switchToCoolMode(this.checked);
        });
    }
});

// Function to switch between regular profile and cool image
function switchToCoolMode(isCool) {
    console.log('switchToCoolMode called with:', isCool);
    
    // Target the profile image in the left pane
    const leftPaneProfile = document.querySelector('.left-pane img');
    const authorImages = document.querySelectorAll('.author-profile img'); // For blog post author sections
    
    const profileImages = [];
    if (leftPaneProfile) {
        // Only include if it's actually a profile-related image
        if (leftPaneProfile.src.includes('profile.jpg') || leftPaneProfile.src.includes('david-cool.png')) {
            profileImages.push(leftPaneProfile);
        }
    }
    // Add author images that contain profile references
    authorImages.forEach(img => {
        if (img.src.includes('profile.jpg') || img.src.includes('david-cool.png')) {
            profileImages.push(img);
        }
    });
    
    console.log('Found actual profile images to switch:', profileImages.length);
    
    profileImages.forEach((img, index) => {
        console.log(`Profile image ${index}: current src =`, img.src);
        
        if (isCool) {
            // Switch to cool image
            if (img.src.includes('profile.jpg') && !img.src.includes('david-cool.png')) {
                const newSrc = img.src.replace(/\/me\/profile\.jpg$/, '/me/david-cool.png');
                console.log(`Switching to cool: ${img.src} -> ${newSrc}`);
                img.src = newSrc;
            }
        } else {
            // Switch back to regular profile
            if (img.src.includes('david-cool.png')) {
                const newSrc = img.src.replace(/\/me\/david-cool\.png$/, '/me/profile.jpg');
                console.log(`Switching back to profile: ${img.src} -> ${newSrc}`);
                img.src = newSrc;
            }
        }
    });
}

// Function to show temporary toggle message
function showToggleMessage(message) {
    // Remove any existing message
    const existingMessage = document.getElementById('toggle-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'toggle-message';
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
        backdrop-filter: blur(5px);
    `;

    // Add animation keyframes if not already added
    if (!document.getElementById('toggle-message-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toggle-message-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(messageDiv);

    // Auto-remove after 3 seconds with slide-out animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

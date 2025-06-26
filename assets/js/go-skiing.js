// Go Skiing Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const skiingInput = document.getElementById('go-skiing-toggle');
    
    console.log('Go skiing toggle initialized:', !!skiingInput);

    // Apply initial stored state
    if (localStorage.getItem('goSkiingMode') === 'true') {
        document.body.classList.add('go-skiing-mode');
        if (skiingInput) skiingInput.checked = true;
        switchToGoSkiingMode(true);
    }

    // Attach event listener
    if (skiingInput) {
        skiingInput.addEventListener('change', function() {
            console.log('Go skiing toggle changed to:', this.checked);
            
            // Check if "Make me cool" is already active
            if (this.checked && localStorage.getItem('coolMode') === 'true') {
                // Prevent the toggle and show message
                this.checked = false;
                showToggleMessage("I'm already cool when I'm skiing! 🎿❄️");
                return;
            }
            
            document.body.classList.toggle('go-skiing-mode', this.checked);
            localStorage.setItem('goSkiingMode', this.checked);
            switchToGoSkiingMode(this.checked);
        });
    }
});

// Function to switch between regular profile and skiing image
function switchToGoSkiingMode(isSkiing) {
    console.log('switchToGoSkiingMode called with:', isSkiing);
    
    // Target the profile image in the left pane (whether it's profile.jpg or gone-skiing.png)
    const leftPaneProfile = document.querySelector('.left-pane img');
    const authorImages = document.querySelectorAll('.author-profile img'); // For blog post author sections
    
    const profileImages = [];
    if (leftPaneProfile) {
        // Only include if it's actually a profile-related image
        if (leftPaneProfile.src.includes('profile.jpg') || leftPaneProfile.src.includes('gone-skiing.png')) {
            profileImages.push(leftPaneProfile);
        }
    }
    // Add author images that contain profile references
    authorImages.forEach(img => {
        if (img.src.includes('profile.jpg') || img.src.includes('gone-skiing.png')) {
            profileImages.push(img);
        }
    });
    
    console.log('Found actual profile images to switch:', profileImages.length);
    
    profileImages.forEach((img, index) => {
        console.log(`Profile image ${index}: current src =`, img.src);
        
        if (isSkiing) {
            // Switch to skiing image
            if (img.src.includes('profile.jpg') && !img.src.includes('gone-skiing.png')) {
                const newSrc = img.src.replace(/\/me\/profile\.jpg$/, '/gone-skiing.png');
                console.log(`Switching to skiing: ${img.src} -> ${newSrc}`);
                img.src = newSrc;
            }
        } else {
            // Switch back to regular profile
            if (img.src.includes('gone-skiing.png')) {
                const newSrc = img.src.replace(/\/gone-skiing\.png$/, '/me/profile.jpg');
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
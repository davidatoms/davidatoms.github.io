// Scroll-based Image Switch Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.left-pane img');
    let originalSrc = null;
    let isScrolledAway = false;
    
    if (profileImg) {
        // Store the original src
        originalSrc = profileImg.src;
        
        // Scroll event listener
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 150; // Pixels scrolled before switching image
            
            if (scrollPosition > scrollThreshold && !isScrolledAway) {
                // User has scrolled away from the picture
                isScrolledAway = true;
                switchToScrollImage();
            } else if (scrollPosition <= scrollThreshold && isScrolledAway) {
                // User has scrolled back to the top
                isScrolledAway = false;
                switchBackToOriginal();
            }
        });
    }
    
    function switchToScrollImage() {
        if (profileImg && !profileImg.src.includes('a.png')) {
            console.log('Switching to scroll image (a.png)');
            profileImg.src = 'assets/images/a.png';
        }
    }
    
    function switchBackToOriginal() {
        if (profileImg && profileImg.src.includes('a.png')) {
            console.log('Switching back to original image');
            
            // Check current toggle states to determine which image to restore
            const goSkiingActive = localStorage.getItem('goSkiingMode') === 'true';
            const coolModeActive = localStorage.getItem('coolMode') === 'true';
            
            if (goSkiingActive) {
                profileImg.src = 'assets/images/gone-skiing.png';
            } else if (coolModeActive) {
                profileImg.src = 'assets/images/me/david-cool.png';
            } else {
                profileImg.src = 'assets/images/me/profile.jpg';
            }
        }
    }
}); 
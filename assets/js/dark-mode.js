// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('dark-toggle');
    
    console.log('Dark mode toggle initialized:', !!darkToggle);

    // Apply initial stored state
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (darkToggle) darkToggle.checked = true;
    }

    // Attach event listener
    if (darkToggle) {
        darkToggle.addEventListener('change', function() {
            console.log('Dark mode toggle changed to:', this.checked);
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('darkMode', this.checked);
        });
    }
}); 
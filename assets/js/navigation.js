document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        // Toggle the classes
        const isActive = hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
        
        // Prevent background scrolling
        body.style.overflow = isActive ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navMenu.classList.remove('is-active');
            body.style.overflow = 'auto';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Only apply effects on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            // Reset initial transforms
            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--rotateY', '0deg');
            
            // Setup events
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    }
    
    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // Get mouse position relative to the card center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation (values between -25 and 25 degrees)
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            const rotateY = (mouseX / (rect.width / 2)) * 15;
            const rotateX = (mouseY / (rect.height / 2)) * -15;
            
            // Apply the rotation with CSS variables
            card.style.setProperty('--rotateX', `${rotateX}deg`);
            card.style.setProperty('--rotateY', `${rotateY}deg`);
        });
    }
    
    function handleMouseLeave(e) {
        const card = e.currentTarget;
        
        // Add smooth transition for reset
        card.style.transition = 'transform 0.2s ease-out';
        
        // Reset rotations
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
        
        // Reset transition after animation completes
        setTimeout(() => {
            card.style.transition = 'transform 0.25s ease-out';
        }, 500);
    }
});

const mousePosition = document.getElementById('mouse-position')

function createTrailDot(x, y) {
    const dots = document.createElement('div');
    dots.className = 'trail'; 
    document.body.appendChild(dots); 

    // Position the dots
    dots.style.transform = `translate(${x}px, ${y}px)`;

    // Remove the dots after 3 sec
    setTimeout(() => {
        dots.remove(); 
    }, 3000); 
}

// Mouse move event to display mouse position 
mousePosition.addEventListener('mousemove', function(event) {
    const x = event.clientX; 
    const y = event.clientY; 

    mousePosition.textContent = `Mouse Position: (${x}, ${y})`; 
    createTrailDot(x, y); 
});

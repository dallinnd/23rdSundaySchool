// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.error('Service Worker registration failed', err));
    });
}

// Swipe Right to Go Back Implementation
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Check if the gesture is mostly horizontal rather than vertical scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        
        // If swiped right by more than 50 pixels
        if (deltaX > 50) {
            const backButton = document.querySelector('.back-button');
            
            // If a back button exists on this page, navigate to its link
            if (backButton && backButton.href) {
                window.location.href = backButton.href;
            }
        }
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

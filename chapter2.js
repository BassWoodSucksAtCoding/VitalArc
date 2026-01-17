let currentSlide = 1;
const totalSlides = 95;

const slideImage = document.getElementById('slideImage');
const counter = document.getElementById('counter');
const creditsBtn = document.getElementById('creditsBtn');
const creditsModal = document.getElementById('creditsModal');
const closeBtn = document.querySelector('.close-btn');
const bgMusic = document.getElementById('bgMusic');

function updateSlide() {
    if (!slideImage) return;
    // simple fade effect
    slideImage.classList.add('fading');
    setTimeout(() => {
        slideImage.src = `VACh2/${currentSlide}.png`;
        counter.textContent = `${currentSlide} / ${totalSlides}`;
        slideImage.classList.remove('fading');
    }, 180);
}

// Click on image to navigate - left side goes back, right side goes forward
if (slideImage) {
    slideImage.addEventListener('click', (e) => {
        const rect = slideImage.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const midPoint = rect.width / 2;

        if (clickX < midPoint) {
            // Left side clicked - go backward
            if (currentSlide > 1) {
                currentSlide--;
                updateSlide();
            }
        } else {
            // Right side clicked - go forward
            if (currentSlide < totalSlides) {
                currentSlide++;
                updateSlide();
            }
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
});

// Credits button
if (creditsBtn && creditsModal) {
    creditsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        creditsModal.classList.add('active');
    });
}

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        creditsModal.classList.remove('active');
    });
}

// Close modal when clicking outside
if (creditsModal) {
    creditsModal.addEventListener('click', (e) => {
        if (e.target === creditsModal) {
            creditsModal.classList.remove('active');
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        creditsModal.classList.remove('active');
    }
});

// Audio handling
if (bgMusic) {
    try { bgMusic.volume = 0.3; } catch (e) {}
    // Try to resume playback on first user gesture if autoplay is blocked
    const resumeAudio = () => {
        bgMusic.play().catch(err => console.log('Audio playback prevented:', err));
        document.removeEventListener('click', resumeAudio);
        document.removeEventListener('keydown', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);
    document.addEventListener('keydown', resumeAudio);
}

// Init
if (counter) counter.textContent = `${currentSlide} / ${totalSlides}`;
if (slideImage) slideImage.src = `VACh2/${currentSlide}.png`;
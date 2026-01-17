const bgMusic = document.getElementById('bgMusic');

// Set audio volume
bgMusic.volume = 0.3;

// Attempt to play audio on user interaction
document.addEventListener('click', () => {
    bgMusic.play().catch(err => console.log('Audio playback prevented:', err));
}, { once: true });

document.addEventListener('keydown', () => {
    bgMusic.play().catch(err => console.log('Audio playback prevented:', err));
}, { once: true });

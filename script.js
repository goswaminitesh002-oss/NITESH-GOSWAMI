// ============================================
// FLOATING HEARTS ANIMATION
// ============================================
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random horizontal position
        const xPos = Math.random() * window.innerWidth;
        heart.style.left = xPos + 'px';
        heart.style.top = window.innerHeight + 'px';
        
        // Random animation duration
        const duration = 3 + Math.random() * 3;
        heart.style.animationDuration = duration + 's';
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        heart.style.setProperty('--drift', drift + 'px');
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 300);
}

// ============================================
// SCROLL TO LETTER
// ============================================
function scrollToLetter() {
    const letterSection = document.getElementById('letter');
    letterSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// FORGIVE BUTTON ACTION
// ============================================
function forgive() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Change button state
    button.textContent = '✨ Thank You ✨';
    button.disabled = true;
    button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    
    // Create burst effect
    createBurstEffect(event.pageX, event.pageY);
    
    // Trigger confetti
    triggerConfetti();
    
    // Play celebration sound if available
    playSound('celebration');
    
    // Show success message
    showSuccessMessage();
    
    // Reset after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
    }, 3000);
}

// ============================================
// BURST EFFECT
// ============================================
function createBurstEffect(x, y) {
    const emojis = ['✨', '💕', '💖', '🎉', '⭐'];
    
    for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'fixed';
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.fontSize = '24px';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '9999';
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(span);
        
        let dx = 0, dy = 0;
        const interval = setInterval(() => {
            dx += vx;
            dy += vy;
            dy += 0.2; // gravity
            
            span.style.transform = `translate(${dx}px, ${dy}px) scale(${1 - dy / 100})`;
            span.style.opacity = 1 - (dy / 200);
            
            if (dy > 200) {
                clearInterval(interval);
                span.remove();
            }
        }, 30);
    }
}

// ============================================
// CONFETTI EFFECT
// ============================================
function triggerConfetti() {
    const colors = ['#ff4d88', '#ff7eb3', '#ff2d75', '#e91e63', '#ff69b4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.8';
        
        document.body.appendChild(confetti);
        
        const duration = 2 + Math.random();
        const horizontalMovement = (Math.random() - 0.5) * 300;
        
        let startTime = Date.now();
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const yPos = progress * window.innerHeight;
                const xPos = parseInt(confetti.style.left) + (horizontalMovement * progress);
                
                confetti.style.transform = `translateY(${yPos}px) translateX(${horizontalMovement * progress}px) rotate(${progress * 360}deg)`;
                confetti.style.opacity = 1 - progress;
                
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
}

// ============================================
// SUCCESS MESSAGE
// ============================================
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(233, 30, 99, 0.9)';
    message.style.color = '#fff';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '50px';
    message.style.fontSize = '20px';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '10000';
    message.style.backdropFilter = 'blur(10px)';
    message.style.animation = 'messageAppear 0.5s ease-out';
    message.textContent = '💕 Thank you for forgiving me! 💕';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'messageDisappear 0.5s ease-out forwards';
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Add message animations to style
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messageAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes messageDisappear {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(messageStyle);

// ============================================
// OPEN SPOTIFY SONG
// ============================================
function openSpotify() {
    const spotifyUrl = 'https://open.spotify.com/track/2cz4qH4fCauVA93JHkUMad';
    window.open(spotifyUrl, '_blank');
}

// ============================================
// SOUND EFFECTS
// ============================================
function playSound(type) {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'celebration') {
            // Play a happy chime sound
            const notes = [523.25, 659.25, 783.99]; // C, E, G
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    playTone(audioContext, freq, 0.2);
                }, index * 150);
            });
        }
    } catch (e) {
        console.log('Audio API not available');
    }
}

function playTone(audioContext, frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
function setupScrollAnimations() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.8s ease-out forwards';
            }
        });
    }, options);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// PAGE LOAD INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating hearts
    createFloatingHearts();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('✨ Sorry Shri ❤️ - Website Loaded ✨');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to hero
    if (e.key.toLowerCase() === 'h') {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'L' to scroll to letter
    if (e.key.toLowerCase() === 'l') {
        scrollToLetter();
    }
    
    // Press 'M' to open Spotify
    if (e.key.toLowerCase() === 'm') {
        openSpotify();
    }
});
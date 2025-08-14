/**
 * Nayan's Portfolio - Interactive JavaScript
 * Features: Smooth scrolling, animations, terminal easter egg, typing effects
 */

// ========================================
// Global Variables
// ========================================
let isTerminalOpen = false;
let typingSpeed = 50;
let terminalCommands = {
    help: 'Available commands: help, about, skills, meme, quote, clear, exit',
    about: 'I\'m Nayan, a CS student who builds satellites and trains neural nets!',
    skills: 'Python, AI/ML, Computer Vision, Satellite Development, and caffeinated debugging.',
    meme: '404: Social life not found. But my GitHub commits are through the roof!',
    quote: '"Sometimes I train neural nets. Sometimes I train shoulders. Either way, I\'m building." - Nayan',
    clear: '',
    exit: 'Thanks for visiting! Keep coding and stay awesome!'
};

// ========================================
// DOM Content Loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ========================================
// App Initialization
// ========================================
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupTypingEffect();
    setupPixelTrails();
    setupProjectInteractions();
    setupSkillAnimations();
    setupFormHandling();
    setupEasterEggs();
    setupTerminal();
    initializeAnimations();
}

// ========================================
// Navigation Setup
// ========================================
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                } else if (entry.target.classList.contains('skill-item')) {
                    animateSkillLevel(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .stat-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Typing Effect
// ========================================
function setupTypingEffect() {
    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;

    const phrases = [
        'cat /dev/awesome',
        'sudo make-coffee',
        'git commit -m "fixed bugs"',
        'python train_neural_net.py',
        'npm run build-future',
        './deploy-to-space.sh'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
}

// ========================================
// Pixel Trails Canvas
// ========================================
function setupPixelTrails() {
    const canvas = document.getElementById('pixelTrails');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#ff006e';
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// Project Interactions
// ========================================
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const easterEgg = card.querySelector('.project-easter-egg');
        
        if (easterEgg) {
            easterEgg.addEventListener('click', (e) => {
                e.stopPropagation();
                showEasterEggMessage(easterEgg.getAttribute('title'));
            });
        }

        // Hover effect for tech badges
        card.addEventListener('mouseenter', () => {
            const techType = card.getAttribute('data-tech');
            if (techType) {
                highlightSimilarProjects(techType);
            }
        });

        card.addEventListener('mouseleave', () => {
            clearProjectHighlights();
        });
    });
}

function animateProjectCard(card) {
    card.style.animation = 'slideInUp 0.6s ease forwards';
}

function highlightSimilarProjects(techType) {
    const allCards = document.querySelectorAll('.project-card');
    const techArray = techType.split(',');
    
    allCards.forEach(card => {
        const cardTech = card.getAttribute('data-tech');
        const hasCommonTech = techArray.some(tech => cardTech && cardTech.includes(tech));
        
        if (!hasCommonTech) {
            card.style.opacity = '0.6';
        }
    });
}

function clearProjectHighlights() {
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach(card => {
        card.style.opacity = '1';
    });
}

// ========================================
// Skill Animations
// ========================================
function setupSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const tooltip = item.getAttribute('data-tooltip');
            showNotification(tooltip, 'info');
        });
    });
}

function animateSkillLevel(skillItem) {
    const skillLevel = skillItem.querySelector('.skill-level');
    if (skillLevel) {
        const level = skillLevel.getAttribute('data-level');
        setTimeout(() => {
            skillLevel.style.setProperty('--skill-width', level + '%');
        }, 300);
    }
}

// ========================================
// Timeline Animations
// ========================================
function animateTimelineItem(item) {
    const index = Array.from(item.parentNode.children).indexOf(item);
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 200);
}

// ========================================
// Form Handling
// ========================================
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create Gmail compose URL
    const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nayanraj083@gmail.com&su=${subject}&body=${body}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show success notification
    showNotification('Opening Gmail with your message. Complete and send from there!', 'success');
    
    // Reset form
    form.reset();
}

// ========================================
// Easter Eggs
// ========================================
function setupEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            triggerKonamiEasterEgg();
            konamiCode = [];
        }
    });

    // Secret click combination
    let clickCount = 0;
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('avatar-img')) {
            clickCount++;
            if (clickCount === 5) {
                triggerAvatarEasterEgg();
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 2000);
        }
    });
}

function triggerKonamiEasterEgg() {
    openTerminal();
    addTerminalLine('Konami Code activated! You\'ve unlocked the secret terminal!');
    addTerminalLine('You\'re clearly a person of culture. Respect!');
}

function triggerAvatarEasterEgg() {
    showNotification('You found my secret! I\'m actually powered by coffee and code!', 'success');
    
    // Add temporary glitch effect to avatar
    const avatar = document.querySelector('.avatar-img');
    if (avatar) {
        avatar.style.filter = 'hue-rotate(180deg) saturate(2)';
        setTimeout(() => {
            avatar.style.filter = 'none';
        }, 2000);
    }
}

function showEasterEggMessage(message) {
    showNotification(message, 'info');
}

// ========================================
// Terminal System
// ========================================
function setupTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                processTerminalCommand(command);
                terminalInput.value = '';
            }
        });
    }
}

function openTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.style.display = 'flex';
        isTerminalOpen = true;
        document.getElementById('terminalInput').focus();
    }
}

function closeTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        terminal.style.display = 'none';
        isTerminalOpen = false;
    }
}

function processTerminalCommand(command) {
    addTerminalLine(`$ ${command}`);
    
    if (command === 'clear') {
        clearTerminal();
        return;
    }
    
    if (command === 'exit') {
        addTerminalLine(terminalCommands[command]);
        setTimeout(closeTerminal, 1500);
        return;
    }
    
    const response = terminalCommands[command] || `Command not found: ${command}. Type 'help' for available commands.`;
    addTerminalLine(response);
}

function addTerminalLine(text) {
    const terminalContent = document.getElementById('terminalContent');
    if (terminalContent) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = text;
        terminalContent.appendChild(line);
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
}

function clearTerminal() {
    const terminalContent = document.getElementById('terminalContent');
    if (terminalContent) {
        terminalContent.innerHTML = `
            <div class="terminal-line">Terminal cleared! Type 'help' for available commands.</div>
        `;
    }
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-feather="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#00ff94' : type === 'error' ? '#ff006e' : '#00d4ff',
        color: '#0a0a0f',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        zIndex: '10001',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '300px',
        maxWidth: '500px',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Replace feather icon
    if (window.feather) {
        feather.replace();
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'warning': return 'alert-triangle';
        default: return 'info';
    }
}

// ========================================
// Animation Initialization
// ========================================
function initializeAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Performance Optimizations
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Lazy Loading for Images
// ========================================
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Global Event Listeners
// ========================================
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    setupLazyLoading();
});

window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const canvas = document.getElementById('pixelTrails');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// ========================================
// Service Worker Registration (Optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ========================================
// Export functions for global access
// ========================================
window.openTerminal = openTerminal;
window.closeTerminal = closeTerminal;
window.showNotification = showNotification;

// ========================================
// Development helpers
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`
    Nayan's Portfolio - Developer Mode
    
    Available global functions:
    - openTerminal(): Open the secret terminal
    - showNotification(message, type): Show a notification
    - Try the Konami code: ↑↑↓↓←→←→BA
    - Click the avatar 5 times for a surprise!
    
    Built with passion and endless cups of coffee.
    `);
}

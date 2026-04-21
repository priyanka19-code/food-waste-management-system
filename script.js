// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// Scroll to Top Button Functionality
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Navigation Links
const navLinksItems = document.querySelectorAll('.nav-links a, .hero-buttons button');

navLinksItems.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Validation and Handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Navigation Active State
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

updateActiveNav();

// Responsive Navigation
const handleResponsiveNav = () => {
    const navContainer = document.querySelector('.nav-container');
    const width = window.innerWidth;

    if (width <= 768) {
        navContainer.style.flexWrap = 'wrap';
    }
};

window.addEventListener('resize', handleResponsiveNav);
handleResponsiveNav();

// Dashboard Functionality
const handleDashboardInteraction = () => {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
};

// Call dashboard handler if on dashboard page
if (document.querySelector('.dashboard-container')) {
    handleDashboardInteraction();
}

// Add ripple effect to buttons
const addRippleEffect = () => {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';

            // Add ripple style if not exists
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.innerHTML = `
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            if (this.style.position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }
            
            this.appendChild(ripple);
        });
    });
};

addRippleEffect();

// Add Loading Animation
const showLoadingState = (element) => {
    element.innerHTML = '<div class="loader"></div>';
};

// Add Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    // Escape key to close modals or menus
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    }

    // Enter key to activate buttons
    if (e.key === 'Enter') {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn-primary')) {
            e.target.click();
        }
    }
});

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Optimize scroll event with throttle
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 250));

// Initialize AOS-like animation on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Form input focus animations
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// Countdown Timer Animation
const startCountdownAnimation = (element, finalValue) => {
    let currentValue = 0;
    const increment = finalValue / 30;
    
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(counter);
        }
        element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '');
    }, 50);
};

// Animate stat numbers on scroll into view
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(num => {
                    const value = parseInt(num.textContent);
                    if (!isNaN(value)) {
                        startCountdownAnimation(num, value);
                    }
                });
                animated = true;
            }
        });
    });

    statNumbers.forEach(num => statsObserver.observe(num.closest('.stat-card')));
}

// Console welcome message
console.log('%cWelcome to WasteWise!', 'color: #2ecc71; font-size: 20px; font-weight: bold;');
console.log('%cSmart Food Waste Management System', 'color: #27ae60; font-size: 14px;');
console.log('%cVersion 1.0.0', 'color: #95a5a6; font-size: 12px;');

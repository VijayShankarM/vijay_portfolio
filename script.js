// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initializePortfolio();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
});

// Portfolio initialization
function initializePortfolio() {
    // Show home section by default
    showSection('home');
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Initialize certificate modal
    initializeModal();
    
    // Setup certificate filters
    setupCertificateFilters();
    
    // Initialize contact form
    initializeContactForm();
}

// Event listeners setup
function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            updateActiveNavLink(this);
        });
    });

    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Certificate view buttons
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateCard = this.closest('.certificate-card');
            const certificateImg = certificateCard.querySelector('.certificate-img');
            openCertificateModal(certificateImg.src, certificateCard.querySelector('h3').textContent);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Show section function
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add entrance animation
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked link
    activeLink.classList.add('active');
}

// Initialize animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .certificate-card, .contact-item, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    // Parallax effect for background orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
}

// Certificate modal functionality
function initializeModal() {
    const modal = document.getElementById('certificateModal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.querySelector('.modal-image');

    // Close modal on X click
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeCertificateModal();
        });
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });
}

// Open certificate modal
function openCertificateModal(imageSrc, title) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.querySelector('.modal-image');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modal.style.display = 'block';
        
        // Add entrance animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// Close certificate modal
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Setup certificate filters
function setupCertificateFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter certificates
            certificateCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    // No form submission needed - using mailto link
    console.log('Contact modal initialized');
}

// Handle contact form submission - removed since using mailto
// function handleContactFormSubmit(e) { ... } - REMOVED

// Open contact modal
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

// Close contact modal
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when home section is shown
function initializeTypingAnimation() {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        typeWriter(titleName, originalText, 150);
    }
}

// Add smooth hover effects
function addHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Add loading animation
function addLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Add loader styles
const loaderStyles = `
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-dark);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader-content {
        text-align: center;
        color: var(--text-primary);
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--surface-color);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Add loader styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);

// Initialize loading animation
addLoadingAnimation();

// Add scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
addScrollToTop();

// Add particle effect to hero section
function addParticleEffect() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        `;
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particlesContainer);
    }
}

// Add particle animation styles
const particleStyles = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Add particle styles
const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Initialize particle effect
addParticleEffect();
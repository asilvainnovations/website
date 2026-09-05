// ============================================
// ASilva Innovations - Main JavaScript
// ============================================

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');
    const contactForm = document.getElementById('contact-form');
    const footerYear = document.getElementById('footer-year');
    const copyrightYear = document.getElementById('copyright-year');

    // ============================================
    // Loading Screen
    // ============================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1000);
    });

    // ============================================
    // Update Year in Footer
    // ============================================
    const currentYear = new Date().getFullYear();
    if (footerYear) footerYear.textContent = currentYear;
    if (copyrightYear) copyrightYear.textContent = currentYear;

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ============================================
    // Mobile Menu
    // ============================================
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on links
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Focus the target for accessibility
                target.focus({ preventScroll: true });
            }
        });
    });

    // ============================================
    // Animated Counter
    // ============================================
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.hasAttribute('data-animated')) {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target, 2000);
                        counter.setAttribute('data-animated', 'true');
                    }
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-card, .service-card, .feature-card, .persona-card, .testimonial, .benefit-item'
    );
    
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });

    // ============================================
    // Service Card Interactions
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(function(card) {
        // Mouse enter
        card.addEventListener('mouseenter', function() {
            card.style.zIndex = '10';
        });
        
        // Mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.zIndex = '';
        });
        
        // Keyboard navigation
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const link = card.querySelector('.service-link');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // ============================================
    // Contact Form Handling
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });
            
            // Log form data (in production, send to backend)
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your inquiry! Our team will contact you within 24 business hours.');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Form Input Enhancements
    // ============================================
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(function(input) {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Add filled class when input has value
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // ============================================
    // Parallax Effect for Hero
    // ============================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

    // ============================================
    // Image Lazy Loading Fallback
    // ============================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Accessibility: Focus Management
    // ============================================
    // Skip to main content
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }

    // ============================================
    // Performance: Debounce Scroll Events
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced scroll handler
    const debouncedScrollHandler = debounce(function() {
        // Additional scroll-based effects can be added here
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

    // ============================================
    // Theme Detection (System Preference)
    // ============================================
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        function handleThemeChange(e) {
            // Optional: Add theme switching logic here
            console.log('Theme preference:', e.matches ? 'dark' : 'light');
        }
        
        darkModeQuery.addEventListener('change', handleThemeChange);
    }

    // ============================================
    // Handle Reduced Motion Preference
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }

    // ============================================
    // Service Card Active State Management
    // ============================================
    let activeServiceCard = null;
    
    serviceCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Remove active class from previous card
            if (activeServiceCard && activeServiceCard !== card) {
                activeServiceCard.classList.remove('active');
            }
            
            // Toggle active class on clicked card
            card.classList.toggle('active');
            activeServiceCard = card.classList.contains('active') ? card : null;
        });
    });

    // ============================================
    // Testimonial Star Animation Stagger
    // ============================================
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(function(testimonial, index) {
        const stars = testimonial.querySelectorAll('.star');
        stars.forEach(function(star, starIndex) {
            star.style.animationDelay = `${starIndex * 100}ms`;
        });
    });

    // ============================================
    // Dynamic Badge Positioning
    // ============================================
    const heroBadge = document.querySelector('.hero-badge');
    
    if (heroBadge) {
        window.addEventListener('resize', debounce(function() {
            // Optional: Adjust badge position on resize if needed
        }, 250));
    }

    // ============================================
    // Navigation Active State
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', debounce(highlightNavigation, 100));

    // ============================================
    // Analytics Tracking (Placeholder)
    // ============================================
    function trackEvent(category, action, label) {
        // Integration with analytics platform
        console.log('Event:', category, action, label);
        
        // Example: Google Analytics
        // if (window.gtag) {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label
        //     });
        // }
    }

    // Track button clicks
    document.querySelectorAll('.btn-primary, .cta-primary, .form-submit').forEach(function(button) {
        button.addEventListener('click', function() {
            const label = this.textContent.trim();
            trackEvent('Button', 'Click', label);
        });
    });

    // Track external links
    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            trackEvent('External Link', 'Click', href);
        });
    });

    // ============================================
    // Console Message
    // ============================================
    console.log('%c ASilva Innovations ', 'background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
    console.log('%c Building Resilient Communities Through Technology ', 'color: #60a5fa; font-size: 12px; font-weight: bold;');
    console.log('%c Website developed with ❤️ for impact ', 'color: #94a3b8; font-size: 10px;');

    // ============================================
    // Error Handling
    // ============================================
    window.addEventListener('error', function(e) {
        console.error('Error occurred:', e.error);
        // Optional: Send error to monitoring service
    });

    // ============================================
    // Page Visibility API
    // ============================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden
            console.log('Page hidden');
        } else {
            // Page is visible
            console.log('Page visible');
        }
    });

    // ============================================
    // Print Optimization
    // ============================================
    window.addEventListener('beforeprint', function() {
        // Optional: Prepare page for printing
        console.log('Preparing to print');
    });

    window.addEventListener('afterprint', function() {
        // Optional: Restore page after printing
        console.log('Print completed');
    });

    // ============================================
    // Progressive Enhancement Check
    // ============================================
    function checkBrowserSupport() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            customProperties: CSS.supports('color', 'var(--test)'),
            grid: CSS.supports('display', 'grid'),
            flexbox: CSS.supports('display', 'flex')
        };
        
        console.log('Browser support:', features);
        
        // Add fallback classes if needed
        if (!features.grid) {
            document.body.classList.add('no-grid');
        }
        
        return features;
    }

    checkBrowserSupport();

    // ============================================
    // Initialize
    // ============================================
    function init() {
        console.log('ASilva Innovations website initialized');
        
        // Trigger initial scroll handler
        handleNavbarScroll();
        
        // Trigger initial navigation highlight
        highlightNavigation();
        
        // Add loaded class to body
        document.body.classList.add('loaded');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Service Worker Registration (for PWA)
    // ============================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js')
            //     .then(function(registration) {
            //         console.log('ServiceWorker registered:', registration);
            //     })
            //     .catch(function(error) {
            //         console.log('ServiceWorker registration failed:', error);
            //     });
        });
    }

    // ============================================
    // Expose Public API
    // ============================================
    window.ASilvaInnovations = {
        version: '1.0.0',
        closeMobileMenu: closeMobileMenu,
        trackEvent: trackEvent
    };

})();

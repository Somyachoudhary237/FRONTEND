/**
 * StudySpot - Main JS file
 * Implements interactive behaviors and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const mobileMenuToggle = document.querySelector('.navbar__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const navLinks = document.querySelectorAll('.navbar__menu a, .mobile-menu a');
    const testimonialDots = document.querySelectorAll('.dot');
    const preferencesForm = document.getElementById('preferencesForm');
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Mobile menu close
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Scroll to the target section with offset for the fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active class on nav links
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Testimonial slider
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
            
            // In a real implementation, we would slide to the correct testimonial
            // For now, we'll just console log which dot was clicked
            console.log(`Testimonial ${index + 1} selected`);
            
            // Future enhancement: Add actual testimonial slider functionality here
        });
    });
    
    // Form submission (placeholder)
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            let preferences = {};
            
            for (let [key, value] of formData.entries()) {
                preferences[key] = value;
            }
            
            // In a real implementation, this would send the data to a server
            // For now, just log the collected preferences
            console.log('Study preferences submitted:', preferences);
            
            // Show a success message to the user
            alert('Thank you for your preferences! We would show matching study spots here in a real implementation.');
        });
    }
    
    // Navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce padding when scrolled
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '0.75rem 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100; // Add some offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight && sectionId) {
                current = '#' + sectionId;
            }
        });
        
        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Initialize the page with the home link active
    const homeLinks = document.querySelectorAll('a[href="#"]');
    homeLinks.forEach(link => link.classList.add('active'));
});

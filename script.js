document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initCertificates();
    initCVFunctionality();
    initContactForm();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Front-End', 
        'Problem Solver',
        'Code Explorer',
        'AI Explorer',
        'Innovator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 120 + (index * 40);

        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const delay = 0;

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;
        planet.style.animationDelay = `${delay}s`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

function initSunPhotoModal() {
    const sun = document.querySelector('.sun-core');
    const modal = document.getElementById('photo-modal');
    const closeBtn = document.querySelector('.close');
    const randomPhoto = document.getElementById('random-photo');

    if (sun && modal && closeBtn && randomPhoto) {
        sun.addEventListener('click', () => {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

function initCertificates() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertificateImage');
    const closeModal = document.querySelector('.close-modal');

    certificateCards.forEach(card => {
        const viewBtn = card.querySelector('.view-certificate-btn');
        const certificateImg = card.querySelector('.certificate-image img');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImage.src = certificateImg.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        card.addEventListener('click', () => {
            modalImage.src = certificateImg.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function initCVFunctionality() {
    const viewCvBtn = document.getElementById('view-cv-btn');
    const cvModal = document.getElementById('cvModal');
    const cvFrame = document.getElementById('cvFrame');
    const closeCvModal = cvModal.querySelector('.close-modal');
    const printCvBtn = document.getElementById('print-cv');
    const downloadCvBtns = document.querySelectorAll('.cv-download-btn');

    // CV file path - UPDATE THIS TO YOUR ACTUAL FILE PATH
    const cvFilePath = 'assets/Divyanshu_CV.pdf';

    // Set CV file path to all download buttons
    downloadCvBtns.forEach(btn => {
        if (btn.href) {
            btn.href = cvFilePath;
        }
    });

    // View CV functionality
    if (viewCvBtn) {
        viewCvBtn.addEventListener('click', () => {
            cvFrame.src = cvFilePath + '#view=FitH';
            cvModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Print CV functionality
    if (printCvBtn) {
        printCvBtn.addEventListener('click', () => {
            const printWindow = window.open(cvFilePath, '_blank');
            printWindow.onload = function() {
                printWindow.print();
            };
        });
    }

    // Close CV modal
    closeCvModal.addEventListener('click', () => {
        cvModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        cvFrame.src = '';
    });

    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            cvModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            cvFrame.src = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.style.display === 'flex') {
            cvModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            cvFrame.src = '';
        }
    });

    // Track CV downloads (optional analytics)
    downloadCvBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('CV download initiated');
            // You can add analytics here:
            // gtag('event', 'download', { 'event_category': 'CV', 'event_label': 'Divyanshu_CV' });
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS with your Public Key (make sure to use quotes)
        emailjs.init("EYMNVL3BpGpntq7ws"); // Your actual public key
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS (make sure to use quotes for service and template IDs)
            emailjs.sendForm("service_79eb90t", "template_4s5z6dp", this)
                .then(function() {
                    // Success message
                    alert('✅ Message sent successfully!');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    // Error message
                    alert('❌ Failed to send message. Please try again or contact me directly.');
                    console.error('EmailJS Error:', error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}
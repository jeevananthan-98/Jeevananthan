document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Dark Mode Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement; // This refers to the <html> tag

    // Function to set the theme
    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
            themeIcon.classList.remove('fa-moon', 'text-gray-700'); // Remove light mode icon/color
            themeIcon.classList.add('fa-sun', 'text-yellow-400'); // Add dark mode icon/color
        } else {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            themeIcon.classList.remove('fa-sun', 'text-yellow-400'); // Remove dark mode icon/color
            themeIcon.classList.add('fa-moon', 'text-gray-700'); // Add light mode icon/color
        }
        localStorage.setItem('theme', theme); // Save preference
    };

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check OS preference if no saved theme
        setTheme('dark');
    } else {
        setTheme('light'); // Default to light if no preference
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerOffset - 20; // Added 20px padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Reveal Animation Logic ---
    const revealElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-on-scroll', 'is-visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll'); // Add base class for transition
        observer.observe(el);
    });

    // --- Active Navigation Link on Scroll (Optional, but good for UX) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - 50; // Adjusted for header and some padding
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
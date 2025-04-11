document.addEventListener('DOMContentLoaded', function () {
    // Function for toggling project details visibility
    function toggleProjectDetails() {
        // Select all buttons and details containers
        const buttons = document.querySelectorAll('.toggle-details');
        // Loop through buttons and add event listeners
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                // Get the corresponding project details element
                const details = this.nextElementSibling;
                // Toggle visibility of the details and change button text
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block';
                    this.textContent = 'Hide Details';
                } else {
                    details.style.display = 'none';
                    this.textContent = 'Show Details';
                }
            });
        });
    }
    // Function for form validation and error handling
    function validateFormAndHandleSubmission() {
        const form = document.getElementById('contact-form');
        const errorMessage = document.getElementById('error-message');

        form.addEventListener('submit', function (event) {

            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
                errorMessage.style.display = 'block'; // Show error message
            }
        });

        function validateForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                return false; // Validation failed
            }

            // Basic email validation regex
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                return false; // Invalid email format
            }

            return true; // All validations passed
        }
    }

    // New Interactive FAQ Section Function 
    function setupFAQ() {
        const faqs = document.querySelectorAll('.faq-item');

        faqs.forEach(faq => {
            const question = faq.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faq.classList.toggle('active');
            });
        });
    }

    // Function for geolocation support
    function handleGeolocation() {
        // Check if Geolocation is supported
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                alert(`Your location: Latitude: ${lat}, Longitude: ${lon}`);
            }, function (error) {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    // NEW FEATURE: Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get section ID from href
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for header height if needed
                    behavior: 'smooth' // Enable smooth scrolling
                });
            }
        });
    });

    //  **NEW FEATURE: Dark Mode Toggle** 
    function setupDarkModeToggle() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;

        // Load user's dark mode preference from local storage
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');

            // Save user preference to local storage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // New Animation Function: Button Hover Animation
    function animateButtonHover() {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                this.classList.add('hovered'); // Add 'hovered' class on mouse enter
            });

            button.addEventListener('mouseleave', function () {
                this.classList.remove('hovered'); // Remove 'hovered' class on mouse leave
            });
        });
    }

    // Animation for Images
    function animateImages() {
        const images = document.querySelectorAll('.animated-image');

        images.forEach(image => {
            image.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease-in-out';
            });

            image.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
            });
        });
    }


    function animateNavButtonHover() {
        const navButtons = document.querySelectorAll('nav ul li a'); // Targets navigation links
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                this.classList.add('hovered'); // Add hover effect on mouse enter
            });
            button.addEventListener('mouseleave', function () {
                this.classList.remove('hovered'); // Remove hover effect on mouse leave
            });
        });
    }











    // NEW LAZY LOAD IMAGE FEATURE
    // Select all images with the lazy-load class
    const lazyImages = document.querySelectorAll('.lazy-load');

    // Check if an image is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Load the image
    function loadImage(image) {
        const src = image.getAttribute('data-src'); // Get the actual image URL
        if (src) {
            image.src = src; // Set the real src
            image.onload = function () {
                image.classList.remove('lazy-load'); // Remove the lazy-load class when the image is loaded
            };
        }
    }

    // Load images when they come into the viewport
    function handleScroll() {
        lazyImages.forEach(function (image) {
            if (isInViewport(image)) {
                loadImage(image); // Load the image if it’s in the viewport
            }
        });
    }

    // **Add the intersection observer to handle lazy load:**

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                loadImage(image); // Load the image
                observer.unobserve(image); // Stop observing after the image has loaded
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the image is visible
    });

    // Start observing each image with the lazy-load class
    lazyImages.forEach(image => {
        observer.observe(image);
    });

    // Call the individual functions to ensure it is executed
    toggleProjectDetails();
    validateFormAndHandleSubmission();
    handleGeolocation();
    setupDarkModeToggle();
    animateButtonHover();
    animateNavButtonHover();
    setupFAQ();
    animateImages(); 
});
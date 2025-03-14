
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

    // Call the individual functions to ensure it is executed
    toggleProjectDetails();
    validateFormAndHandleSubmission();
    handleGeolocation();
    setupDarkModeToggle();

});
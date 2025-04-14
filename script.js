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

function Calendar(elem) {
    this.elem = elem;
    this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    this.getMonth = function (monthIndex) {
        if (typeof monthIndex !== 'number' || monthIndex < 0 || monthIndex > 11) {
            return "Unknown";
        } else {  // If monthIndex is valid
            // Check each possible value of monthIndex and return the corresponding month name
            if (monthIndex === 0) {
                return "January";
            } else if (monthIndex === 1) {
                return "February";
            } else if (monthIndex === 2) {
                return "March";
            } else if (monthIndex === 3) {
                return "April";
            } else if (monthIndex === 4) {
                return "May";
            } else if (monthIndex === 5) {
                return "June";
            } else if (monthIndex === 6) {
                return "July";
            } else if (monthIndex === 7) {
                return "August";
            } else if (monthIndex === 8) {
                return "September";
            } else if (monthIndex === 9) {
                return "October";
            } else if (monthIndex === 10) {
                return "November";
            } else {
                return "December"; // Return "December" for monthIndex = 11
            }
        }
    }

    this.getDaysInMonth = function (monthIndex, year) {
        if (typeof monthIndex !== 'number' || typeof year !== 'number') {
            return -1;
        }

        if (monthIndex < 0 || monthIndex > 11) {
            return -1;
        }

        if (monthIndex === 1) {
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                return 29;
            } else {
                return 28;
            }
        } else {
            if (monthIndex === 3 || monthIndex === 5 || monthIndex === 8 || monthIndex === 10) {
                return 30;
            } else {
                return 31;
            }
        }
    }

    this.display = function (displayDate = new Date()) {
        this.elem.innerHTML = ""; // Clear the calendar element

        let daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());
        let days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
        }

        // Create table
        let table = document.createElement("table");

        // Create table head (thead)
        let thead = document.createElement("thead");
        table.appendChild(thead);

        // Row for navigation buttons and month name
        let row = document.createElement("tr");
        thead.appendChild(row);

        // Previous month button
        let prevButtonCell = document.createElement("td");
        row.appendChild(prevButtonCell);
        let prevButton = document.createElement("button");
        prevButton.textContent = "<< Previous Month";
        prevButton.addEventListener("click", function () {
            displayDate.setMonth(displayDate.getMonth() - 1);
            this.display(displayDate);
        }.bind(this));
        prevButtonCell.appendChild(prevButton);

        // Month and year header
        let monthYearCell = document.createElement("td");
        monthYearCell.setAttribute("colspan", "5");
        let header = document.createElement("h1");
        header.textContent = this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear();
        monthYearCell.appendChild(header);
        row.appendChild(monthYearCell);

        // Next month button
        let nextButtonCell = document.createElement("td");
        row.appendChild(nextButtonCell);
        let nextButton = document.createElement("button");
        nextButton.textContent = "Next Month >>";
        nextButton.addEventListener("click", function () {
            displayDate.setMonth(displayDate.getMonth() + 1);
            this.display(displayDate);
        }.bind(this));
        nextButtonCell.appendChild(nextButton);

        // Row for day names
        row = document.createElement("tr");
        thead.appendChild(row);
        this.dayNames.forEach(function (day) {
            let cell = document.createElement("th");
            cell.textContent = day;
            row.appendChild(cell);
        });

        // Create table body (tbody)
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // Days of the month
        row = document.createElement("tr");
        tbody.appendChild(row);

        // Empty cells for the days before the first day of the month
        for (let i = 0; i < days[0].getDay(); i++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
        }

        // Days in the month
        days.forEach(function (date) {
            if (date.getDay() === 0) {
                row = document.createElement("tr");
                tbody.appendChild(row);
            }
            let cell = document.createElement("td");
            cell.classList.add("day");
            if (date.toDateString() === new Date().toDateString()) {
                cell.classList.add("today");
            }
            cell.textContent = date.getDate();
            row.appendChild(cell);
        });

        // Empty cells for the days after the last day of the month
        for (let i = days[days.length - 1].getDay() + 1; i < 7; i++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
        }

        // Append table to the calendar element
        this.elem.appendChild(table);
    }
}

const cal = new Calendar(document.getElementById("calendar"));
cal.display();

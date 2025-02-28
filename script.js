// Function for toggling project details visibility
document.addEventListener('DOMContentLoaded', function () {
    
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

    // Call the individual functions to ensure it is executed
    toggleProjectDetails();

});
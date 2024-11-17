console.log("i am here")
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("lunch-box-form");

    // Form submission handler
    form.addEventListener("submit", (event) => {
        // Prevent form submission to allow validation
        event.preventDefault();

        if (validateForm()) {
            // If validation is successful, show success message
            document.getElementById("success-message").textContent = "Your order has been successfully submitted!";
            form.reset(); // Reset the form after submission
        }
    });

    function validateForm() {
        // Reset any previous error messages
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('phone-error').textContent = '';
        document.getElementById('lunch-box-error').textContent = '';
        document.getElementById('success-message').textContent = ''; // Clear any previous success message

        let isValid = true;
        let errorMessage = '';

        // Validate Name
        const name = document.getElementById('name').value;
        if (!name.trim()) {
            document.getElementById('name-error').textContent = 'Name is required.';
            isValid = false;
            errorMessage += 'Name is required.\n';
        }

        // Validate Email
        const email = document.getElementById('email').value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.match(emailPattern)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }

        // Validate Phone Number
        const phone = document.getElementById('phone').value;
        const phonePattern = /^[0-9]{11}$/; // Allow only 10 digit phone numbers
        if (!phone.match(phonePattern)) {
            document.getElementById('phone-error').textContent = 'Phone number must contain 11 digits.';
            isValid = false;
            errorMessage += 'Phone number must contain 11 digits.\n';
        }

        // Validate Lunch Box Selection
        const lunchBox = document.getElementById('lunch-box').value;
        if (!lunchBox) {
            document.getElementById('lunch-box-error').textContent = 'Please select a lunch box.';
            isValid = false;
            errorMessage += 'Please select a lunch box.\n';
        }

        // Show alert with errors if validation fails
        if (!isValid) {
            console.log('Validation failed:', errorMessage);  // Debugging line
            return false; // Prevent form submission if validation fails
        }

        return isValid; // Return true if all validation checks pass
    }
});

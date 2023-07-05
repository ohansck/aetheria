// Define regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{1,15}$/;
const ageRegex = /^\d+$/;

// Get form and input elements
const form = document.querySelector('form') as HTMLFormElement;
const firstNameInput = document.getElementById('firstname') as HTMLInputElement;
const lastNameInput = document.getElementById('lastname') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const ageInput = document.getElementById('age') as HTMLInputElement;
const countryInput = document.getElementById('country') as HTMLInputElement;
const genderSelect = document.getElementById('gender') as HTMLSelectElement;

// Add event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const age = ageInput.value.trim();
    const country = countryInput.value.trim();
    const gender = genderSelect.value;

    // Validate input values using regular expressions
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);
    const isAgeValid = ageRegex.test(age);

    // If any input value is invalid, display an error message
    if (!isEmailValid || !isPhoneValid || !isAgeValid) {
        console.log('Invalid input values');
        return;
    }

    // Create payload object with input values
    const payload = {
        firstName,
        lastName,
        email,
        phone,
        age: parseInt(age),
        country,
        gender
    };

    // Send data to sample endpoint using Fetch API
    fetch('https://oc719pbu4a.execute-api.us-east-1.amazonaws.com/test/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
    })
        .then((response) => {
            // const rr = JSON.parse(response);
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            console.log('Form submitted successfully');
            // Reset the form after successful submission
            form.reset();
        })
        .catch((error) => {
            console.error(error);
        });
});

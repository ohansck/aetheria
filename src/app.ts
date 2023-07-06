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
const linkedinInput = document.getElementById('linkedin') as HTMLInputElement;
const blogInput = document.getElementById('blog') as HTMLInputElement;
const genderSelect = document.getElementById('gender') as HTMLSelectElement;
const formSubmit = document.getElementById('submit') as HTMLButtonElement;
const submitMessage = document.querySelector('.submit-message') as HTMLDivElement;
// Add event listener for form submission
form.addEventListener('submit', async (event) => {

    event.preventDefault(); // Prevent default form submission

    //Show user submission is loading
    formSubmit.toggleAttribute('disabled', true);
    formSubmit.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Sending...</span>
    </div>`;

    // Get input values
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const age = ageInput.value.trim();
    const country = countryInput.value.trim();
    const gender = genderSelect.value;
    const linkedin = linkedinInput.value.trim();
    const blog = blogInput.value.trim();

    // Validate input values using regular expressions
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);
    const isAgeValid = ageRegex.test(age);

    // If any input value is invalid, display an error message
    if (!isEmailValid || !isPhoneValid || !isAgeValid) {
        console.log('Invalid input values');
        submitMessage.innerText = 'Invalid email, phone or age';
        formSubmit.toggleAttribute('disabled', false);
        formSubmit.innerHTML = 'I Accept';
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
        gender,
        linkedin,
        blog
    };

    //Send data to sample endpoint using Fetch API

    try {
        const response = await fetch('https://oc719pbu4a.execute-api.us-east-1.amazonaws.com/test/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        const data = await response.json();

        if (data.message || data.message === "The conditional request failed") {
            throw new Error('Email already registered');
        } else {
            form.reset();
            console.log(data);
        }
        console.log('Form submitted successfully');
        // Reset the form after successful submission

    } catch (error: any) {
        submitMessage.innerText = `${error.message}`;
    }

    formSubmit.toggleAttribute('disabled', false);
    formSubmit.innerHTML = 'I Accept';
});

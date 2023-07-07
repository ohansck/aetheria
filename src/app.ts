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
    const firstname = firstNameInput.value.trim();
    const lastname = lastNameInput.value.trim();
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


    try {


        // If any input value is invalid, display an error message
        if (!isEmailValid || !isPhoneValid || !isAgeValid) {
            //console.log('Invalid input values');
            submitMessage.innerText = 'Invalid email, phone or age';
            formSubmit.toggleAttribute('disabled', false);
            formSubmit.innerHTML = 'I Accept';
            return;
        }

        const currentDate1 = new Date();
        const convertedDate1 = convertToUTCPlusOne1(currentDate1);

        // Create payload object with input values
        const payload = {
            firstname,
            lastname,
            email,
            phone,
            age: parseInt(age),
            country,
            gender,
            linkedin,
            blog,
            date: convertedDate1
        };

        //Send data to sample endpoint using Fetch API

        try {
            const response = await fetch('https://oc719pbu4a.execute-api.us-east-1.amazonaws.com/prod/users', {
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
                submitMessage.innerText = 'Successful';
                form.reset();
                //console.log(data);
            }
            //console.log('Form submitted successfully');
            // Reset the form after successful submission

        } catch (error: any) {
            submitMessage.innerText = `${error.message}`;
        }
    } catch (error: any) {
        console.log(error.message);
    }
    formSubmit.toggleAttribute('disabled', false);
    formSubmit.innerHTML = 'I Accept';
});

function convertToUTCPlusOne1(date: Date): Date {
    const utcOffset = date.getTimezoneOffset(); // Get the current timezone offset in minutes
    const utcPlusOneOffset = 60; // UTC+1 offset in minutes

    // Calculate the new timestamp by adding the offset difference
    const newTimestamp = date.getTime() + (utcOffset - utcPlusOneOffset) * 60000; // Convert minutes to milliseconds

    // Create a new Date object with the adjusted timestamp
    const utcPlusOneDate = new Date(newTimestamp);

    return utcPlusOneDate;
}
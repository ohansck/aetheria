// Define regular expressions for validation
const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCheck = /^\+?\d{1,15}$/;
const ageCheck = /^\d+$/;

// Get form and input elements
const form1 = document.querySelector('form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const subjectInput = document.getElementById('subject') as HTMLInputElement;
const emailInput1 = document.getElementById('email') as HTMLInputElement;
const messageInput = document.getElementById('message') as HTMLTextAreaElement;
const formSubmit1 = document.getElementById('submit') as HTMLButtonElement;
const submitMessage1 = document.querySelector('.submit-feedback') as HTMLDivElement;
// Add event listener for form submission
form1.addEventListener('submit', async (event) => {

  event.preventDefault(); // Prevent default form submission

  //Show user submission is loading
  formSubmit1.toggleAttribute('disabled', true);
  formSubmit1.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Sending...</span>
    </div>`;

  // Get input values
  const name = nameInput.value.trim();
  const email = emailInput1.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();
  //const date = countryInput.value.trim();

  // Validate input values using regular expressions
  const isEmailValid = emailCheck.test(email);
  try {


    // If any input value is invalid, display an error message
    if (!isEmailValid) {
      console.log('Invalid input values');
      submitMessage1.innerText = 'Invalid email';
      formSubmit1.toggleAttribute('disabled', false);
      formSubmit1.innerHTML = 'Submit';
      return;
    }

    // Get current date and time in UTC+1 timezone
    const currentDate = new Date();
    const convertedDate = convertToUTCPlusOne(currentDate);
    // var options: Intl.DateTimeFormatOptions = {
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    //   timeZone: 'UTC +01:00',
    //   timeZoneName: 'short'
    // };
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    //console.log(convertedDate);
    // Create payload object with input values
    const payload = {
      name,
      subject,
      email,
      message,
      date: convertedDate
    };

    //Send data to sample endpoint using Fetch API

    try {
      const response = await fetch('https://oc719pbu4a.execute-api.us-east-1.amazonaws.com/prod/contact', {
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
        submitMessage1.innerText = 'Successful';
        form1.reset();
        //console.log(data);
      }
      //console.log('Form submitted successfully');
      // Reset the form after successful submission

    } catch (error: any) {
      submitMessage1.innerText = `${error.message}`;
    }

    formSubmit1.toggleAttribute('disabled', false);
    formSubmit1.innerHTML = 'Submit';
  } catch (error: any) {
    console.log(error.message)
  }
  formSubmit1.toggleAttribute('disabled', false);
  formSubmit1.innerHTML = 'Submit';
});


function convertToUTCPlusOne(date: Date): Date {
  const utcOffset = date.getTimezoneOffset(); // Get the current timezone offset in minutes
  const utcPlusOneOffset = 60; // UTC+1 offset in minutes

  // Calculate the new timestamp by adding the offset difference
  const newTimestamp = date.getTime() + (utcOffset - utcPlusOneOffset) * 60000; // Convert minutes to milliseconds

  // Create a new Date object with the adjusted timestamp
  const utcPlusOneDate = new Date(newTimestamp);

  return utcPlusOneDate;
}

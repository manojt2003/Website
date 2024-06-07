const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
	const signUpForm = document.getElementById('signup-form');
  
	signUpForm.addEventListener('submit', async (event) => {
	  event.preventDefault();
	  const formData = new FormData(signUpForm);
	  console.log(formData);
	  
	  try {
		const response = await fetch('/sign_up', {
		  method: 'POST',
		  body: formData,
		});
		
		if (response.ok) {
		  const data = await response.json();
		  alert(data.message); // Display a success message
		} else {
		  const errorData = await response.json();
		  alert(errorData.message); // Display an error message
		}
	  } catch (error) {
		console.error('Error:', error);
	  }
	});
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/login"]');
    const loginEmailInput = document.getElementById('loginEmail'); // Get the email input
    const loginPasswordInput = document.getElementById('loginPassword'); // Get the password input

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const loginEmail = loginEmailInput.value; // Get the email input value
        const loginPassword = loginPasswordInput.value; // Get the password input value

        try {
            const response = await fetch('/YOUR_LOGIN_ROUTE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loginEmail, loginPassword }), // Send the email and password
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); 
                // Redirect to a success page (e.g., stuindex.html)
                window.location.href = '/stuindex.html';
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Display an error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

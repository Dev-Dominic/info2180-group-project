/* OTHER FUNCTIONS */

export async function login(email, password){
	let response = await fetch("../php_scripts/login.php", {
		method: 'POST', 
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"email": email.value,
			"password": password.value,
		})
	});

	return response.json();
}

// Creates JSON object with user data from newUser form
export function retrieveUserFormData(){
	return {
		"firstname": document.querySelector("#fname").value,
		"lastname": document.querySelector("#lname").value,
		"password": document.querySelector("#userPassword").value,
		"email": document.querySelector("#userEmail").value,
	};
}

// Clears login form fields 
export function clearLogin(email, password){
	email.value = "";
	password.value = "";
}

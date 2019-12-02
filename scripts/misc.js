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

export async function logout(){

}

export async function newUser(newUserInfo){

}

export async function newIssue(newUserInfo){

}

// Clears login form fields 
export function clearLogin(email, password){
	email.value = "";
	password.value = "";
}

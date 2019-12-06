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

export function retrieveIssueFormData(){
	let issueData = {
		"title": document.querySelector("#title").value,
		"description": document.querySelector("#description").value,
		"assigned_to": document.querySelector("#assigned_to").value,
		"type": document.querySelector("#type").value,	
		"priority": document.querySelector("#priority").value,
	};

	document.querySelector("#newIssueForm").reset();
	return issueData;
}

// Loads New Issue page information for Assigned To
export function createIssuePageInfo(){
	fetch("/php_scripts/getAllUsers.php")
		.then(response => response.json())
		.then(response => {
			// Assigned to dropdown selection 
			const assignedTo = document.querySelector("#assigned_to");

			for(let i = 0; i < response.length; i++){
				let selection = document.createElement("option");
				selection.appendChild(document.createTextNode(response[i]["fullname"]));

				assignedTo.appendChild(selection);
			}
		});
}

// Clears login form fields 
export function clearLogin(email, password){
	email.value = "";
	password.value = "";
}

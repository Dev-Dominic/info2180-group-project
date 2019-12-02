/* Main Module JS */

// Imports
import { windowLoad, pageRenderQuery, loginSubmission, newUserQuery }   from "./events.js";
import { retrieveUserFormData } from "./misc.js";

// Login load
window.addEventListener("load", e => windowLoad(e)); 

// Used to detect dynamically generate dom elements
document.addEventListener('click',e => {
	e.preventDefault();
	if(!e.target)
		return;

	let targetClass = e.target.className;

	switch(targetClass){
		case "home":
			pageRenderQuery(e, "home");
			break;
		case "addUserPage":
			pageRenderQuery(e, "newUser");
			break;
		case "newUser":
			break;
		case "createIssue":
			pageRenderQuery(e, "createIssue");
			break;
		case "logout":
			pageRenderQuery(e, "logout");
			break;
		case "newUserBtn":
			// Query to add new user 
			newUserQuery(retrieveUserFormData())
				.then(response => {
					if(!response['status']){
						alert(response["body"]);
						return;
					}

					alert("SUCCESSFULLY ADDED USER");
				});
			break;
	}
});



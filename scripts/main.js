/* Main Module JS */

// Imports
import { windowLoad, pageRenderQuery, loginSubmission, newUserQuery, createNewIssue }   from "./events.js";
import { retrieveUserFormData, retrieveIssueFormData, retrieveIssues ,createIssuePageInfo, populateIssueDetail } from "./misc.js";

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
			retrieveIssues("ALL");
			break;
		case "addUserPage":
			pageRenderQuery(e, "newUser");
			break;
		case "newUser":
			break;
		case "createIssue":
		case "newIssue":
			pageRenderQuery(e, "createIssue");
			createIssuePageInfo();// Runs query to update Assigned to selection with user names  
			break;
		case "issue":
			pageRenderQuery(e, "details");

			// Retrieves issueID and populates detail page
			populateIssueDetail(e.target.innerText[1]); 
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
		case "newIssueBtn":
			createNewIssue(retrieveIssueFormData())
				.then(response => {
					if(!response['status']){
						console.log(response["body"]);
						alert(response["body"]);
						return;
					}
					
					alert("SUCCESSFULLY CREATE ISSUE");
				});
			break;
	}
});



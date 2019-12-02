/* Main Module JS */

// Imports
import { windowLoad, pageRenderQuery, loginSubmission }   from "./events.js";

// Login load
window.addEventListener("load", e => windowLoad(e)); 

document.addEventListener('click',e => {
	e.preventDefault();

	if(e.target && e.target.className == 'home')
		pageRenderQuery(e, "home");
    if(e.target && e.target.className == 'addUserPage')
		pageRenderQuery(e, "newUser");
    if(e.target && e.target.className == 'createIssue')
		pageRenderQuery(e, "createIssue");
    if(e.target && e.target.className == 'logout')
		pageRenderQuery(e, "logout");
});



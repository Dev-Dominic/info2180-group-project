/* Event functions Lsiteners */
import { renderPage } from "./renderpage.js";
import { login, clearLogin } from "./misc.js";

// MainView 
const mainView = document.querySelector("#main");

let email = null;
let password = null;

/* If page is reloaded and still have user session they are redirected to home page(with all issues) */
export function windowLoad(){
	renderPage("login")
		.then(response  => {
			console.log(response);
			if(!response['status']){
				alert(response["body"]);
				clearLogin();
				return;
			}

			mainView.innerHTML = response["body"];

			let logInBtn = document.querySelector("#loginBtn");
			email = document.querySelector("#email"); 
			password = document.querySelector("#pword");

			loginSubmission(logInBtn);
		});
}

// Login
export function loginSubmission(logInBtn){
	if(logInBtn == null)
		return ;

	logInBtn.addEventListener("click", e  => {
		e.preventDefault();
		login(email, password)
			.then(response  => {

				console.log(response['status']);
				// Handling form response from login fetch query
				if(!response['status']){
					alert(response["body"]);
					clearLogin(email, password);
					return;
				}

				renderPage("home")
					.then(response => {
						if(!response['status']){
							alert(response["body"]);
							clearLogin(email, password);
							return;
						}

						// Renders Page and sets page buttons
						mainView.innerHTML = response["body"];
					});
			});
	});
}

export function pageRenderQuery(e, page){
	renderPage(page)
		.then(response => {
			if(!response['status']){
				alert(response["body"]);
				return;
			}

			mainView.innerHTML = response["body"];

			// Handles login page logic
			let logInBtn = document.querySelector("#loginBtn");
			email = document.querySelector("#email"); 
			password = document.querySelector("#pword");

			if(logInBtn != null)
				loginSubmission(logInBtn);
		});
}

// Makes FETCH POST request to add new user
export async function newUserQuery(userInfo){
	let userAdded = await fetch("/php_scripts/newUser.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(userInfo)
	});

	return userAdded.json();
}

// Makes FETCH POST request to add new user
export async function createNewIssue(issueInfo){
	let issueAdded= await fetch("/php_scripts/createNewIssue.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(issueInfo)
	});

	return issueAdded.json();
}

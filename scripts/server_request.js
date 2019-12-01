/* ALL AJAX REQUEST */

// Global DOM elements
const logInBtn = document.querySelector("#loginBtn");
const email = document.querySelector("#email"); 
const password = document.querySelector("#pword");

logInBtn.addEventListener("click", e  => {
	e.preventDefault();
	login()
		.then(data  => {
			console.log(data);
		});
	/*
	renderPage("")
		.then(data => {
			console.log(data);					
		});*/
});

async function login(){
	let response = await fetch("/php_scripts/login.php", {
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

async function renderPage(page){
	let page_response = await fetch(`/php_scripts/pageController.php?context=${page}`);
	return page_response.text();
}



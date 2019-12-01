/* ALL AJAX REQUEST */

// Global DOM elements
const mainView = document.querySelector("#main");

/* Event Listeners */
// Login load
window.addEventListener("load",() => {
	renderPage("login")
		.then(response  => {
			if(!response['status']){
				alert(response["body"]);
				clearLogin();
				return;
			}

			mainView.innerHTML = response["body"];
			// Login DOM elements
			const logInBtn = document.querySelector("#loginBtn");
			const email = document.querySelector("#email"); 
			const password = document.querySelector("#pword");

			// Login
			logInBtn.addEventListener("click", e  => {
				e.preventDefault();
				login(email, password)
					.then(response  => {

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

								mainView.innerHTML = response["body"];
							});
					});
			});
		});
});


/* End of Event Listeners */

async function login(email, password){
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

async function renderPage(page){
	let page_response = await fetch(`/php_scripts/pageController.php?context=${page}`);
	return page_response.json();
}

function clearLogin(email, password){
	email.value = "";
	password.value = "";
}

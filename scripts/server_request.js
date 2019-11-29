/* ALL AJAX REQUEST */

const logInBtn = document.querySelector("#btn");

logInBtn.addEventListener("click", () => {
	renderPage(page)
		.then(() => {
					
		});
});

async function renderPage(page){
	let page_response = await fetch(`pageController.php/context=${page}}`)
	return page_response.text();
}



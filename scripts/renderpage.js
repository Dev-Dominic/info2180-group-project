
export async function renderPage(page){
	let page_response = await fetch(`/php_scripts/pageController.php?context=${page}`);
	return page_response.json();
}


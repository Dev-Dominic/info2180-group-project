# PHP TODO

## Setup server connection with server.php file

1. User login(Finished)
	* Make AJAX request to login.php
	* login.php:
		1. Check if POST is set and if post is empty
		2. Sanitize username and password
		3. Make a PDO prepared statement query to database with username and password
		4. Return all user information from database(excluding password) or false 
		5. Start session and store currently logged in user information in SESSION superglobal 
		6. Make AJAX request to pageController.php to render new page

2. Create New User 

3. Create New Issue 

4. Viewing all Issues(DASHBOARD HOME) 

5. Viewing Issue

6. Servering Pages(Finished)
	* Make AJAX request to pageController.php with context detailing what page to fetch
	* pageController.php:
		1. Check context to determine what page to send as response  
		2. Send requested html as reponse  

7. Formating HTML Pages 
	1. Formating Login Page


## Formating Javascript modules
1. Main.js(Connected to index.html)
2. RenderPage.js
3. Functions to Handdle evenListeners
4. MISC functions(eg. clearLogin)  
5. domElements.js stores all dom elements 

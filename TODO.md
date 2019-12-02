# TODO

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

2. Create New User(Finished)
	* Make AJAX POST request to newUser.php
	* newUser.php:
		1. Check if valid POST request and if user making request currently has a session
		2. Santize data field inputs
		4. Ensure that the password is valid
		3. HASH password
		3. Make a PDO prepared statement inerstion into database with:
			* firstname
			* lastname
			* hashed password
			* email

3. Create New Issue 
	* 

4. Viewing all Issues(DASHBOARD HOME) 

5. Viewing Issue(Details)

6. Serving Pages(Finished)
	* Make AJAX request to pageController.php with context detailing what page to fetch
	* pageController.php:
		1. Check context to determine what page to send as response  
		2. Send requested html as reponse  

## Formating Javascript modules(Finished)
1. Main.js(Connected to index.html)
2. RenderPage.js
3. Events.js Functions to Handle evenListeners
4. MISC functions(eg. clearLogin)  

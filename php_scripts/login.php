<?php 
	
	include_once "errors.php";
	include_once "server.php";

	/* Handles User login  */
	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	if ($contentType !== "application/json" && !isset($_POST))
		exit(json_encode(errMsg("")));

	// Retrieving form data 
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content, true);

	// Query Database using user email 
	$conn = newConnection();
	$stmt = $conn->prepare("SELECT * FROM Users WHERE email=:email");
	$stmt->bindParam(":email", $decoded['email']);
	
	$stmt->execute();	
	$result = $stmt->fetch();

	// Checking if user is present in database
	// Returns an error otherwise
	if(!$result)
		exit(json_encode(errMsg("loginFailed")));

	/*  
		Check whehther logged in user is admin 
		Admin uses MD5 hash while normal users use PHP password hashing
	*/
	if($result['firstname'] == "Admin"){
		if(md5($decoded['password']) != $result['password'])
			exit(json_encode(errMsg("loginFailed")));
	}
			
	// Checking password validaity of normal user
	if(!password_verify($decoded['password'], $result['password']) && $result['firstname'] != "Admin")
		exit(json_encode(errMsg("loginFailed")));

	// Starting session if valid user
	session_start();
	$_SESSION["userID"] = $result['userID'];
	$_SESSION["loggedIn"] = 1;

	exit(json_encode(array("status" => true, "body" => "")));


?>

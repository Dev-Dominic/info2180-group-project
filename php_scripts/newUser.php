<?php 

	/* Adding new User to database */

	session_start();	
	include_once "errors.php";
	include_once "server.php";
	include_once "misc.php";

	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	if ($contentType !== "application/json" || !isset($_POST))
		exit(json_encode(errMsg("")));

	// Requires a valid user session
	if(!isset($_SESSION) || !isset($_SESSION['loggedIn']))	
		exit(json_encode(errMsg("session")));

	// Retrieving form data 
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content, true);

	// Sanitize form results
	$decoded = sanitize($decoded);

	// Validating password and email
	$regexPass = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/";
	if(!preg_match($regexPass, $decoded["password"]) || !filter_var($decoded["email"], FILTER_VALIDATE_EMAIL))
		exit(json_encode(errMsg("newUserErr")));

	$hash_password = password_hash($decoded["password"], PASSWORD_DEFAULT);

	try{
		// Database Insertion
		$conn = newConnection();	
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$stmt = $conn->prepare("
			INSERT INTO Users (firstname, lastname, password, email)
			VALUES (?, ?, ?, ?)
		");

		$stmt->execute([$decoded["firstname"], $decoded["lastname"], $hash_password, $decoded["email"]]);

		//  database
		exit(json_encode(["status" => true, "body" => ""]));
	}catch(Exception $e){
		exit(json_encode(["status" => false, "body" => "Error occured adding new User"]));
	}

?>

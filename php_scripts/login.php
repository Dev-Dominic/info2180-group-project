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

	// Query Database 
	$conn = newConnection();
	
	exit(json_encode($decoded));

?>

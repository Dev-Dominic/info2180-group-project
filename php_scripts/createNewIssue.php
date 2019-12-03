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

	// Query for person to assign to 
	$getID = newConnection();
	$fullname = $decoded['assigned_to'];
	$assigned_to_id = $getID->query("SELECT userID FROM Users WHERE CONCAT(firstname, ' ', lastname)='$fullname'")->fetch()['userID'];

	// Database Insertion
	$conn = newConnection();	
	$stmt = $conn->prepare("
		INSERT INTO Issues (title, description, assigned_to, created_by, type, priority)
		VALUES (?, ?, ?, ?, ?, ?)
	");

	$stmt->execute([
		$decoded["title"], 
		$decoded["description"], 
		$assigned_to_id,
		$_SESSION['userID'],
		$decoded["type"],
		$decoded["priority"],
	]);

	//  database
	exit(json_encode(["status" => true, "body" => ""]))

?>

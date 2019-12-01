<?php

	session_start();
	include_once "errors.php";

	// Page Redirects
	$pages = ["base","home", "details", "newUser", "createIssue", "login"];
	$htmlDir = "../views/"; // Html root directory files

	if(!isset($_GET) || empty($_GET) || !in_array($_GET['context'], $pages))
		exit(json_encode(errMsg("page")));
	
	// Testing if user is currently in a session 
	if((!isset($_SESSION) || empty($_SESSION) || $_SESSION['loggedIn'] != 1) && $_GET['context'] != "login")
		exit(json_encode(errMsg("session")));
		
	// Page to be rendered
	exit(json_encode(
		array(
			"status" => true, 
			"body" => file_get_contents($htmlDir . $_GET['context'].".html")
			)
		)
	);

?>

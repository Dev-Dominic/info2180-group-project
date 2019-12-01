<?php

	include_once "errors.php";

	// Page Redirects
	$pages = ["home", "details", "newUser", "createIssue", "index"];
	$htmlDir = "../public/"; // Html root directory files


	if(!isset($_GET) || empty($_GET) || in_array($_GET['context'], pages))
		exit(errMsg("page"));
	
	// Testing if user is currently in a session 
	session_start();
	if(!isset($_SESSION) || empty($_SESSION) || $_SESSION['loggedIn'] != 1)
		exit(errMsg("session"));
		
	exit(readfile($htmlDir . $_GET['context'].". html"));

?>

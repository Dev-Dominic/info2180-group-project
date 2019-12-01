<?php 
	// Allows for connection to info2180-group-project database
	// newConnection setups up PDO connection with database
	function newConnection(){
		$host = "localhost";
		$user = "admin";
		$password = "info2180-project";
		$db = "info2180_bugme_issue_tracker";
		return new PDO("mysql:host=$host;dbname=$db", $user, $password);
	}

?>

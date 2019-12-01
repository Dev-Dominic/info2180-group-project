<?php 
	// Allows for connection to info2180-group-project database
	// newConnection setups up PDO connection with database

	$host = "localhost";
	$user = "admin"
	$password = "info2180-project"
	$db = "info2180-group-project";

	function newConnection(){
		return new PDO("mysql:host=$host;dbname=$db", $user, $password);
	}

?>

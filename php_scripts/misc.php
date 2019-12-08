<?php 

	include_once "server.php";	

	// Sends all users stored in database	
	function getAllUserName(){
		exit(json_encode(
			newConnection()->query("SELECT CONCAT(firstname,' ' ,lastname) as fullname FROM Users")->fetchAll()
		));	
	}


	// Sends all issues stored in database
	function getIssues($context){
		$required_rows = "i.issueID, i.title, i.issueType, i.status, CONCAT(u.firstname, ' ', u.lastname) AS fullname, i.created";
		$table = "Issues";

		// Returns all Issues
		if($context == "ALL")
			$sql = "SELECT $required_rows FROM $table i JOIN Users u ON i.assigned_to=u.userID";

		// Returns all OPEN Issues
		if($context == "OPEN")
			$sql = "SELECT $required_rows FROM $table WHERE status = OPEN";
		
		// Returns all current user Issues
		if($context == "CURRENT_USER")
			$sql = "SELECT $required_rows FROM $table WHERE assigned_to = {$_SESSSION['userID']}";

		try{
			$conn = newConnection();
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			// Quering of database
			$results = $conn->query($sql)->fetchAll();

			exit(json_encode(array("status" => true, "body" => $results)));
		}catch(Exception $e){
			exit(json_encode(array("status" => false, "body" => "An Error Occured")));
		}
	}

	/* Stores all other useful functions */

	// Form Sanitze funcion
	function sanitize($unsanitized){
		$sanitize = array(); 
		foreach($unsanitized as $key => $value)
			$sanitize[$key] = htmlspecialchars($value);

		return $sanitize;
	}

?>

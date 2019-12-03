<?php 

	// Sends all users stored in database	
	if(isset($_GET)){
	//	if($_GET['context'] == "getAllUsers"){
			include_once "server.php";	
			exit(json_encode(
				newConnection()->query("SELECT CONCAT(firstname,' ' ,lastname) as fullname FROM Users")->fetchAll()
			));	
	//	}
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

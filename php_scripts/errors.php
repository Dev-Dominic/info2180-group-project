<?php 
	// Returns error message based on type passed
	function errMsg($type){
		switch($type){
			case "session":
				$err =  "Restricted Access: Not Currently Logged In"; 
				break;
			case "page":
				$err =  "404 Error: Page Not Found";
				break;
			case "loginFailed":
				$err = "Failed to Login";
				break;
			default:
				$err = "An Error occured";
				break;
		}	

		return array( 
			"status" => false,
			"body" => $err
		);
	}
?>

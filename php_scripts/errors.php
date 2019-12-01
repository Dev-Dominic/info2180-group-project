<?php 
	// Returns error message based on type passed
	function errMsg($type){
		switch($type){
			case "session":
				return "Restricted Access: Not Currently Logged In";
				break;
			case "page":
				return "404 Error: Page Not Found";
				break;
			default:
				return "An Error occured";
				break;
		}	
	}
?>

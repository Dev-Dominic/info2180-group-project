<?php

	include_once 'misc.php';


	if(!isset($_GET) && !isset($_GET['context']))		
		exit(json_encode(array("status" => false, "body" => "An Error Occured")));

	// Filtering context 
	$context = filter_var($_GET['context'],FILTER_SANITIZE_STRING);

	getIssues($context);

?>

<?php 

	include_once 'misc.php';

	if(!isset($_GET) || !isset($_GET['status']) || !isset($_GET['issueID']))		
		exit(json_encode(array("status" => false, "body" => "An Error Occured")));

	// Filtering context 
	$status = filter_var($_GET['status'], FILTER_SANITIZE_STRING);
	$issueID = filter_var($_GET['issueID'], FILTER_SANITIZE_STRING);

	if(!in_array($status, ["CLOSED", "IN PROGRESS"]))
		exit(json_encode(array("status" => false, "body" => "Invalid Status Request")));

	changeStatus($status, $issueID);
?>

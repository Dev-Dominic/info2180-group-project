<?
	include_once 'misc.php';

	if(!isset($_GET) && !isset($_GET['issueID']))		
		exit(json_encode(array("status" => false, "body" => "An Error Occured")));

	// Filtering context 
	$issueID  = filter_var($_GET['issueID'],FILTER_SANITIZE_STRING);

	exit(json_encode($issueID));
	getIssue($issueID);
?>

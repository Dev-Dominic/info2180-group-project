<?php

	$pages = ["home", "details", "newUser", "createIssue", "index"]

	if(isset($_GET['context']){
		if(in_array($_GET['context'],pages)){
			exit(readfile($_GET['context'].".html"));
		}	

		exit("404 ERROR: PAGE NOT FOUND");
	}
?>

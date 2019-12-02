<?php 

	/* Stores all other useful functions */

	// Form Sanitze funcion
	function sanitize($unsanitized){
		$sanitize = array();

		foreach($unsanitized as $key => $value)
			$sanitize[$key] = htmlspecialchars($value);

		return $sanitize;
	}

?>

/* OTHER FUNCTIONS */

export async function login(email, password){
	let response = await fetch("../php_scripts/login.php", {
		method: 'POST', 
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			"email": email.value,
			"password": password.value,
		})
	});

	return response.json();
}

// Creates JSON object with user data from newUser form
export function retrieveUserFormData(){
	let userData =  {
		"firstname": document.querySelector("#fname").value,
		"lastname": document.querySelector("#lname").value,
		"password": document.querySelector("#userPassword").value,
		"email": document.querySelector("#userEmail").value,
	};

	document.querySelector("#newUserForm").reset();
	return userData;
}

export function retrieveIssueFormData(){
	let issueData = {
		"title": document.querySelector("#title").value,
		"description": document.querySelector("#description").value,
		"assigned_to": document.querySelector("#assigned_to").value,
		"type": document.querySelector("#type").value,	
		"priority": document.querySelector("#priority").value,
	};

	document.querySelector("#newIssueForm").reset();
	return issueData;
}

// Loads New Issue page information for Assigned To
export function createIssuePageInfo(){
	fetch("/php_scripts/getAllUsers.php")
		.then(response => response.json())
		.then(response => {
			// Assigned to dropdown selection 
			const assignedTo = document.querySelector("#assigned_to");

			for(let i = 0; i < response.length; i++){
				let selection = document.createElement("option");
				selection.appendChild(document.createTextNode(response[i]["fullname"]));

				assignedTo.appendChild(selection);
			}
		});
}

export function retrieveIssues(context){
	fetch(`php_scripts/getIssues.php?context=${context}`)
		.then(response => response.json())
		.then(response => {
			populateIssues(response["body"]);		
		});
}

function populateIssues(results){
	function addCol(row, text){
		let col = document.createElement("td");
		col.appendChild(document.createTextNode(text));

		row.appendChild(col);
	}
	
	for(let i = 0; i < results.length; i++){
		let currRow = document.createElement("tr");

		// Title and IssueID field 
		let col = document.createElement("td");
		col.appendChild(document.createTextNode(`#${results[i]["issueID"]} ${results[i]["title"]}`));
		col.classList.add("issue");
		currRow.appendChild(col);

		// Adding other columsn to current row
		addCol(currRow, results[i]["issueType"]);
		addCol(currRow, results[i]["status"]);
		addCol(currRow, results[i]["fullname"]);
		addCol(currRow, results[i]["created"]);
		
		document.querySelector("#issuesBody").appendChild(currRow);
	}
}

export function populateIssueDetail(issueID){
	fetch(`php_scripts/getIssue.php?issueID=${issueID}`)
		.then(response => response.json())
		.then(response  => {
			populateDetailPage(response["body"][0]);
		});
}

function populateDetailPage(results){
	// Header
	document.querySelector("#details_main_title").innerHTML = results["title"];
	document.querySelector("#details_subtitle").innerHTML = `Issue #${results["issueID"]}`;
	
	// Main content
	document.querySelector("#issue_desc").innerHTML = results["description"];
	document.querySelector("#created").innerHTML = `Created: ${results["created"]}`;
	document.querySelector("#updated").innerHTML = `Updated: ${results["updated"]}`;

	// Side column
	document.querySelector("#assigned_to p").innerHTML = results["fullnameAS"];
	document.querySelector("#type p").innerHTML = results["issueType"];
	document.querySelector("#priority p").innerHTML = results["priority"];
	document.querySelector("#status p").innerHTML = results["status"];

	// Button Group setting issueID
	document.querySelector("#issueIDHidden").setAttribute("value", results["issueID"]);
}

export function changeStatus(issueStatus, issueID){
	fetch(`/php_scripts/changeStatus.php?status=${issueStatus}&issueID=${issueID}`)
		.then(response => response.json())
		.then(response => {
			if(!response['status']){
				alert(response["body"]);
				return;
			}

			alert(`CHANGED STATUS TO: ${issueStatus}`);
		});
}

export function clearLogin(email, password){
	email.value = "";
	password.value = "";
}

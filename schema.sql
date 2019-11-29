/* schema file for info2180-group-project */

DROP DATABASE info2180-bugme-issue-tracker;
USE DATABASE info2180-bugme-issue-tracker;

/* Creating User Database */
CREATE TABLE Users(
	userID INT NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL, 
	email VARCHAR(25) NOT NULL, 
	date_joined DATE DEFAULT CURRENT_TIMESTAMP 
	PRIMARY KEY(userID)
); 

/* Default User */
INSERT INTO User (firstName, lastName, password, email) 
VALUES("Admin", "", md5("password123"), "admin@bugme.com");

CREATE TABLE Issues(
	issueID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	description TEXT NOT NULL,
	issueType VARCHAR CHECK (type IN (
		'Bug',
		'Proposal',
		'Task',
	)),
	priority VARCHAR CHECK (priority IN (
		'Minor',
		'Major',
		'Critical',
	)),
	status VARCHAR CHECK (priority IN (
		'OPEN',
		'CLOSED',
		'IN PROGRESS',
	)),
	assigned_to INT NOT NULL,
	created_by INT NOT NULL,
	created DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(issueID),
	FOREIGN KEY(assigned_to) REFERENCES Users(userID) ON DELETE CASCADE,
	FOREIGN KEY(created_by) REFERENCES Users(userID) ON DELETE CASCADE,
); 


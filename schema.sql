/* schema file for info2180-group-project */

DROP DATABASE IF EXISTS info2180_bugme_issue_tracker;
CREATE DATABASE info2180_bugme_issue_tracker;
USE info2180_bugme_issue_tracker;

/* Creating User Database */
CREATE TABLE Users(
	userID INT NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	password TEXT  NOT NULL, 
	email VARCHAR(25) NOT NULL, 
	date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(userID)
); 

/* Default User */
INSERT INTO Users (firstName, lastName, password, email) 
VALUES("Admin", "", md5("password123"), "admin@bugme.com");


CREATE TABLE Issues(
	issueID INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	description TEXT NOT NULL,
	assigned_to INT NOT NULL,
	created_by INT NOT NULL,
	created DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated DATETIME DEFAULT CURRENT_TIMESTAMP,
	issueType VARCHAR(10) CHECK (issueType IN (
		'Bug',
		'Proposal',
		'Task'
	)) NOT NULL,
	priority VARCHAR(10) CHECK (priority IN (
		'Minor',
		'Major',
		'Critical'
	)) NOT NULL,
	status VARCHAR(12) CHECK (status IN (
		'OPEN',
		'CLOSED',
		'IN PROGRESS'
	)) NOT NULL,
	PRIMARY KEY (issueID),
	FOREIGN KEY(assigned_to) REFERENCES Users(userID) ON DELETE CASCADE,
	FOREIGN KEY(created_by) REFERENCES Users(userID) ON DELETE CASCADE
);

/* Setting a Default database access user */
GRANT ALL PRIVILEGES ON info2180_bugme_issue_tracker.* TO 'admin'@'localhost' IDENTIFIED BY "info2180-project";

# Password Generator <!-- omit in toc -->
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Test Conditions and Grading Criteria](#test-conditions-and-grading-criteria)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Grading Requirements](#grading-requirements)
## Description
## Technologies Used
## Demo
## Test Conditions and Grading Criteria
### User Story
```
AS AN employee with access to sensitive data
I WANT to randomly generate a password that meets certain criteria
SO THAT I can create a strong password that provides greater security
```
### Acceptance Criteria
```
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
```
### Grading Requirements
#### Technical Acceptance Criteria <!-- omit in toc -->
- [ ] User is presented with prompts for:
  - [ ] password length (between 8-128 characters)
  - [ ] types of characters to include (lowercase, uppercsase, numeric, special characters)
- [ ] User prompts validate choice and at least one character type is selected
- [ ] Password matches the selected criteria
- [ ] Password is written in an alert or to the page
#### Deployment <!-- omit in toc -->
- [ ] Application deployed at live URL
- [ ] Application loads with no errors
- [ ] Application GitHub URL submitted
- [ ] GitHub repository contains application code
#### Application Quality <!-- omit in toc -->
- [ ] Application user experience is intuitive and easy to navigate
- [ ] Application user interface style is clean and polished
- [ ] Application resembles the mock-up functionality
#### Repository Quality <!-- omit in toc -->
- [ ] Repository has a unique name
- [ ] Repository follows best practices for file structure and naming conventions
- [ ] Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
- [ ] Repository contains multiple descriptive commit messages
- [ ] Repository contains quality README file with description screenshot and link to deployed application
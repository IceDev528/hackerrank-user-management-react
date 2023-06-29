# React: User Management

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

**Application demo:**

Given a partially completed React application with the HTML template built and ready, Certain core React functionalities have already been implemented. Complete the React application as shown below in order to pass all the unit tests.

![](https://hrcdn.net/s3_pub/istreet-assets/Wm1YxfA9tOH8LGnSradb0w/user-management.gif)

The application has 2 components:

1. The UserList.js which has the user list table which includes edit/delete buttons as actions against the row.
2. The AddEditUser.js which renders the form to enter the user details to be added or edited.

The app should implement the following functionalities:

1. AddEditUser.js

- The initial view must not display any alert.
- Clicking the Cancel button should: 
   - do nothing if the fields are empty.
   - clear all the fields and reset them to empty.
   - clear the validation alert (if any).
   - (after clicking the Edit button) discard the changes in the form and add the original user values back to the table.
- Clicking the Add/Edit button should:
   - add field values as a row to the table with no validation alert and reset the form fields to empty. 
   - (after clicking the Edit button) add the user's updated data to the table or show a validation alert in case of any errors.


2.  UserList.js

- The initial view must display an empty list with no rows.
- Clicking the Delete button should delete the corresponding row from the table.
- Clicking the Edit button should populate the form fields where updates can be made.


3. Validations for Add/Edit User view:

- Should not add a user to the list on clicking Add/Edit User and show a common 'Validation alert' if:
   - any of the input fields are empty.
   - 'phone number' field doesn't contain 10 digits or it starts with '0'.

## Project Specifications 

**Read Only Files**

    - src/App.test.js
    - src/App.css
    - src/index.css
    - src/index.js
    - src/registerServiceWorker.js

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

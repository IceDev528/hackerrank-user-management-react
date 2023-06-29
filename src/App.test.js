import React from 'react';
import App from './App';
import { render, cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const TEST_IDS = {
    input: {
        firstNameInput: 'firstNameInput',
        lastNameInput: 'lastNameInput',
        phoneInput: 'phoneInput',
    },
    list: {
        userListTable: 'userListTable',
    },
    button: {
        cancelEditUserButton: 'cancelEditUserButton',
        addEditButton: 'addEditButton',
    },
    views: {
        validationAlert: 'validationAlert',
    }
}

describe('User Management', () => {
    let getByTestId
    let queryByTestId
    let firstNameInput
    let lastNameInput
    let phoneNumberInput
    let addEditButtonInput
    let cancelButtonInput

    beforeEach(() => {
        const app = render(<App />)
        getByTestId = app.getByTestId
        queryByTestId = app.queryByTestId
        firstNameInput = getByTestId(TEST_IDS.input.firstNameInput)
        lastNameInput = getByTestId(TEST_IDS.input.lastNameInput)
        phoneNumberInput = getByTestId(TEST_IDS.input.phoneInput)
        addEditButtonInput = getByTestId(TEST_IDS.button.addEditButton)
        cancelButtonInput = getByTestId(TEST_IDS.button.cancelEditUserButton)
    })

    afterEach(() => {
        cleanup()
    });

    const addEditUser = (firstName, lastName, phone, element = addEditButtonInput) => {
        fireEvent.change(firstNameInput, { target: { value: firstName } })
        fireEvent.change(lastNameInput, { target: { value: lastName } })
        fireEvent.change(phoneNumberInput, { target: { value: phone } })
        fireEvent.click(element, { button: '0' })
    }

    const checkFormValues = (firstName, lastName, phone) => {
        expect(firstNameInput.value).toEqual(firstName)
        expect(lastNameInput.value).toEqual(lastName)
        expect(phoneNumberInput.value).toEqual(phone)
    }

    const checkTableListValues = (rows = 0, firstName = undefined, lastName = undefined, phone = undefined) => {
        expect(getByTestId(TEST_IDS.list.userListTable).children[1].children.length).toEqual(rows)
        if (rows > 0) {
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[0].textContent).toEqual(firstName)
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[1].textContent).toEqual(lastName)
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[2].textContent).toEqual(phone)
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[0].textContent).toEqual('Edit')
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[1].textContent).toEqual('Delete')
        }
    }


    describe('App Initialization', () => {

        it('should initially show empty table list', () => {
            checkTableListValues(0)
        })

        it('should initially not show validation alert', () => {
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
        })
    })

    describe('Cancel Button', () => {
        it('should do nothing when user clicks cancel button with no data in the form', () => {
            checkFormValues('', '', '')
            fireEvent.click(cancelButtonInput, { button: '0' })
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(0)
        })

        it('should clear all entered values when user clicks cancel button', () => {
            checkFormValues('', '', '')
            addEditUser('someFirstName', 'someLastName', '1111')
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
            checkFormValues('someFirstName', 'someLastName', '1111')
            fireEvent.click(cancelButtonInput, { button: '0' })
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(0)
        })

        it('should clear validation alert when user clicks cancel button', () => {
            checkFormValues('', '', '')
            addEditUser('someFirstName', 'someLastName', '1111')
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
            fireEvent.click(cancelButtonInput, { button: '0' })
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(0)
        })
    })

    describe('Validation', () => {

        it('should not add the user record to the list if any input fields is empty and should show an alert on screen', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('', 'someLastName', '8888888888')
            checkTableListValues(0)
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()

            addEditUser('someFirstName', '', '8888888888')
            checkTableListValues(0)
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()

            addEditUser('someFirstName', 'someLastName', '')
            checkTableListValues(0)
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
        })

        it('should not add the user record to the list if phone number is not 10 digits and should show an alert on screen', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '1111')
            checkTableListValues(0)
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
        })

        it('should not add the user record to the list if phone number is 10 digits but starts with zero(0) and should show an alert on screen', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '0999999999')
            checkTableListValues(0)
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
        })

    })

    describe('Add/Edit Button', () => {
        it('should show validation error when user clicks Add/Edit button with no data in the form', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            fireEvent.click(addEditButtonInput, { button: '0' })
            expect(getByTestId(TEST_IDS.views.validationAlert)).toBeInTheDocument()
            checkTableListValues(0)
        })

        it('should not show validation alert when correct values are supplied with click of Add/Edit button', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkFormValues('', '', '')
        })
    })

    describe('User List with Actions', () => {
        it('should check that after a user record is added all the fields are displayed along with the actions', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
        })

        it('should delete the user from the list when delete button is clicked on the user row', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
            fireEvent.click(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[1], { button: '0' })
            expect(getByTestId(TEST_IDS.list.userListTable).children[1].children.length).toEqual(0)
        })

        it('should populate the user details in the form for edit when edit button is clicked on the row', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
            checkFormValues('', '', '')
            fireEvent.click(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[0], { button: '0' })
            checkFormValues('someFirstName', 'someLastName', '9999999999')
        })

        it('should add back the details of the user without any change if cancel button is clicked after edit button', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
            checkFormValues('', '', '')
            fireEvent.click(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[0], { button: '0' })
            checkFormValues('someFirstName', 'someLastName', '9999999999')
            fireEvent.click(cancelButtonInput, { button: '0' })
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
        })

        it('should update the user in the list with new values when Add/User is clicked', () => {
            checkFormValues('', '', '')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            addEditUser('someFirstName', 'someLastName', '9999999999')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'someFirstName', 'someLastName', '9999999999')
            checkFormValues('', '', '')
            fireEvent.click(getByTestId(TEST_IDS.list.userListTable).children[1].children[0].children[3].children[0], { button: '0' })
            checkFormValues('someFirstName', 'someLastName', '9999999999')
            addEditUser('updatedFirstName', 'updatedLastName', '9999999998')
            expect(queryByTestId(TEST_IDS.views.validationAlert)).toBeNull()
            checkTableListValues(1, 'updatedFirstName', 'updatedLastName', '9999999998')
        })
    })
})

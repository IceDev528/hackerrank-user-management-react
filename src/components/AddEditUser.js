import React, { useState, useEffect } from "react";

const REGEX_PATTERN = {
  regexMobileNumber: /^[1-9]{1}[0-9]{9}$/,
};

function AddEditUser({ user, onAddEditUser, onCancelEdit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
    } else {
      setFirstName("");
      setLastName("");
      setPhone("");
    }
    setIsError(false);
  }, [user]);

  const handleCancel = () => {
    if (firstName || lastName || phone) {
      // Fields are not empty, reset the form fields
      setFirstName("");
      setLastName("");
      setPhone("");
      setIsError(false);
    } else {
      onCancelEdit(null);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !REGEX_PATTERN.regexMobileNumber.test(phone)
    ) {
      setIsError(true);
    } else {
      onAddEditUser({ firstName, lastName, phone, id: user?.id });
      setFirstName("");
      setLastName("");
      setPhone("");
      setIsError(false);
    }
  };

  return (
    <section>
      <div className="pa-30">
        <form onSubmit={submitForm} noValidate="noValidate">
          <div className="layout-column mb-15">
            <label htmlFor="firstName" className="mb-3">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              data-testid="firstNameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="lastName" className="mb-3">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              data-testid="lastNameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="phone" className="mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[1-9]{1}[0-9]{9}"
              data-testid="phoneInput"
            />
          </div>
          {isError && (
            <div className="alert error mb-30" data-testid="validationAlert">
              Error: All fields are mandatory, and the phone number must be of
              10 digits and start with a non-zero digit.
            </div>
          )}
          <div className="layout-row justify-content-end">
            <button
              type="button"
              className=""
              data-testid="cancelEditUserButton"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="mx-0" data-testid="addEditButton">
              {user ? "Edit User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddEditUser;

import React, { useState } from "react";
import "./App.css";
import "h8k-components";
import UserList from "./components/UserList";
import AddEditUser from "./components/AddEditUser";

const title = "User Management";

const App = () => {
  const initialState = { firstName: "", lastName: "", phone: "" };
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddEditUser = (user) => {
    if (user.id) {
      // Edit user
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
    } else {
      // Add user
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row justify-content-center mt-100">
        <div className="w-60 mr-75">
          <UserList
            users={users}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />
        </div>
        <div className="layout-column w-40">
          <AddEditUser
            user={selectedUser}
            onAddEditUser={handleAddEditUser}
            onCancelEdit={setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

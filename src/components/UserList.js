import React from "react";

function UserList({ users, onDeleteUser, onEditUser }) {
  return (
    <section>
      <h3 className="p-3 text-center">Users</h3>
      <table
        className="table table-striped table-bordered"
        data-testid="userListTable"
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phone}</td>
              <td>
                <button type="button" onClick={() => onEditUser(user)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UserList;

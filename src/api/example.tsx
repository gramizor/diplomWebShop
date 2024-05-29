import React, { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "./apiUtils";

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getRequest<User[]>("/users");
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
    };

    try {
      const addedUser = await postRequest<User, typeof newUser>(
        "/users",
        newUser
      );
      setUsers((prevUsers) => [...prevUsers, addedUser]);
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const updateUser = async (id: number) => {
    const updatedUser = {
      name: "Updated User",
      email: "updateduser@example.com",
    };

    try {
      const user = await putRequest<User, typeof updatedUser>(
        `/users/${id}`,
        updatedUser
      );
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === id ? user : u)));
    } catch (err) {
      setError("Failed to update user");
    }
  };

  return (
    <div className="App">
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      <button onClick={addUser}>Add User</button>
      <button onClick={() => updateUser(1)}>Update User</button>
    </div>
  );
};

export default App;

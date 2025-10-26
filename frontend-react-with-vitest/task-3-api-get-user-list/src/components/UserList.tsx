import React, { useEffect, useState } from "react";
import { fetchWithTimeout } from "../api";

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}[];

function UserList({}): JSX.Element {
  const [users, setUsers] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const data = await fetchWithTimeout(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (isMounted && data) {
          setUsers(data);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div>
          {error ? (
            <div data-testid="error-state" style={{ color: "red" }}>
              {error}
            </div>
          ) : (
            <>
              {users?.length ? (
                users?.map((user) => (
                  <ul data-testid="users-list">
                    <li key={user.id}>{user.name}</li>
                  </ul>
                ))
              ) : (
                <div>No users found.</div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UserList;

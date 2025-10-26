import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import UserFilter from "./UserFilter";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  [key: string]: any;
};

function UserTable() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        const dataWithActiveState = data.map((item: any) => ({
          ...item,
          active: true,
        }));
        setAllUsers(dataWithActiveState);
        setFilteredUsers(dataWithActiveState);
        setLoading(false);
        setError(null);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    }
    fetchUsers();
  }, []);

  function onActiveChange(id: number) {
    setAllUsers((prev) =>
      prev.map((user) =>
        user.id == id ? { ...user, active: !user.active } : { ...user }
      )
    );
  }

  function onUserFilter(filter: string) {
    setFilteredUsers(
      allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {allUsers.length ? (
                <div>
                  <UserFilter
                    onChangeAction={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onUserFilter(e.target.value)
                    }
                  />
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Active?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <UserRow
                          name={user.name}
                          email={user.email}
                          active={user.active}
                          onActiveChange={() => onActiveChange(user.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>No Users Found.</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserTable;

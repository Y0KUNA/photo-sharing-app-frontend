import React, { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import { Link } from "react-router-dom";
function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchModel(
        "https://383889-8080.csb.app/api/user/list"
      );
      setUsers(result);
    }
    fetchData();
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <Link to={`/users/${user._id}`}>{user.last_name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default UserList;

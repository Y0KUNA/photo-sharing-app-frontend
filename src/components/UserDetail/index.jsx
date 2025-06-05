import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import TopBar from "../TopBar";
import fetchModel from "../../lib/fetchModelData";
function UserDetail({ User }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      // Thay :id bằng userId thực tế
      const url = `https://f4gvcl-8080.csb.app/api/user/${userId}`;
      const result = await fetchModel(url);
      setUser(result);
    }
    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <TopBar context={`${user.first_name}'s info`} user={User} />

      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>
        <b>Location:</b> {user.location}
      </p>
      <p>
        <b>Description:</b> {user.description}
      </p>
      <p>
        <b>Occupation:</b> {user.occupation}
      </p>

      {User._id === user._id && (
        <Link to={`/edit/${user._id}`}>
          <button>Edit infomation</button>
        </Link>
      )}
      <Link to={`/photos/${user._id}`}>View {user.first_name}'s Photos</Link>
    </div>
  );
}

export default UserDetail;
